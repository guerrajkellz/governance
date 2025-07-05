export function addFirstColClick(firstField, handler, columns) {
  return {
    /* 1️⃣ Tag first column (body) + tag **all** headers */
    columns: columns.map(c => ({
      ...c,
      cellClassName: c.field === firstField ? 'clickable' : undefined,
      headerClassName: 'gridHeader'                // <‑‑ NEW
    })),

    /* 2️⃣ Click logic */
    onCellClick: params => {
      if (params.field === firstField) handler?.(params);
    },

    /* 3️⃣ Styles */
    sx: {
      /* Header row via our custom class */
      '& .gridHeader': {
        backgroundColor: theme => theme.palette.grey[200], // clearly visible
        fontWeight: 600
      },

      /* Remove default full‑row hover */
      '& .MuiDataGrid-row:hover': {
        backgroundColor: 'transparent !important'
      },

      /* Clickable cells (body) – look normal until hover */
      '& .MuiDataGrid-cell.clickable': {
        cursor: 'pointer',
        color: 'text.primary',
        textDecoration: 'none'
      },
      '& .MuiDataGrid-cell.clickable:hover': {
        backgroundColor: 'common.black',
        color: 'common.white',
        textDecoration: 'none'
      }
    }
  };
}
