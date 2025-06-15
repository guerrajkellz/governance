export function getAccessToken() {
  try {
    const raw = sessionStorage.getItem('authData')
    if (!raw) return null
    return JSON.parse(raw).access_token
  } catch {
    return null
  }
}
