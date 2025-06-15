import express from 'express'
import cookieParser from 'cookie-parser'
import * as cfg from './config.js'

import { initAuth, loginHandler, callbackHandler } from './auth/index.js'
import { requireAuth } from './auth/middleware.js'
import { catalog } from './routes/catalog.js'

const app = express()
app.use(cookieParser(cfg.COOKIE_SECRET))

/* ── optional OIDC routes ───────── */
if (cfg.AUTH_ENABLED === 'true') {
  await initAuth()
  app.get('/login', loginHandler)
  app.get('/oidc/cb', callbackHandler)
}

/* ── API route with conditional guard ─ */
app.use('/api-data', cfg.AUTH_ENABLED === 'true' ? requireAuth() : (_1, _2, next) => next(), catalog)

app.listen(cfg.PORT, () => console.log(`⚡  catalog backend on http://localhost:${cfg.PORT}`))
