// src/routes/catalogLines.js
import { Router } from 'express'
import { getGroupedCatalog } from '../services/catalogGroupedService.js'

export const catalogLines = Router()

// GET /api-data/lines
catalogLines.get('/', async (_req, res, next) => {
  try {
    const data = await getGroupedCatalog()
    // Don’t ship the heavy `products` array here
    res.json(data.map(({ line, count }) => ({ line, count })))
  } catch (e) {
    next(e)
  }
})

// GET /api-data/lines/:line
catalogLines.get('/:line', async (req, res, next) => {
  try {
    const { line } = req.params
    const entry = (await getGroupedCatalog()).find(l => l.line === line)
    if (!entry) return res.status(404).json({ error: 'Unknown line' })
    res.json(entry.products)
  } catch (e) {
    next(e)
  }
})
