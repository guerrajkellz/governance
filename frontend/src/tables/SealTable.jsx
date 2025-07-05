// frontend/src/tables/SealTable.jsx
import { DataGrid } from '@mui/x-data-grid';
import { addFirstColClick } from '../datagrid/AddFirstColClick';

/**
 * @param {{ rows: any[], loading: boolean }}
 */
export default function SealTable({ rows, loading }) {

  const columns = [
        { field: 'sealId',    headerName: 'App SEAL',  flex: 2, headerAlign: 'center' },
        { field: 'bdfStatus', headerName: 'BDF Status', flex: 1, headerAlign: 'center', align: 'right' }
  ]
  const gridProps = addFirstColClick('sealId', null, columns);

  return (
    <DataGrid
      autoHeight
      density="compact"
      rows={rows}
      loading={loading}
      showColumnVerticalBorder
      showCellVerticalBorder
      {...gridProps}
    />
  );
}
