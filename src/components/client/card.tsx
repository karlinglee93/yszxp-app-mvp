"use client";
import { formatAmount, formatPercentage } from "@/lib/utils";
import { Card, Flex, Progress, Statistic } from "antd";

export default function ClientCard({
  income,
  expense,
  currency = "€",
}: {
  income: number;
  expense: number;
  currency: string;
}) {
  const balance = income + expense;
  const total = income - expense;
  const expensePercent = formatPercentage(expense / total);
  const incomePercent = formatPercentage(income / total);

  return (
    <Card title="Monthly Balance">
      <Flex vertical gap="small">
        <Statistic
          value={`${currency} ${formatAmount(balance)}`}
          precision={2}
        />
        <Flex gap="small">
          <label style={{ whiteSpace: "nowrap", width: "25%" }}>
            Monthly Expense
          </label>
          <Progress
            strokeColor="red"
            percent={expensePercent}
            format={() => `${currency} ${Math.abs(formatAmount(expense))}`}
            size={[200, 20]}
            percentPosition={{ align: "center", type: "inner" }}
          />
        </Flex>
        <Flex gap="small">
          <label style={{ whiteSpace: "nowrap", width: "25%" }}>
            Monthly Income
          </label>
          <Progress
            strokeColor="green"
            percent={incomePercent}
            format={() => `${currency} ${formatAmount(income)}`}
            size={[200, 20]}
            percentPosition={{ align: "center", type: "inner" }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
