// backend/api/productCatalog/data/fetchProductApps.js
import axios from 'axios'
import fs from 'fs/promises'
import * as cfg from '../../../config/config.js'
import { getPatoolsToken } from '../../../apiTokens/productCatalog.js'

export async function fetchProductApps() {
  if (cfg.USE_MOCK === 'true') {
    return JSON.parse(await fs.readFile(new URL('../../../mock/product-applications.json', import.meta.url)))
      .productApplications
  }

  const token = await getPatoolsToken()
  const { data } = await axios.get(cfg.PROD_APPS_API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data.productApplications
}
