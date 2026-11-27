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
