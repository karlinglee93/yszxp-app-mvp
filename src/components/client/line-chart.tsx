"use client";
import { Line } from "@ant-design/charts";

export default function ClientLineChart({
  datasource,
  config,
}: {
  datasource: { date: Date; total_amount: number }[];
  config: object;
}) {
  return <Line height={200} data={datasource} {...config} />;
}
