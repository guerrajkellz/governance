import { useEffect, useState } from 'react'
import { CssBaseline, Container, IconButton, Typography, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme.js'
import { fetchLines, fetchLineDetails } from './api/catalog.js'

export default function App() {
  const [lines, setLines] = useState([])
  const [products, setProducts] = useState([])
  const [selectedLine, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchLines()
      .then(data => setLines(data.map((l, idx) => ({ id: idx, ...l }))))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleRowClick = async ({ row }) => {
    setSelected(row.line)
    setLoading(true)
    fetchLineDetails(row.line)
      .then(data => setProducts(data.map((p, idx) => ({ id: idx, ...p }))))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  const back = () => {
    setSelected(null)
    setProducts([])
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='md' sx={{ py: 4 }}>
        {!selectedLine ? (
          <>
            <Typography variant='h4' gutterBottom>
              CCB Product Lines
            </Typography>
            <DataGrid
              autoHeight
              density='compact'
              rows={lines}
              columns={[
                { field: 'line', headerName: 'Product Line', flex: 2 },
                { field: 'count', headerName: '# of Aliases', flex: 1, type: 'number' }
              ]}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              onRowClick={handleRowClick}
              loading={loading}
              showCellVerticalBorder
              showColumnVerticalBorder
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderBottom: '1px solid #ddd'
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f0f0f0'
                },
                '& .MuiDataGrid-cell[data-field="line"]:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }
              }}
            />
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton onClick={back}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant='h5' sx={{ ml: 1 }}>
                {selectedLine}
              </Typography>
            </Box>
            <DataGrid
              autoHeight
              density='compact'
              rows={products}
              columns={[
                { field: 'productName', headerName: 'Product', flex: 2 },
                { field: 'alias', headerName: 'Alias', flex: 1 }
              ]}
              pageSizeOptions={[10]}
              loading={loading}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  )
}
