// apiTokens/productCatalog.js
import axios from 'axios'
import qs from 'qs'
import * as cfg from '../config/config.js'

export async function getPatoolsToken() {
  const { data } = await axios.post(
    cfg.IDA_TOKEN_URL,
    qs.stringify({
      client_id: cfg.FID_CLIENT_ID,
      username: cfg.FID,
      password: cfg.PASSWORD,
      resource: cfg.PATOOLS_RESOURCE,
      grant_type: cfg.GRANT_TYPE
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  )
  return data.access_token
}
