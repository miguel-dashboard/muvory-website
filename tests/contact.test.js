import test from 'node:test';
import assert from 'node:assert/strict';
import { submitContact, submitContactWeb3Forms } from '../src/contact.js';

test('missing endpoint never sends a request', async () => {
  let called = false;
  await assert.rejects(submitContact(' ', {}, () => { called = true; }), /not configured/);
  assert.equal(called, false);
});

test('successful HTTP confirmation sends JSON including user-approved context', async () => {
  const data = { nombre: 'Prueba', mensaje: 'Contexto de ejemplo', consentimiento: 'si' };
  let request;
  await submitContact('https://example.test/contact', data, async (url, options) => {
    request = { url, ...options };
    return { ok: true };
  });
  assert.equal(request.method, 'POST');
  assert.equal(request.headers['Content-Type'], 'application/json');
  assert.deepEqual(JSON.parse(request.body), data);
  assert.equal(request.signal.aborted, false);
});

test('HTTP rejection cannot produce success', async () => {
  await assert.rejects(submitContact('https://example.test/contact', {}, async () => ({ ok: false })), /failed/);
});

test('network failure is propagated so the form retains entered data', async () => {
  await assert.rejects(submitContact('https://example.test/contact', {}, async () => { throw new Error('offline'); }), /offline/);
});

test('request timeout is propagated instead of confirming submission', async () => {
  await assert.rejects(submitContact('https://example.test/contact', {}, async () => { throw new DOMException('Timed out', 'TimeoutError'); }), { name: 'TimeoutError' });
});

test('Web3Forms requires an access key and must not submit without it', async () => {
  let called = false;
  await assert.rejects(submitContactWeb3Forms('', {}, () => { called = true; }), /not configured/);
  assert.equal(called, false);
});

test('Web3Forms sends customer fields, consent and approved context', async () => {
  let request;
  await submitContactWeb3Forms('public-test-key', {
    nombre: 'Visita de prueba',
    email: 'visitante@example.com',
    mensaje: 'Tengo una idea de plataforma digital.',
    servicio: 'Software a medida',
    consentimiento: 'si',
    botcheck: '',
  }, async (url, options) => {
    request = { url, ...options };
    return { ok: true, json: async () => ({ success: true }) };
  });
  assert.equal(request.url, 'https://api.web3forms.com/submit');
  assert.equal(request.headers['Content-Type'], 'application/json');
  const payload = JSON.parse(request.body);
  assert.equal(payload.access_key, 'public-test-key');
  assert.equal(payload.name, 'Visita de prueba');
  assert.equal(payload.email, 'visitante@example.com');
  assert.equal(payload.message, 'Tengo una idea de plataforma digital.');
  assert.equal(payload.servicio, 'Software a medida');
  assert.equal(payload.consentimiento, 'si');
  assert.equal(payload.botcheck, '');
});

test('Web3Forms cannot confirm success when provider reports failure in a 200 response', async () => {
  await assert.rejects(
    submitContactWeb3Forms('public-test-key', {}, async () => ({
      ok: true, json: async () => ({ success: false, message: 'invalid key' }),
    })),
    /did not confirm delivery/
  );
});

test('Web3Forms rejects non-2xx responses', async () => {
  await assert.rejects(
    submitContactWeb3Forms('public-test-key', {}, async () => ({ ok: false })),
    /request failed/
  );
});

test('Web3Forms rejects malformed confirmation instead of claiming delivery', async () => {
  await assert.rejects(
    submitContactWeb3Forms('public-test-key', {}, async () => ({
      ok: true, json: async () => ({ message: 'pending' }),
    })),
    /did not confirm delivery/
  );
});
