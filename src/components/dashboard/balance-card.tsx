import ClientCard from "@/components/client/card";
import { fetchTransactions } from "@/lib/data";
import { calculateTotalAmount } from "@/lib/utils";

export default async function BalanceCard({
  defaultCurrency,
  rates,
  timeRange,
}: {
  defaultCurrency: string;
  rates: Record<string, number>;
  timeRange: string;
}) {
  const transactions = await fetchTransactions(timeRange);

  if (!Array.isArray(transactions)) {
    console.error("Error fetching transactions:", transactions);
    return;
  }

  const { expense, income, balance } = calculateTotalAmount(
    transactions,
    defaultCurrency,
    rates
  );

  return (
    <ClientCard income={income} expense={expense} balance={balance} currency={defaultCurrency} />
  );
}
