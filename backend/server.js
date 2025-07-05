// server.js  –  Express entry point
import express      from 'express';
import cookieParser from 'cookie-parser';
import * as cfg     from './config/config.js';

import {
  initAuth,
  loginHandler,
  callbackHandler
} from './auth/oidcSetup.js';
import { requireAuth } from './auth/authMiddleware.js';

import { catalogAggRouter } from './services/catalogAggregation/router.js';


/* ------------------------------------------------------------------ */
/*  App bootstrap                                                     */
/* ------------------------------------------------------------------ */
const app = express();
app.use(cookieParser(cfg.COOKIE_SECRET));
app.use(express.json());                // safe even if you stay 100 % GET

/* ----- Optional OIDC sign‑in flow --------------------------------- */
if (cfg.AUTH_ENABLED === 'true') {
  await initAuth();
  app.get('/login',   loginHandler);
  app.get('/oidc/cb', callbackHandler);
}

/* ----- API‑guard middleware --------------------------------------- */
const guard =
  cfg.AUTH_ENABLED === 'true'
    ? requireAuth()              // validates Bearer token
    : (_req, _res, next) => next();

/* ----- Domain routes ---------------------------------------------- */
app.use('/api-data/catalog', guard, catalogAggRouter);

/* ----- Health check (optional) ------------------------------------ */
app.get('/_health', (_req, res) => res.json({ ok: true }));

/* ----- Central error boundary ------------------------------------- */
app.use((err, _req, res, _next) => {
  console.error('❌', err.stack || err);
  res.status(500).json({ error: 'Internal server error' });
});

/* ----- Start server ----------------------------------------------- */
app.listen(cfg.PORT, () => {
  console.log(`⚡ catalog backend running at http://localhost:${cfg.PORT}`);
});
