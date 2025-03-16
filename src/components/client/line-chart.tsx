"use client";
import { formatAmount } from "@/lib/utils";
import { Line } from "@ant-design/charts";
import dayjs from "dayjs";

export default function ClientLineChart({
  datasource,
  isMonthQuery,
}: {
  datasource: { date: Date; total_amount: number }[];
  isMonthQuery: boolean;
}) {
  const config = {
    xField: "date",
    yField: "total_amount",
    point: {
      shapeField: "circle",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    tooltip: {
      title: null,
      items: [
        {
          channel: "x",
          name: "Date",
          valueFormatter: (date: string) =>
            isMonthQuery
              ? dayjs(date).format("YYYY-MM-DD")
              : dayjs(date).format("YYYY-MM"),
        },
        {
          channel: "y",
          name: "Total amount",
          valueFormatter: (d: number) =>
            d > 0 ? formatAmount(d) : "No Transactions",
        },
      ],
    },
  };

  return <Line height={200} data={datasource} {...config} />;
}
