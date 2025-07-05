// frontend/src/api/productCatalog.js   (unchanged)
import { getAccessToken } from '../auth/token.js';

const auth = () => {
  const t = getAccessToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const fetchLines = () =>
  fetch('/api-data/catalog/lines', { headers: auth() })
    .then(r => (r.status === 401 ? (location.href = '/login', []) : r.json()));

export const fetchLineDetails = line =>
  fetch(`/api-data/catalog/lines/${encodeURIComponent(line)}`, { headers: auth() })
    .then(r => (r.status === 401 ? (location.href = '/login', []) : r.json()));

export const fetchProductSeals = (line, product) =>
  fetch(
    `/api-data/catalog/lines/${encodeURIComponent(line)}/products/${encodeURIComponent(product)}`,
    { headers: auth() }
  ).then(r => (r.status === 401 ? (location.href = '/login', []) : r.json()));
