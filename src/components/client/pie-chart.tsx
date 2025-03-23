"use client";
import { Amount } from "@/lib/definitions";
import { formatAmount, formatPercentage } from "@/lib/utils";
import { Chart, Pie, PlotEvent } from "@ant-design/charts";
import { message } from "antd";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

export default function ClientPieChart({
  datasource,
  legend,
}: {
  datasource: { category: string; total_amount: number; total_count: number }[];
  legend: boolean;
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const info = (message: string) => {
    messageApi.info(message);
  };

  const topCategories = datasource.slice(0, 8);
  const otherCategories = datasource.slice(8);
  const formattedOtherCategories = otherCategories.reduce<{
    categories: string[];
    total_amount: number;
    total_count: number;
  }>(
    (acc, item) => {
      acc.total_amount += item.total_amount;
      acc.categories.push(item.category);
      acc.total_count += item.total_count;
      return acc;
    },
    { categories: [], total_amount: 0, total_count: 0 }
  );

  if (otherCategories.length > 0) {
    topCategories.push({
      category: "other_categories",
      total_amount: formattedOtherCategories.total_amount,
      total_count: formattedOtherCategories.total_count,
    });
  }

  const formatedData = topCategories.map((item) => ({
    category: item.category,
    total_amount: Math.abs(formatAmount(item.total_amount)),
    total_count: item.total_count,
  }));
  const totalExpense = formatedData.reduce(
    (acc, item) => acc + formatAmount(item.total_amount),
    0
  );

  const handleChartClick = async (ev: PlotEvent) => {
    const { category } = ev.data.data;
    if (category === "other_categories") {
      const message = `Other categories: ${formattedOtherCategories.categories.join(
        ", "
      )}`;
      info(message);
      return;
    }

    const curDate =
      new URLSearchParams(window.location.search).get("date") ||
      dayjs().format("YYYY-MM");

    redirect(`/dashboard/transactions?date=${curDate}&category=${category}`);
  };

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
      style: {
        fill: "#666",
        fontSize: 12,
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    tooltip: {
      title: (amount: Amount) => `${amount.category}: `,
      items: [
        {
          field: "total_amount",
          name: "Percentage",
          valueFormatter: (amount: number) =>
            `${formatPercentage(formatAmount(amount) / totalExpense)}%`,
        },
        {
          field: "total_amount",
          name: "Total amount",
          valueFormatter: (value: number) => value,
        },
        {
          field: "total_count",
          name: "Count of transactions",
          valueFormatter: (value: number) => value,
        },
      ],
    },
    onReady: ({ chart }: { chart: Chart }) => {
      chart.on("interval:pointerover", (evt: PlotEvent) => {
        evt.target.style.cursor = "pointer";
      });
      chart.on(`interval:click`, handleChartClick);
    },
  };

  return (
    <div>
      {contextHolder}
      <Pie data={formatedData} {...config} legend={legend} height={252} />
    </div>
  );
}
