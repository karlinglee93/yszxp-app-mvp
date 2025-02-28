import { fetchTransactions } from "@/lib/data";
import ClientLineChart from "@/components/client/line-chart";
import {
  formatAmount,
  formatDate,
  generateFullDates,
  getMonthFirstDate,
  getMonthLastDate,
} from "@/lib/utils";
import { Card } from "antd";
import { Amount, TransactionQueryParams } from "@/lib/definitions";

export default async function TransactionLineChart() {
  const year = new Date().getFullYear();
  const monthIndex = new Date().getMonth();
  const startDate = getMonthFirstDate(year, monthIndex);
  const endDate = getMonthLastDate(year, monthIndex);
  const query: Partial<TransactionQueryParams> = {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    transactionType: "expense",
    groupBy: "day",
  };
  const amountsByDay: Partial<Amount>[] = await fetchTransactions(query);

  if (!Array.isArray(amountsByDay)) {
    console.error("Error fetching transactions:", amountsByDay);
    return;
  }

  const fullDates = generateFullDates(startDate, endDate);
  const completedData = fullDates.map((date) => {
    const found = amountsByDay.find(
      (item) => new Date((item as Amount).day).getTime() === date.getTime()
    );
    return {
      date: date.getDate(),
      total_amount: Math.abs(
        formatAmount(found ? (found.total_amount as string) : "0")
      ),
    };
  });
  const numberOfDays = amountsByDay.length;
  const averageDailyExpense =
    amountsByDay.reduce(
      (acc, item) => acc + parseFloat(item.total_amount as string),
      0
    ) / numberOfDays;

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
  };

  return (
    <Card title="Spending Trend Overview">
      <label>
        Average Daily Spending This Month:{" "}
        {Math.abs(formatAmount(averageDailyExpense))}
      </label>
      <ClientLineChart
        datasource={completedData}
        config={config}
        isMonthChart={true}
      />
    </Card>
  );
}
