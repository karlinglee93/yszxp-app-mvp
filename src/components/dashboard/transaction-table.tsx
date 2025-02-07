"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Transaction } from "@/lib/definitions";

const columns: GridColDef[] = [
  { field: "category", headerName: "Category", width: 130 },
  { field: "timestamp", headerName: "Date", width: 130 },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 90,
  },
  {
    field: "ledger",
    headerName: "Ledger",
    width: 160,
  },
  { field: "currency", headerName: "Currency", width: 130 },
  {
    field: "description",
    headerName: "Description",
    width: 130,
    sortable: false,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const rows = transactions;

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
