import ClientPieChart from "@/components/client/pie-chart";
import { fetchTransactions } from "@/lib/data";
import { Amount, TransactionQueryParams } from "@/lib/definitions";
import { convertCurrency, formatAmount, formatPercentage } from "@/lib/utils";
import { Card, Flex } from "antd";
import ClientProgress from "../client/progress";

export default async function CategoryChart({
  defaultCurrency,
  rates,
  query,
}: {
  defaultCurrency: string;
  rates: Record<string, number>;
  query: Partial<TransactionQueryParams>;
}) {
  const amountsByCategory: Partial<Amount>[] = await fetchTransactions(query);
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
  const resultArr = Object.values(combinedAmountsByCategory).sort(
    (a, b) => b.total_amount - a.total_amount
  );
  const maxAmount = Math.max(...resultArr.map((item) => item.total_amount));

  if (!Array.isArray(resultArr)) {
    console.error("Error fetching transactions:", resultArr);
    return;
  }

  return (
    <Card title="Spending Proportion Overview">
      <Flex>
        <div>
          <ClientPieChart datasource={resultArr} legend={false} height={222} />
        </div>
        <div>
          {resultArr.map((item) => (
            <Flex key={item.category}>
              <label style={{ whiteSpace: "nowrap", width: "60%" }}>
                {item.category}:&nbsp;
              </label>
              <ClientProgress
                key={item.category}
                color={"red"}
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
