import { createRemoteJWKSet, jwtVerify } from 'jose'
import crypto from 'crypto'
import axios from 'axios'
import { URL, URLSearchParams } from 'url'
import * as cfg from '../config.js'

let JWKS

export async function initAuth() {
  JWKS = createRemoteJWKSet(new URL(cfg.OIDC_JWKS_URI))
  console.log('[auth] JWKS ready →', cfg.OIDC_JWKS_URI)
}

export async function verify(token) {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: cfg.OIDC_ISSUER,
    audience: cfg.OIDC_AUDIENCE
  })
  return payload
}

export function loginHandler(req, res) {
  const state = crypto.randomBytes(16).toString('hex')
  res.cookie('oidc_state', state, {
    maxAge: 300_000,
    httpOnly: true,
    signed: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  const u = new URL(cfg.OIDC_AUTHORIZE_URL)
  u.search = new URLSearchParams({
    client_id: cfg.OIDC_CLIENT_ID,
    response_type: 'code',
    redirect_uri: cfg.OIDC_REDIRECT_URI,
    scope: cfg.OIDC_SCOPE,
    state,
    ...(cfg.OIDC_RESOURCE ? { resource: cfg.OIDC_RESOURCE } : {})
  }).toString()

  res.redirect(u.toString())
}

export async function callbackHandler(req, res) {
  const { code, state } = req.query
  const saved = req.signedCookies.oidc_state
  res.clearCookie('oidc_state')

  if (state !== saved) return res.status(403).send('Bad state')
  if (!code) return res.status(400).send('Missing code')

  try {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: cfg.OIDC_REDIRECT_URI,
      client_id: cfg.OIDC_CLIENT_ID
    })
    if (cfg.OIDC_CLIENT_SECRET) body.set('client_secret', cfg.OIDC_CLIENT_SECRET)

    const r = await axios.post(cfg.OIDC_TOKEN_URL, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    const tokens = r.data

    res.type('html').send(`
<!doctype html><meta charset="utf-8">
<script>
sessionStorage.setItem('authData', ${JSON.stringify(JSON.stringify(tokens))});
location = '/';
</script>`)
  } catch (err) {
    console.error(err.response?.data || err)
    res.status(500).send('Token exchange failed')
  }
}
