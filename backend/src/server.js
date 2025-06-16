import express from 'express'
import cookieParser from 'cookie-parser'
import * as cfg from './config.js'

import { initAuth, loginHandler, callbackHandler } from './auth/index.js'
import { requireAuth } from './auth/middleware.js'
import { catalog } from './routes/catalog.js'
import { catalogLines } from './routes/catalogLines.js'

const app = express()
app.use(cookieParser(cfg.COOKIE_SECRET))

/* ── optional OIDC routes ───────── */
if (cfg.AUTH_ENABLED === 'true') {
  await initAuth()
  app.get('/login', loginHandler)
  app.get('/oidc/cb', callbackHandler)
}

/* ── API route guard middleware ──── */
const guard = cfg.AUTH_ENABLED === 'true' ? requireAuth() : (_1, _2, next) => next()

/* ── Routes ──────────────────────── */
app.use('/api-data', guard, catalog)
app.use('/api-data/lines', guard, catalogLines)

/* ── Error handling ──────────────── */
app.use((err, _req, res, _next) => {
  console.error('❌', err)
  res.status(500).json({ error: 'Internal server error' })
})

/* ── Server start ────────────────── */
app.listen(cfg.PORT, () => {
  console.log(`⚡ catalog backend running at http://localhost:${cfg.PORT}`)
})
