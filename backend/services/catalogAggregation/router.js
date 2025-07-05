import { Router } from 'express'
import { getAggregatedCatalog } from './aggregate.js'

export const catalogAggRouter = Router()

/* --- 1) product‑line list -------------------------------------- */
catalogAggRouter.get('/lines', async (_req, res, next) => {
  try {
    const data = await getAggregatedCatalog()
    res.json(
      data.map(({ productLine, aliasFilled, aliasTotal, bdfCount }) => ({
        productLine,
        aliasFilled,
        aliasTotal,
        bdfCount // unchanged
      }))
    )
  
  } catch (e) {
    next(e)
  }
})

/* --- 2) products for one product‑line -------------------------- */
catalogAggRouter.get('/lines/:line', async (req, res, next) => {
  try {
    const entry = (await getAggregatedCatalog()).find(l => l.productLine === req.params.line)
    if (!entry) return res.status(404).json({ error: 'Unknown productLine' })
    res.json(entry.products.map(({ productName, alias, bdfCount }) => ({ productName, alias, bdfCount })))
  } catch (e) {
    next(e)
  }
})

/* --- 3) seals for one product --------------------------------- */
catalogAggRouter.get('/lines/:line/products/:product', async (req, res, next) => {
  try {
    const { line, product } = req.params
    const l = (await getAggregatedCatalog()).find(x => x.productLine === line)
    const p = l?.products.find(x => x.productName === product)
    if (!p) return res.status(404).json({ error: 'Unknown product' })
    res.json(p.seals) // [{ sealId, bdfStatus }]
  } catch (e) {
    next(e)
  }
})
