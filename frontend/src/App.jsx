// frontend/src/App.jsx
import { useEffect, useState } from 'react';
import {
  CssBaseline,
  Container,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme.js';
import {
  fetchLines,
  fetchLineDetails,
  fetchProductSeals
} from './api/productCatalog.js';

import ProductLineTable from './tables/ProductLineTable.jsx';
import ProductTable     from './tables/ProductTable.jsx';
import SealTable        from './tables/SealTable.jsx';

export default function App() {
  /* ---------- state ------------------------------------------------ */
  const [lines, setLines]         = useState([]);
  const [products, setProducts]   = useState([]);
  const [seals, setSeals]         = useState([]);

  const [productLine, setProductLine] = useState(null);
  const [product,     setProduct]     = useState(null);

  const [loading, setLoading] = useState(false);

  /* ---------- first load ------------------------------------------- */
  useEffect(() => {
    setLoading(true);
    fetchLines()
      .then(data =>
        setLines(
          data.map((r, i) => ({
            id: i,
            ...r,
            aliasRatio: `${r.aliasFilled}/${r.aliasTotal}`
          }))
        )
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ---------- handlers --------------------------------------------- */
  const openProductLine = ({ row }) => {
    setProductLine(row.productLine);
    setLoading(true);
    fetchLineDetails(row.productLine)
      .then(data => setProducts(data.map((r, i) => ({ id: i, ...r }))))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const openProduct = ({ row }) => {
    setProduct(row.productName);
    setLoading(true);
    fetchProductSeals(productLine, row.productName)
      .then(data => setSeals(data.map((r, i) => ({ id: i, ...r }))))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const backToLines = () => {
    setProductLine(null);
    setProducts([]);
  };
  const backToProducts = () => {
    setProduct(null);
    setSeals([]);
  };

  /* ---------- render ------------------------------------------------ */
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* LEVEL 1 */}
        {!productLine && (
          <>
            <Typography variant="h4" gutterBottom>
              CCB Product Lines
            </Typography>
            <ProductLineTable
              rows={lines}
              loading={loading}
              onRowClick={openProductLine}
            />
          </>
        )}

        {/* LEVEL 2 */}
        {productLine && !product && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton onClick={backToLines}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" sx={{ ml: 1 }}>
                {productLine}
              </Typography>
            </Box>
            <ProductTable
              rows={products}
              loading={loading}
              onRowClick={openProduct}
            />
          </>
        )}

        {/* LEVEL 3 */}
        {product && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton onClick={backToProducts}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" sx={{ ml: 1 }}>
                {product}
              </Typography>
            </Box>
            <SealTable rows={seals} loading={loading} />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}



