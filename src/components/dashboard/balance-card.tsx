"use client";
import { Card, Flex, Progress, Statistic } from "antd";

export default function BalanceCard({
  expense,
  income,
}: {
  expense: number;
  income: number;
}) {
  const tempCurrency = "€";
  const balance = income - expense;
  const total = income + expense;
  const expensePercent = (expense / total) * 100;
  const incomePercent = (income / total) * 100;

  return (
    <Card title="Monthly Balance">
      <Flex vertical gap="small">
        <Statistic value={`${tempCurrency} ${balance}`} precision={2} />
        <Flex gap="small">
          <label style={{ whiteSpace: "nowrap", width: "25%" }}>
            Monthly Expense
          </label>
          <Progress
            strokeColor="red"
            percent={expensePercent}
            format={() => `${tempCurrency} ${expense}`}
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
            format={() => `${tempCurrency} ${income}`}
            size={[200, 20]}
            percentPosition={{ align: "center", type: "inner" }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
