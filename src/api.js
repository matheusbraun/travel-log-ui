const BASE_URL = 'http://localhost:3333';

export async function listLogEntries() {
  const response = await fetch(`${BASE_URL}/logs`);

  return response.json();
}
