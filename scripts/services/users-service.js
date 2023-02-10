import apiFetch from './api-fetch.js';

export async function getUsers(params) {
  return await apiFetch('', { params });
}
