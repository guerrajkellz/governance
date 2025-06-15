import { verify } from './index.js'

export function requireAuth() {
  return async (req, res, next) => {
    try {
      const h = req.headers.authorization || ''
      if (!h.startsWith('Bearer ')) throw new Error('Missing Bearer')
      const token = h.slice(7)
      req.user = await verify(token) // attach decoded JWT
      return next()
    } catch {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }
}
