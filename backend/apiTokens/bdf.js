// backend/apiTokens/bdf.js
import axios from 'axios'
import qs from 'qs'
import * as cfg from '../config/config.js'

export async function getBdfToken() {
  const { data } = await axios.post(
    cfg.BDF_TOKEN_URL,
    qs.stringify({
      client_id: cfg.FID_CLIENT_ID,
      username: cfg.USERNAME,
      password: cfg.PASSWORD,
      resource: cfg.BDF_RESOURCE, // audience / scope for BDF
      grant_type: cfg.GRANT_TYPE || 'password'
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  )
  return data.access_token
}
