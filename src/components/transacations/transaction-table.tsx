import ClientTable from "@/components/client/table";
import { fetchFilteredTransactions, fetchTransactionsCount } from "@/lib/data";

export default async function TransactionTable({
  query,
  page,
  timeRange,
}: {
  query: string;
  page: number;
  timeRange: string;
}) {
  const filteredTransactions = await fetchFilteredTransactions(query, timeRange, page);
  const totalCount = await fetchTransactionsCount(query, timeRange);

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
