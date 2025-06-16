// src/lib/cache.js
export function memoize(fn, ttlMs = 5 * 60_000) {
  let value,
    expiry = 0
  return async () => {
    const now = Date.now()
    if (now > expiry) {
      value = await fn()
      expiry = now + ttlMs
    }
    return value
  }
}
