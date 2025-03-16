import ClientTable from "@/components/client/table";
import { fetchFilteredTransactions, fetchTransactionsCount } from "@/lib/data";

export default async function TransactionTable({
  query,
  page,
  timeRange,
  category,
}: {
  query: string;
  page: number;
  timeRange: string;
  category: string;
}) {
  const filteredTransactions = await fetchFilteredTransactions(
    query,
    category,
    timeRange,
    page
  );
  const totalCount = await fetchTransactionsCount(query, category, timeRange);

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
