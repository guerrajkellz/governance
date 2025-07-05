// api/productCatalog/data/fetchAndGroupData.js
import { memoize } from '../../../utils/memoize.js'
import { fetchCatalog } from './fetchData.js'

function group(products) {
  const lines = new Map()
  products.forEach(p => {
    if (p.lineOfBusinessCode !== 'CCB') {
      return
    } // filter
    const list = lines.get(p.productLineName) ?? []
    list.push({ productName: p.productName, alias: p.productAppAliasName })
    lines.set(p.productLineName, list)
  })

  // Shape wanted by the front‑end
  return [...lines.entries()].map(([line, items]) => ({
    line,
    count: items.length,
    products: items // will be used by detail endpoint
  }))
}

export const getGroupedCatalog = memoize(async () => group(await fetchCatalog()))
