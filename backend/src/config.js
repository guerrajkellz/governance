import 'dotenv/config'
export const {
  PORT = 3000,
  USE_MOCK = 'false',
  AUTH_ENABLED = 'false',
  COOKIE_SECRET,
  // OIDC …
  OIDC_ISSUER,
  OIDC_AUDIENCE,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_SCOPE,
  OIDC_REDIRECT_URI,
  OIDC_JWKS_URI,
  OIDC_AUTHORIZE_URL,
  OIDC_TOKEN_URL,
  OIDC_RESOURCE,
  // External‑API creds …
  TOKEN_URL,
  BASE_API_URL,
  CLIENT_ID,
  USERNAME,
  PASSWORD,
  RESOURCE,
  GRANT_TYPE = 'password',
  TRACE_ID = 'local-trace',
  CHANNEL_TYPE = 'local-channel',
  REQUEST_COUNT = 100
} = process.env
