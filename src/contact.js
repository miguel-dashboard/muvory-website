/** Require a successful HTTP response before confirming submission. */
export async function submitContact(endpoint, data, fetcher = fetch) {
  if (!endpoint?.trim()) throw new Error('Contact endpoint is not configured');
  const response = await fetcher(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Contact submission failed');
}

/**
 * Send through Web3Forms. Its public access key routes the message to a
 * previously verified recipient; a 2xx response alone does not mean success.
 * https://docs.web3forms.com/getting-started/api-reference
 */
export async function submitContactWeb3Forms(accessKey, data, fetcher = fetch) {
  if (!accessKey?.trim()) throw new Error('Web3Forms access key is not configured');

  const payload = {
    access_key: accessKey.trim(),
    subject: 'Nueva consulta desde MUVORY Technologies',
    from_name: 'MUVORY Technologies',
    name: data.nombre,
    email: data.email,
    message: data.mensaje,
    servicio: data.servicio,
    consentimiento: data.consentimiento,
    botcheck: data.botcheck || '',
  };
  const response = await fetcher('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Web3Forms request failed');
  const confirmation = await response.json();
  if (confirmation?.success !== true) {
    throw new Error('Web3Forms did not confirm delivery');
  }
  return confirmation;
}
