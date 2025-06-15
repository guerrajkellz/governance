import { useEffect, useState, useMemo } from 'react'
import { fetchCatalog } from './api/catalog.js'

export default function App() {
  const [data, set] = useState({})

  useEffect(() => {
    fetchCatalog().then(set)
  }, [])

  const grouped = useMemo(() => {
    return Object.entries(data).reduce((acc, [name, alias]) => {
      const line = alias.split('-')[0] || 'other'
      ;(acc[line] ??= []).push({ name, alias })
      return acc
    }, {})
  }, [data])

  return (
    <main>
      <h1>CCB Product Catalog</h1>
      {Object.entries(grouped).map(([line, items]) => (
        <section key={line}>
          <h2>{line}</h2>
          <ul>
            {items.map(p => (
              <li key={p.alias}>
                <strong>{p.name}</strong> <em>({p.alias})</em>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
