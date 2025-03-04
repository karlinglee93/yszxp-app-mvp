import ClientPieChart from "@/components/client/pie-chart";
import { fetchTransactions } from "@/lib/data";
import { Amount, TransactionQueryParams } from "@/lib/definitions";
import {
  convertCurrency,
  formatAmount,
  formatDate,
  getMonthFirstDate,
  getMonthLastDate,
} from "@/lib/utils";
import { Card } from "antd";

export default async function CategoryPieChart({
  today,
  defaultCurrency,
  rates,
}: {
  today: Date;
  defaultCurrency: string;
  rates: Record<string, number>;
}) {
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
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
  console.log(amountsByCategory)
  const combinedAmountsByCategory = amountsByCategory.reduce<
    Record<string, { category: string; total_amount: number }>
  >((acc, item) => {
    const category = item.category as string;
    const amount =
      item.currency === defaultCurrency
        ? formatAmount(item.total_amount as string)
        : convertCurrency(
            formatAmount(item.total_amount as string),
            rates[item.currency as string] as number
          );
    console.log(amount);
    if (acc[category]) {
      acc[category].total_amount += amount;
    } else {
      acc[category] = {
        category: category,
        total_amount: amount,
      };
    }

    return acc;
  }, {});
  const resultArr = Object.values(combinedAmountsByCategory);

  if (!Array.isArray(resultArr)) {
    console.error("Error fetching transactions:", resultArr);
    return;
  }

  return (
    <Card title="Spending Proportion Overview">
      <ClientPieChart datasource={resultArr} legend={false} height={222} />
    </Card>
  );
}
