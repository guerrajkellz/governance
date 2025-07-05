// backend/api/businessDecisionFramework/aggregators/mergeBdf.js
export function mergeBdfRows(bdfRows, productLines, appIdx) {
  for (const row of bdfRows) {
    const map = appIdx.get(row.platformApplicationProduct)
    if (!map) continue

    const { productLine, product } = map // variable renamed

    const lineRec = productLines.get(productLine) ?? {
      productLine,
      aliasCount: 0,
      bdfCount: 0,
      products: new Map()
    }
    const prodRec = lineRec.products.get(product) ?? {
      productName: product,
      alias: undefined,
      bdfCount: 0,
      seals: []
    }

    prodRec.seals.push({ sealId: row.platformApplicationProduct, bdfStatus: row.bdfStatus })
    prodRec.bdfCount += 1
    lineRec.bdfCount += 1

    lineRec.products.set(product, prodRec)
    productLines.set(productLine, lineRec)
  }
}
