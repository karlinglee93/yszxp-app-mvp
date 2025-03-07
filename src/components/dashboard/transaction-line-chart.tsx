import {
  fetchExpenseTotalAmountByDate,
  fetchIncomeTotalAmountByDate,
  fetchTotalAmountByDate,
} from "@/lib/data";
import ClientLineChart from "@/components/client/line-chart";
import {
  convertCurrency,
  formatAmount,
  formatDate,
  generateFullDates,
} from "@/lib/utils";
import { Card } from "antd";
import { TotalAmountByDateType, TransactionTypeType } from "@/lib/definitions";

export default async function TransactionLineChart({
  title,
  defaultCurrency,
  rates,
  timeRange,
  type,
}: {
  title: string;
  defaultCurrency: string;
  rates: Record<string, number>;
  timeRange: { start: string; end: string };
  type: TransactionTypeType;
}) {
  const start = formatDate(timeRange.start);
  const end = formatDate(timeRange.end);

  let totalAmountsByDate: TotalAmountByDateType[] = [];
  if (type === TransactionTypeType.EXPENSE) {
    totalAmountsByDate = await fetchExpenseTotalAmountByDate(start, end);
  } else if (type === TransactionTypeType.INCOME) {
    totalAmountsByDate = await fetchIncomeTotalAmountByDate(start, end);
  } else if (type === TransactionTypeType.ALL) {
    totalAmountsByDate = await fetchTotalAmountByDate(start, end);
  } else {
    throw Error(`No such transaction type: ${type}`);
  }

  const tempTotalAmountsByDate = totalAmountsByDate.reduce<
    Record<string, { date: string; total_amount: number }>
  >((acc, item) => {
    const date = formatDate(item.date);
    const amount =
      item.currency === defaultCurrency
        ? formatAmount(item.total_amount)
        : convertCurrency(
            formatAmount(item.total_amount),
            rates[item.currency]
          );
    if (acc[date]) {
      acc[date].total_amount += amount;
    } else {
      acc[date] = {
        date: formatDate(item.date),
        total_amount: amount,
      };
    }

    return acc;
  }, {});
  const results = Object.values(tempTotalAmountsByDate);

  if (!Array.isArray(results)) {
    console.error("Error fetching transactions:", results);
    return;
  }

  const fullDates = generateFullDates(start, end);
  const completedData = fullDates.map((date) => {
    const found = results.find(
      (item) => new Date(item.date).getTime() === date.getTime()
    );
    return {
      date: date,
      total_amount: Math.abs(formatAmount(found ? found.total_amount : 0)),
    };
  });
  const numberOfPastDays = Math.ceil(
    (new Date().getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)
  );
  const averageAmount =
    results.reduce((acc, item) => acc + item.total_amount, 0) /
    numberOfPastDays;

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
    <Card title={`${title} Trend Overview`}>
      <label>
        Average Daily {title} This Month:{" "}
        {Math.abs(formatAmount(averageAmount))}
      </label>
      <ClientLineChart
        datasource={completedData}
        config={config}
        isMonthChart={true}
      />
    </Card>
  );
}
