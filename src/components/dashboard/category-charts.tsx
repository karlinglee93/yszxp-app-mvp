import ClientPieChart from "@/components/client/pie-chart";
import {
  fetchExpenseTotalAmountByCategory,
  fetchIncomeTotalAmountByCategory,
} from "@/lib/data";
import {
  TotalAmountByCategoryType,
  TransactionTypeType,
} from "@/lib/definitions";
import { convertCurrency, formatAmount, formatPercentage } from "@/lib/utils";
import { Card, Flex } from "antd";
import ClientProgress from "../client/progress";

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
  const maxAmount = Math.max(...results.map((item) => item.total_amount));

  if (!Array.isArray(results)) {
    console.error("Error fetching transactions:", results);
    return;
  }

  const topCategories = results.slice(0, 8);
  const otherCategories = results.slice(8);
  const otherTotal = otherCategories.reduce(
    (sum, item) => sum + item.total_amount,
    0
  );
  if (otherCategories.length > 0) {
    topCategories.push({
      category: "other expenses",
      total_amount: otherTotal,
    });
  }

  console.log(topCategories);

  return (
    <Card title={title}>
      <Flex>
        <div>
          <ClientPieChart
            datasource={topCategories}
            legend={false}
            height={222}
          />
        </div>
        <div>
          {topCategories.map((item) => (
            <Flex key={item.category}>
              <label style={{ whiteSpace: "nowrap", width: "60%" }}>
                {item.category}:&nbsp;
              </label>
              <ClientProgress
                key={item.category}
                color={type === TransactionTypeType.EXPENSE ? "red" : "green"}
                percent={formatPercentage(item.total_amount / maxAmount)}
                format={formatAmount(item.total_amount)}
              />
            </Flex>
          ))}
        </div>
      </Flex>
    </Card>
  );
}
