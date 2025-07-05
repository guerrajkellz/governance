// backend/utils/cache.js
import { LRUCache } from 'lru-cache'

export function cache(fn, { ttlMs = 300_000, keyFn = JSON.stringify } = {}) {
  const lru = new LRUCache({ max: 64, ttl: ttlMs }) // ← use LRUCache here
  return async (...args) => {
    const k = keyFn(args)
    if (lru.has(k)) return lru.get(k)
    const v = await fn(...args)
    lru.set(k, v)
    return v
  }
}
