"use client";
import { Line } from "@ant-design/charts";

export default function ClientLineChart({
  datasource,
  config,
  isMonthChart = true,
}: {
  datasource: object[];
  config: object;
  isMonthChart: boolean;
}) {
  // TODO: enhance chart to support all date range, instead on monthly only
  if (!isMonthChart) return;

  return <Line height={200} data={datasource} {...config} />;
}
