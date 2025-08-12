import ClientTable from "@/components/client/table";
import { fetchFilteredTransactions, fetchTransactionsCount } from "@/lib/data";
import { Suspense } from "react";

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
    <Suspense fallback={null}>
      <ClientTable datasource={filteredTransactions} totalCount={totalCount} />
    </Suspense>
  );
}
