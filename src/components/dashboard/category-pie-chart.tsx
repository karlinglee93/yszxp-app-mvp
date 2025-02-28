import ClientPieChart from "@/components/client/pie-chart";
import { fetchTransactions } from "@/lib/data";
import { Amount, TransactionQueryParams } from "@/lib/definitions";
import { formatDate, getMonthFirstDate, getMonthLastDate } from "@/lib/utils";
import { Card } from "antd";

export default async function CategoryPieChart() {
  const year = new Date().getFullYear();
  const monthIndex = new Date().getMonth();
  const startDate = getMonthFirstDate(year, monthIndex);
  const endDate = getMonthLastDate(year, monthIndex);
  const query: Partial<TransactionQueryParams> = {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    transactionType: "expense",
    groupBy: "category",
    sortBy: "amount",
  };
  const amountsByCategory: Partial<Amount>[] = await fetchTransactions(query);

  if (!Array.isArray(amountsByCategory)) {
    console.error("Error fetching transactions:", amountsByCategory);
    return;
  }

  return (
    <Card title="Spending Proportion Overview">
      <ClientPieChart
        datasource={amountsByCategory}
        legend={false}
        height={222}
      />
    </Card>
  );
}
