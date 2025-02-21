"use client";
import { FormatedTransactionByCategory } from "@/lib/definitions";
import { formatPercentage } from "@/lib/utils";
import { Pie } from "@ant-design/charts";

export default function CategoryPieChart({
  datasource,
}: {
  datasource: FormatedTransactionByCategory[];
}) {
  const totalExpense = datasource.reduce(
    (acc, transaction) => acc + transaction.total,
    0
  );
  const config = {
    angleField: "total",
    colorField: "category",
    radius: 0.8,
    label: {
      text: (transacation: FormatedTransactionByCategory) =>
        `${transacation.category}  ${formatPercentage(
          transacation.total / totalExpense
        )}%`,
      position: "spider",
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    tooltip: {
      title: (transaction: FormatedTransactionByCategory) =>
        `${transaction.category} Expense: `,
      field: "total",
    },
  };

  return (
    <main>
      <Pie data={datasource} {...config} />
    </main>
  );
}
