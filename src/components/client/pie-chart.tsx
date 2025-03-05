"use client";
import { Amount } from "@/lib/definitions";
import { formatAmount, formatPercentage } from "@/lib/utils";
import { Pie } from "@ant-design/charts";

// TODO: to hide/combine the proportions smaller than X%
export default function ClientPieChart({
  datasource,
  legend,
  height,
}: {
  datasource: { category: string; total_amount: number }[];
  legend: boolean;
  height: number;
}) {
  const formatedData = datasource.map((item) => ({
    category: item.category,
    total_amount: Math.abs(formatAmount(item.total_amount)),
  }));
  const totalExpense = formatedData.reduce(
    (acc, item) => acc + formatAmount(item.total_amount),
    0
  );
  const config = {
    angleField: "total_amount",
    colorField: "category",
    radius: 0.8,
    innerRadius: 0.45,
    label: {
      text: (amount: Amount) =>
        `${amount.category}  ${formatPercentage(
          formatAmount(amount.total_amount) / totalExpense
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
      title: (amount: Amount) => `${amount.category} Expense: `,
      field: "total",
    },
  };

  return (
    <Pie data={formatedData} {...config} legend={legend} height={height} />
  );
}
