"use client"

import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function ClientDataGrid({rows, columns, paginationModel}: {
  rows: object[],
  columns: GridColDef[],
  paginationModel: object
}) {

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      sx={{ border: 0 }}
    />
  );
}
