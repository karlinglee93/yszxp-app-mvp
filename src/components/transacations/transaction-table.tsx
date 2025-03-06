import ClientTable from "@/components/client/table";
import { fetchFilteredTransactions, fetchTransactionsCount } from "@/lib/data";

export default async function TransactionTable({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const filteredTransactions = await fetchFilteredTransactions(query, page);
  const totalCount = await fetchTransactionsCount(query);

  if (!Array.isArray(filteredTransactions)) {
    console.error(
      "Error fetching filtered transactions:",
      filteredTransactions
    );
    return;
  }

  return (
    <div>
      <ClientTable datasource={filteredTransactions} totalCount={totalCount} />
    </div>
  );
}
