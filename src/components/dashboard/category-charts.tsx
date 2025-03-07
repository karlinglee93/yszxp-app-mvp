import ClientPieChart from "@/components/client/pie-chart";
import {
  fetchExpenseTotalAmountByCategory,
  fetchIncomeTotalAmountByCategory,
} from "@/lib/data";
import {
  TotalAmountByCategoryType,
  TransactionTypeType,
} from "@/lib/definitions";
import {
  convertCurrency,
  formatAmount,
  formatDate,
  formatPercentage,
} from "@/lib/utils";
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
  timeRange: { start: string; end: string };
  type: TransactionTypeType;
}) {
  const start = formatDate(timeRange.start);
  const end = formatDate(timeRange.end);

  let totalAmountsByCategory: TotalAmountByCategoryType[] = [];
  if (type === TransactionTypeType.EXPENSE) {
    totalAmountsByCategory = await fetchExpenseTotalAmountByCategory(
      start,
      end
    );
  } else if (type === TransactionTypeType.INCOME) {
    totalAmountsByCategory = await fetchIncomeTotalAmountByCategory(start, end);
  } else {
    throw Error(`No such transaction type: ${type}`);
  }

  const tempTotalAmountsByCategory = totalAmountsByCategory.reduce<
    Record<string, { category: string; total_amount: number }>
  >((acc, item) => {
    const category = item.category;
    const amount =
      item.currency === defaultCurrency
        ? formatAmount(item.total_amount)
        : convertCurrency(
            formatAmount(item.total_amount),
            rates[item.currency]
          );
    if (acc[category]) {
      acc[category].total_amount += Math.abs(amount);
    } else {
      acc[category] = {
        category: category,
        total_amount: Math.abs(amount),
      };
    }

    return acc;
  }, {});
  const results = Object.values(tempTotalAmountsByCategory);
  const maxAmount = Math.max(...results.map((item) => item.total_amount));

  if (!Array.isArray(results)) {
    console.error("Error fetching transactions:", results);
    return;
  }

  return (
    <Card title={title}>
      <Flex>
        <div>
          <ClientPieChart datasource={results} legend={false} height={222} />
        </div>
        <div>
          {results.map((item) => (
            <Flex key={item.category}>
              <label style={{ whiteSpace: "nowrap", width: "60%" }}>
                {item.category}:&nbsp;
              </label>
              <ClientProgress
                key={item.category}
                color={type === TransactionTypeType.EXPENSE ? "red" : "green"}
                percent={formatPercentage(item.total_amount / maxAmount)}
                format={item.total_amount}
              />
            </Flex>
          ))}
        </div>
      </Flex>
    </Card>
  );
}
