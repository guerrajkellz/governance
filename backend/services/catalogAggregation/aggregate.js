import { cache } from '../../utils/cache.js'

import { fetchCatalog } from '../../api/productCatalog/data/fetchData.js'
import { fetchProductApps } from '../../api/productApplication/data/fetchProductApps.js'
import { fetchBdf } from '../../api/businessDecisionFramework/data/fetchBdfData.js'

import { buildProductLines } from '../../api/productCatalog/aggregators/buildProductLines.js'
import { buildApplicationIndex } from '../../api/productApplication/aggregators/buildAppicationIndex.js'
import { mergeBdfRows } from '../../api/businessDecisionFramework/aggregators/mergeBdf.js'

/* ---------- util: convert nested Maps to plain objects ---------- */
function tidy(productLines) {
  return [...productLines.values()].map(l => ({
    ...l,
    products: [...l.products.values()]
  }))
}

/* ---------- public, memo‑cached API ---------- */
export const getAggregatedCatalog = cache(
  async () => {
    // 1. download raw payloads (in parallel)
    const [summary, appPayload, bdfRows] = await Promise.all([fetchCatalog(), fetchProductApps(), fetchBdf()])

    // 2. build partial structures for each domain
    const productLines = buildProductLines(summary) // from Product Catalog
    const appIndex = buildApplicationIndex(appPayload) // from Product Apps

    // 3. enrich with BDF rows (mutates productLines in‑place)
    mergeBdfRows(bdfRows, productLines, appIndex)

    // 4. flatten Maps → arrays for JSON output

    console.log('productLines', productLines)

    return tidy(productLines)
  },
  { ttlMs: 5 * 60_000 }
)
