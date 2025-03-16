import ClientPieChart from "@/components/client/pie-chart";
import {
  fetchExpenseTotalAmountByCategory,
  fetchIncomeTotalAmountByCategory,
} from "@/lib/data";
import {
  TotalAmountByCategoryType,
  TransactionTypeType,
} from "@/lib/definitions";
import { convertCurrency, formatAmount } from "@/lib/utils";
import { Card } from "antd";

export default async function CategoryCharts({
  title,
  defaultCurrency,
  rates,
  timeRange,
  type,
}: {
  title: string;
  defaultCurrency: string;
  rates: Record<string, number>;
  timeRange: string;
  type: TransactionTypeType;
}) {
  // TODO: to display how many transactions made by each category
  let totalAmountsByCategory: TotalAmountByCategoryType[] = [];
  if (type === TransactionTypeType.EXPENSE) {
    totalAmountsByCategory = await fetchExpenseTotalAmountByCategory(timeRange);
  } else if (type === TransactionTypeType.INCOME) {
    totalAmountsByCategory = await fetchIncomeTotalAmountByCategory(timeRange);
  } else {
    throw Error(`No such transaction type: ${type}`);
  }

  const tempTotalAmountsByCategory = totalAmountsByCategory.reduce<
    Record<string, { category: string; total_amount: number }>
  >((acc, item) => {
    const category = item.category;
    const amount =
      item.currency === defaultCurrency
        ? item.total_amount
        : convertCurrency(
            formatAmount(item.total_amount),
            rates[item.currency]
          );
    if (acc[category]) {
      acc[category].total_amount += Math.abs(formatAmount(amount));
    } else {
      acc[category] = {
        category: category,
        total_amount: Math.abs(formatAmount(amount)),
      };
    }

    return acc;
  }, {});
  const results = Object.values(tempTotalAmountsByCategory).sort(
    (a, b) => b.total_amount - a.total_amount
  );

  if (!Array.isArray(results)) {
    console.error("Error fetching transactions:", results);
    return;
  }

  return (
    <Card title={title}>
      <ClientPieChart datasource={results} legend={false} height={222} />
    </Card>
  );
}
