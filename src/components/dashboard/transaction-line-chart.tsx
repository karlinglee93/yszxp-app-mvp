"use client";
import { FormatedTransactionByDay } from "@/lib/definitions";
import {
  formatAmount,
  formatDate,
  generateDates,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from "@/lib/utils";
import { Line } from "@ant-design/charts";
import { Card } from "antd";

const config = {
  xField: "date",
  yField: "total",
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
};

export default function TransactionLineChart({
  datasource,
  isMonthChart = true,
}: {
  datasource: FormatedTransactionByDay[];
  isMonthChart: boolean;
}) {
  // TODO: enhance chart to support all date range, instead on monthly only
  if (!isMonthChart) return;
  const year = new Date(datasource[0].date).getFullYear();
  const month = new Date(datasource[0].date).getMonth();
  const startDate = getFirstDayOfMonth(year, month);
  const lastDate = getLastDayOfMonth(year, month);
  const completedDates = generateDates(startDate, lastDate);
  const completedData = completedDates.map((date) => {
    const found = datasource.find(
      (item) => new Date(item.date).getTime() === date.getTime()
    );
    return found
      ? found
      : ({ date: formatDate(date), total: 0 } as FormatedTransactionByDay);
  });
  const numberOfDays = datasource.length;
  const AverageDailyExpense =
    datasource.reduce((acc, transaction) => acc + transaction.total, 0) /
    numberOfDays;

  return (
    <Card title="Spending Trend Overview">
      <label>
        Average Daily Spending This Month: {formatAmount(AverageDailyExpense)}
      </label>
      <Line height={200} data={completedData} {...config} />
    </Card>
  );
}
