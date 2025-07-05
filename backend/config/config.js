// config/config.js
import 'dotenv/config'
export const {
  PORT = 3000,
  USE_MOCK = 'false',
  AUTH_ENABLED = 'false',
  COOKIE_SECRET,
  FID,
  PASSWORD,
  FID_CLIENT_ID,
  GRANT_TYPE,
  // IDA …
  IDA_TOKEN_ISSUER,
  IDA_AUDIENCE,
  IDA_SCOPE,
  IDA_JWKS_URI,
  IDA_AUTHORIZE_URL,
  IDA_TOKEN_URL,
  IDA_RESOURCE,
  // External‑API creds …
  PATOOLS_BASE_API_URL,
  PATOOLS_RESOURCE,
  PATOOLS_TRACE_ID = 'local-trace',
  PATOOLS_CHANNEL_TYPE = 'local-channel',
  PATOOLS_REQUEST_COUNT = 100
} = process.env
