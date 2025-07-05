// api/productCatalog/data/fetchData.js
import fs from 'fs/promises'
import axios from 'axios'
import * as cfg from '../../../config/config.js'
import { getPatoolsToken } from '../../../apiTokens/productCatalog.js'

export async function fetchCatalog() {
  /* ── MOCK branch ───────────────── */
  if (cfg.USE_MOCK === 'true') {
    const { productSummary } = JSON.parse(
      await fs.readFile(new URL('../../../mock/product-catalog.json', import.meta.url))
    )
    return productSummary
  }

  /* ── REAL branch ───────────────── */
  const token = await getPatoolsToken()
  let all = [],
    page = 1,
    more = true

  while (more) {
    const url = `${cfg.PATOOLS_BASE_API_URL}?requested-record-count=${cfg.PATOOLS_REQUEST_COUNT}&current-pagination-number=${page}`
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'trace-id': cfg.PATOOLS_TRACE_ID,
        'channel-type': cfg.PATOOLS_CHANNEL_TYPE
      }
    })
    all = all.concat(data.productSummary || [])
    more = data.page?.moreRecordsIndicator
    page++
  }
  return all
}
