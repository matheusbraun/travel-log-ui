import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export async function listLogEntries() {
  const response = await api.get('/logs');

  return response.data;
}
