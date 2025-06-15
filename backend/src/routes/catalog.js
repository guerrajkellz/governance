import { Router } from 'express'
import { fetchCatalog } from '../services/catalogService.js'

export const catalog = Router()

catalog.get('/', async (_, res) => {
  try {
    const products = await fetchCatalog()
    const map = Object.fromEntries(products.map(p => [p.productName, p.productAppAliasName]))
    res.json(map)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Catalog fetch failed' })
  }
})
