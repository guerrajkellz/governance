// backend/api/productApplication/aggregators/buildApplicationIndex.js
export function buildApplicationIndex(productApps) {
  const idx = new Map()
  for (const pa of productApps) {
    for (const app of pa.applications ?? []) {
      idx.set(app.applicationIdentifier, {
        productLine: pa.productLineName, // renamed field
        product: pa.productName
      })
    }
  }
  return idx
}
