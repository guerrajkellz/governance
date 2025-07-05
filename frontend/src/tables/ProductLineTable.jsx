// frontend/src/tables/ProductLineTable.jsx
import { DataGrid } from '@mui/x-data-grid';
import { addFirstColClick } from '../datagrid/AddFirstColClick';

/**
 * @param {{ rows: any[], loading: boolean, onRowClick: func }}
 */
export default function ProductLineTable({ rows, loading, onRowClick }) {

  const columns = [
    { field: 'productLine', headerName: 'Product Line', flex: 2, headerAlign: 'center' },
    { field: 'aliasRatio',  headerName: 'Product Aliases Count',    flex: 1, headerAlign: 'center', align: 'right' },
    { field: 'bdfCount',    headerName: 'BDF Count',        type: 'number', flex: 1, headerAlign: 'center', align: 'right' }
  ]

    const gridProps = addFirstColClick('productLine', onRowClick, columns);

  return (
    <DataGrid
      autoHeight
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
