import axios from 'axios'
import qs from 'qs'
import * as cfg from '../config.js'

export async function getApiAccessToken() {
  const { data } = await axios.post(
    cfg.TOKEN_URL,
    qs.stringify({
      client_id: cfg.CLIENT_ID,
      username: cfg.USERNAME,
      password: cfg.PASSWORD,
      resource: cfg.RESOURCE,
      grant_type: cfg.GRANT_TYPE
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  )
  return data.access_token
}
