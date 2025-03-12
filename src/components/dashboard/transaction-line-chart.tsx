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
  formatDateByYearAndMonth,
  generateFullDates,
  getDateType,
  getNumberOfPastDates,
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
  timeRange: string;
  type: TransactionTypeType;
}) {
  // TODO: fix expense chart and income chart width rendering issue
  // TODO: fix x, y axis display date issue
  const { isMonthQuery } = getDateType(timeRange);
  let totalAmountsByDate: TotalAmountByDateType[] = [];
  if (type === TransactionTypeType.EXPENSE) {
    totalAmountsByDate = await fetchExpenseTotalAmountByDate(timeRange);
  } else if (type === TransactionTypeType.INCOME) {
    totalAmountsByDate = await fetchIncomeTotalAmountByDate(timeRange);
  } else if (type === TransactionTypeType.ALL) {
    totalAmountsByDate = await fetchTotalAmountByDate(timeRange);
  } else {
    throw Error(`No such transaction type: ${type}`);
  }
  const tempTotalAmountsByDate = totalAmountsByDate.reduce<
    Record<string, { date: string; total_amount: number }>
  >((acc, item) => {
    const date = isMonthQuery
      ? formatDate(item.date)
      : formatDateByYearAndMonth(item.date);
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
        date: date,
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

  const fullDates = generateFullDates(timeRange);
  const completedData = fullDates.map((date) => {
    // TODO: !!!
    const found = results.find((item) => {
      return isMonthQuery
        ? new Date(item.date).getTime() === date.getTime()
        : formatDateByYearAndMonth(item.date) ===
            formatDateByYearAndMonth(date);
    });
    return {
      date: date,
      total_amount: Math.abs(formatAmount(found ? found.total_amount : 0)),
    };
  });
  const averageAmountText = `Average ${isMonthQuery ? "Daily" : "Monthly"} ${
    type === TransactionTypeType.EXPENSE
      ? "Spending"
      : type === TransactionTypeType.INCOME
      ? "Earning"
      : "Banlance"
  } this ${isMonthQuery ? "Month" : "Year"}: `;
  const numberOfPastDates = getNumberOfPastDates(timeRange);
  const averageAmount =
    results.reduce((acc, item) => acc + item.total_amount, 0) /
    numberOfPastDates;

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
    <Card title={title}>
      <label>
        {averageAmountText}
        {Math.abs(formatAmount(averageAmount))}
      </label>
      <ClientLineChart datasource={completedData} config={config} />
    </Card>
  );
}
