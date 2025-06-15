import { getAccessToken } from '../auth/token.js'

export async function fetchCatalog() {
  const token = getAccessToken()
  const r = await fetch('/api-data', {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
  if (r.status === 401) {
    location = '/login'
    return {}
  }
  return r.json()
}
