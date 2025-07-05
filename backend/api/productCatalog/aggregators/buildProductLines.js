// backend/api/productCatalog/aggregators/buildProductLines.js

export function buildProductLines(summary) {
  const productLines = new Map()

  for (const row of summary) {
    if (row.lineOfBusinessCode !== 'CCB') continue

    const aliasString = (row.productAppAliasName ?? '').trim()
    const hasAlias = aliasString.length > 0

    const lineRec = productLines.get(row.productLineName) ?? {
      productLine: row.productLineName,
      aliasTotal: 0,
      aliasFilled: 0,
      bdfCount: 0,
      products: new Map()
    }

    // update line‑level alias counters
    lineRec.aliasTotal += 1
    if (hasAlias) lineRec.aliasFilled += 1

    // ensure product entry exists (alias may still be useful later)
    const prodRec = lineRec.products.get(row.productName) ?? {
      productName: row.productName,
      alias: aliasString,
      bdfCount: 0,
      seals: []
    }

    lineRec.products.set(row.productName, prodRec)
    productLines.set(lineRec.productLine, lineRec)
  }

  return productLines
}
