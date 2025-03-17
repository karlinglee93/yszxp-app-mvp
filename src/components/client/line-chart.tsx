"use client";
import { formatAmount, formatDate } from "@/lib/utils";
import { Chart, Line, PlotEvent } from "@ant-design/charts";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";

const handleChartClick = async (ev: PlotEvent, isMonthQuery: boolean) => {
  const dateStr = ev.data?.data?.date;
  const formattedDate = isMonthQuery
    ? formatDate(dateStr)
    : dayjs(dateStr).format("YYYY-MM");

  redirect(`/dashboard/transactions?date=${formattedDate}`);
};

export default function ClientLineChart({
  datasource,
  isMonthQuery,
}: {
  datasource: { date: Date; total_amount: number }[];
  isMonthQuery: boolean;
}) {
  const isMonthQueryRef = useRef(isMonthQuery);
  useEffect(() => {
    isMonthQueryRef.current = isMonthQuery;
  }, [isMonthQuery]);

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
    onReady: ({ chart }: { chart: Chart }) => {
      chart.on("element:pointerover", (evt: PlotEvent) => {
        evt.target.style.cursor = "pointer";
      });
      chart.on(`element:click`, (ev: PlotEvent) =>
        handleChartClick(ev, isMonthQueryRef.current)
      );
    },
  };

  return <Line height={200} data={datasource} {...config} />;
}
