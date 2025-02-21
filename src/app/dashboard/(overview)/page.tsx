import BalanceCard from "@/components/dashboard/balance-card";
import CategoryPieChart from "@/components/dashboard/category-pie-chart";
import TransactionLineChart from "@/components/dashboard/transaction-line-chart";
import { fetchMonthlyTransactions } from "@/lib/data";
import {
  FormatedTransactioByDay,
  FormatedTransactionByCategory,
} from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";

export default async function Page() {
  const monthlyTransactions = await fetchMonthlyTransactions();
  // Card data
  const monthlyExpense = monthlyTransactions.reduce((total, current) => {
    // TODO: add currency converter
    const currentAmount = parseFloat(current.amount);
    return currentAmount < 0 ? total + currentAmount : total;
  }, 0);
  const monthlyIncome = monthlyTransactions.reduce((total, current) => {
    const currentAmount = parseFloat(current.amount);
    return currentAmount > 0 ? total + currentAmount : total;
  }, 0);
  // Line chart data
  const curMonthExpenseByDayObj = monthlyTransactions.reduce<
    Record<string, FormatedTransactioByDay>
  >((acc, transaction) => {
    const amount = parseFloat(transaction.amount);
    if (amount < 0) {
      const date = (transaction.created_at as Date).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = { date, total: 0 };
      }
      acc[date].total += formatAmount(amount);
    }

    return acc;
  }, {} as Record<string, FormatedTransactioByDay>);
  const curMonthExpenseByDay = Object.values(curMonthExpenseByDayObj);
  // Pie chart data
  const curMonthExpenseByCategoryObj = monthlyTransactions.reduce<
    Record<string, FormatedTransactionByCategory>
  >((acc, transaction) => {
    const amount = parseFloat(transaction.amount);
    if (amount < 0) {
      const category = transaction.category_name;
      if (!acc[category]) {
        acc[category] = { category, total: 0 };
      }
      acc[category].total += formatAmount(amount);
    }

    return acc;
  }, {} as Record<string, FormatedTransactionByCategory>);
  const curMonthExpenseByCategory = Object.values(curMonthExpenseByCategoryObj);

  return (
    <main>
      <BalanceCard
        expense={formatAmount(monthlyExpense)}
        income={formatAmount(monthlyIncome)}
      />
      <TransactionLineChart datasource={curMonthExpenseByDay} isMonthChart />
      <CategoryPieChart datasource={curMonthExpenseByCategory} />
    </main>
  );
}
