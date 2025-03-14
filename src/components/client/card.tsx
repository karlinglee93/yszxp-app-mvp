"use client";
import { formatAmount, formatPercentage } from "@/lib/utils";
import { Card, Flex, Progress, Statistic } from "antd";

export default function ClientCard({
  title,
  income,
  expense,
  balance,
  currency = "€",
}: {
  title: string;
  income: number;
  expense: number;
  balance: number;
  currency: string;
}) {
  const total = income - expense;
  const expensePercent = formatPercentage(expense / total);
  const incomePercent = formatPercentage(income / total);

  return (
    <Card title={title}>
      <Flex vertical gap="small">
        <Statistic
          value={`${currency} ${formatAmount(balance)}`}
          precision={2}
        />
        <Flex gap="small">
          <label style={{ whiteSpace: "nowrap", width: "20%" }}>
            Expense
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
          <label style={{ whiteSpace: "nowrap", width: "20%" }}>
            Income
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
