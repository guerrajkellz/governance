import { getAccessToken } from '../auth/token.js'

export async function fetchLines() {
  const token = getAccessToken()
  const res = await fetch('/api-data/lines', {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })

  if (res.status === 401) {
    location.href = '/login'
    return []
  }

  if (!res.ok) throw new Error(await res.text())

  return res.json()
}

export async function fetchLineDetails(line) {
  const token = getAccessToken()
  const res = await fetch(`/api-data/lines/${encodeURIComponent(line)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })

  if (res.status === 401) {
    location.href = '/login'
    return []
  }

  if (!res.ok) throw new Error(await res.text())

  return res.json()
}
