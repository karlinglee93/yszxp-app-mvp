import BalanceCard from "@/components/dashboard/balance-card";
import CategoryPieChart from "@/components/dashboard/category-pie-chart";
import TransactionLineChart from "@/components/dashboard/transaction-line-chart";
import TransactionList from "@/components/dashboard/transaction-list";
import { fetchMonthlyTransactions } from "@/lib/data";
import {
  FormatedTransactionByDay,
  FormatedTransactionByCategory,
} from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";
import { Col, Row } from "antd";

// TODO: beauty layout
// TODO: handle currency difference
// TODO: add more cards, charts or lists
// TODO: add category color and avatar configs
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
    Record<string, FormatedTransactionByDay>
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
  }, {} as Record<string, FormatedTransactionByDay>);
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
  // Latest expense list
  // TODO: fix bug - shared object
  const curMonthExpenseTransactions = monthlyTransactions.filter(
    (transaction) => parseFloat(transaction.amount) < 0
  );
  const curMonthExpenseTransactionsSorted = curMonthExpenseTransactions.sort(
    (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
  );

  return (
    <main>
      <Row>
        <Col span={12}>
          <BalanceCard
            expense={formatAmount(monthlyExpense)}
            income={formatAmount(monthlyIncome)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <TransactionLineChart
            datasource={curMonthExpenseByDay}
            isMonthChart
          />
        </Col>
        <Col span={12}>
          <CategoryPieChart datasource={curMonthExpenseByCategory} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <TransactionList
            title="Recent Spending"
            datasource={curMonthExpenseTransactions}
            displayCount={5}
          />
        </Col>
        <Col span={12}>
          <TransactionList
            title="Lastest Spending Rankings"
            datasource={curMonthExpenseTransactionsSorted}
            displayCount={5}
          />
        </Col>
      </Row>
    </main>
  );
}
