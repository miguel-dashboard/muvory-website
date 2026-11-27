import test from 'node:test';
import assert from 'node:assert/strict';
import { submitContact } from '../src/contact.js';

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
