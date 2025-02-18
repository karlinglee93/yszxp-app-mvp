import BalanceCard from "@/components/dashboard/balance-card";
import { fetchMonthlyTransactions } from "@/lib/data";
import { formatAmount } from "@/lib/utils";

export default async function Page() {
  const monthlyTransactions = await fetchMonthlyTransactions();
  const monthlyExpense = monthlyTransactions.reduce((total, current) => {
    // TODO: add currency converter
    const currentAmount = parseFloat(current.amount);
    return currentAmount < 0 ? total + currentAmount : total;
  }, 0);
  const monthlyIncome = monthlyTransactions.reduce((total, current) => {
    const currentAmount = parseFloat(current.amount);
    return currentAmount > 0 ? total + currentAmount : total;
  }, 0);

  return (
    <main>
      <BalanceCard expense={formatAmount(monthlyExpense)} income={formatAmount(monthlyIncome)} />
    </main>
  );
}
