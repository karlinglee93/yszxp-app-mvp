"use client"
import { Progress } from "antd";

export default function ClientProgress({
  color,
  percent,
  format,
}: {
  color: string;
  percent: number;
  format: number
}) {
  return (
    <Progress
      strokeColor={color}
      percent={percent}
      format={() => format}
      size={[200, 20]}
      percentPosition={{ align: "center", type: "inner" }}
    />
  );
}
