// frontend/src/tables/ProduductTable.jsx
import { DataGrid } from '@mui/x-data-grid';
import { addFirstColClick } from '../datagrid/AddFirstColClick';
/**
 * @param {{ rows: any[], loading: boolean, onRowClick: func }}
 */
export default function ProductTable({ rows, loading, onRowClick }) {

  const columns = [
    { field: 'productName', headerName: 'Product', flex: 2, headerAlign: 'center' },
    { field: 'alias',       headerName: 'Product Alias',   flex: 2, headerAlign: 'center', align: 'right' },
    { field: 'bdfCount',    headerName: 'BDF Count',   type: 'number', flex: 1, headerAlign: 'center', align: 'right' }
  ]

  const gridProps = addFirstColClick('productName', onRowClick, columns);

  return (
    <DataGrid
      density="compact"
      rows={rows}
      loading={loading}
      disableRowSelectionOnClick
      showColumnVerticalBorder
      showCellVerticalBorder
      {...gridProps}
    />
  );
}
