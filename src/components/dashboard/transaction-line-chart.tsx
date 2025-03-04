import { fetchTransactions } from "@/lib/data";
import ClientLineChart from "@/components/client/line-chart";
import {
  convertCurrency,
  formatAmount,
  formatDate,
  generateFullDates,
  getMonthFirstDate,
  getMonthLastDate,
} from "@/lib/utils";
import { Card } from "antd";
import { Amount, TransactionQueryParams } from "@/lib/definitions";

export default async function TransactionLineChart({
  today,
  defaultCurrency,
  rates,
}: {
  today: Date;
  defaultCurrency: string;
  rates: Record<string, number>;
}) {
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const startDate = getMonthFirstDate(year, monthIndex);
  const endDate = getMonthLastDate(year, monthIndex);
  const query: Partial<TransactionQueryParams> = {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    transactionType: "expense",
    groupBy: "day",
  };
  const amountsByDay: Partial<Amount>[] = await fetchTransactions(query);
  const combinedAmountsByDay = amountsByDay.reduce<
    Record<string, { day: string; total_amount: number }>
  >((acc, item) => {
    const day = formatDate(item.day as Date);
    const amount =
      item.currency === defaultCurrency
        ? formatAmount(item.total_amount as string)
        : convertCurrency(
            formatAmount(item.total_amount as string),
            rates[item.currency as string] as number
          );
    if (acc[day]) {
      acc[day].total_amount += amount;
    } else {
      acc[day] = {
        day: formatDate(item.day as Date),
        total_amount: amount,
      };
    }

    return acc;
  }, {});
  const resultArr = Object.values(combinedAmountsByDay);

  if (!Array.isArray(resultArr)) {
    console.error("Error fetching transactions:", resultArr);
    return;
  }

  const fullDates = generateFullDates(startDate, endDate);
  const completedData = fullDates.map((date) => {
    const found = resultArr.find(
      (item) => new Date(item.day).getTime() === date.getTime()
    );
    return {
      day: date.getDate(),
      total_amount: Math.abs(
        formatAmount(found ? found.total_amount.toString() : "0")
      ),
    };
  });
  const numberOfDays = resultArr.length;
  const averageDailyExpense =
    resultArr.reduce((acc, item) => acc + item.total_amount, 0) / numberOfDays;

  const config = {
    xField: "day",
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
