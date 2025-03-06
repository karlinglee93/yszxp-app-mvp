import ClientTable from "@/components/client/table";
import { fetchTransactions } from "@/lib/data";
import { Transaction, TransactionQueryParams } from "@/lib/definitions";

export default async function TransactionTable() {
  const transactionQuery: Partial<TransactionQueryParams> = {
    transactionType: "all",
    sortBy: "date",
    orderBy: "DESC",
  };
  const transactions: Partial<Transaction>[] = await fetchTransactions(
    transactionQuery
  );
  if (!Array.isArray(transactions)) {
    console.error("Error fetching transactions:", transactions);
    return;
  }

  return (
    <div>
      <ClientTable datasource={transactions} />
    </div>
  );
}
