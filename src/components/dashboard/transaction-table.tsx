import { GridColDef } from "@mui/x-data-grid";

import ClientDataGrid from "@/components/dashboard/data-grid.client";
import { fetchTransactions } from "@/lib/data";

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

export default async function TransactionTable() {
  const transactions = await fetchTransactions();

  return (
    <ClientDataGrid
      rows={transactions}
      columns={columns}
      paginationModel={paginationModel}
    />
  );
}
