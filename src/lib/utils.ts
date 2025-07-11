import { AnalysisResult, RecurringTransactionType, TransactionType } from "./definitions";

export const formatAmount = (amount: number | string) => {
  const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(parsedAmount)) return 0.0;

  return parseFloat(parsedAmount.toFixed(2));
};

export const formatPercentage = (persentage: number) => {
  return Math.abs(Math.round(persentage * 100));
};

export const getDateType = (timeRange: string) => {
  let isCurrent = true;
  let isMonthQuery = true;
  const dateArr = timeRange.split("-");

  if (dateArr.length === 1) {
    isMonthQuery = false;
    isCurrent = new Date(timeRange).getFullYear() === new Date().getFullYear();
  } else if (dateArr.length === 2) {
    isMonthQuery = true;
    isCurrent =
      new Date(timeRange).getFullYear() === new Date().getFullYear() &&
      new Date(timeRange).getMonth() === new Date().getMonth();
  } else {
    throw new Error(`Incorrect time range format: ${timeRange}`);
  }

  return { isCurrent, isMonthQuery };
};

export const generateFullDates = (timeRange: string) => {
  const { isMonthQuery } = getDateType(timeRange);

  const dateArr = timeRange.split("-");
  const dates = [];
  let start: Date;
  let end: Date;
  let current: Date;

  if (isMonthQuery) {
    const year = Number(dateArr[0]);
    const month = Number(dateArr[1]);
    start = new Date(Date.UTC(year, month - 1, 1));
    end = new Date(Date.UTC(year, month, 0));
    current = start;

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  } else if (!isMonthQuery) {
    const year = Number(dateArr[0]);
    start = new Date(Date.UTC(year, 0, 1));
    end = new Date(Date.UTC(year, 11, 31));
    current = start;

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(1);
      current.setMonth(current.getMonth() + 2);
      current.setDate(0);
    }
  } else {
    throw new Error(`Incorrect time range format: ${timeRange}`);
  }
  return dates;
};

export const getNumberOfPastDates = (timeRange: string) => {
  const { isCurrent, isMonthQuery } = getDateType(timeRange);
  const dateArr = timeRange.split("-");

  if (isCurrent && isMonthQuery) {
    return Math.ceil(
      (new Date().getTime() - new Date(timeRange).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  } else if (!isCurrent && isMonthQuery) {
    return new Date(Number(dateArr[0]), Number(dateArr[1]), 0).getDate();
  } else if (isCurrent && !isMonthQuery) {
    return new Date().getMonth() + 1;
  } else {
    return 12;
  }
};

export const formatDate = (date: Date | string): string => {
  if (typeof date === "string") {
    return new Date(date).toISOString().split("T")[0];
  }
  return date.toISOString().split("T")[0];
};

export const formatDateByYearAndMonth = (date: Date | string): string => {
  let tempDate = date;
  if (typeof tempDate === "string") {
    tempDate = new Date(tempDate);
  }
  return `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}`;
};

export const getDates = (type: string): { start: string; end: string } => {
  const today = new Date();
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const day = today.getDate();

  switch (type) {
    case "last_30_days":
      return {
        start: formatDate(new Date(year, monthIndex - 1, day)),
        end: formatDate(today),
      };
    case "this_year":
      return {
        start: formatDate(new Date(year, 0, 1)),
        end: formatDate(new Date(year, 11, 31)),
      };
    case "last_12_months":
      return {
        start: formatDate(new Date(year - 1, monthIndex, day)),
        end: formatDate(today),
      };
    case "from_start":
      return {
        start: formatDate(new Date("2000-01-01")),
        end: formatDate(today),
      };
    case "custom":
    case "this_month":
    default:
      return {
        start: formatDate(new Date(year, monthIndex, 1)),
        end: formatDate(new Date(year, monthIndex + 1, 0)),
      };
  }
};

export const convertCurrency = (value: number, rate: number) => {
  return formatAmount(value / rate);
};

export const calculateTotalAmount = (
  transactions: TransactionType[],
  defaultCurrency: string,
  rates: Record<string, number>
) => {
  const totalAmount = transactions.reduce(
    (
      acc: { expense: number; income: number; balance: number },
      item: TransactionType
    ) => {
      const amount = parseFloat(item.amount);
      const transactionCurrency = item.currency_name;

      let currencyRate = 1;
      if (transactionCurrency !== defaultCurrency) {
        currencyRate = rates[transactionCurrency];
        console.info(
          `Different currency is used in the transaction on ${item.created_at}: amount: ${item.amount}, currency: ${item.currency_name}
          the currency rate is ${currencyRate}`
        );
      }

      if (amount < 0) {
        acc.expense = acc.expense + convertCurrency(amount, currencyRate);
      } else if (amount > 0) {
        acc.income = acc.income + convertCurrency(amount, currencyRate);
      }
      acc.balance = acc.balance + convertCurrency(amount, currencyRate);

      return acc;
    },
    { expense: 0, income: 0, balance: 0 }
  );

  return totalAmount;
};

export const calculateNextRecurringDate = (
  created_at: string,
  frequency: RecurringTransactionType
) => {
  const today = new Date();
  const curDate = new Date(created_at);

  while (curDate <= today) {
    switch (frequency) {
      case RecurringTransactionType.DAILY:
        curDate.setDate(curDate.getDate() + 1);
        break;
      case RecurringTransactionType.WEEKLY:
        curDate.setDate(curDate.getDate() + 7);
        break;
      case RecurringTransactionType.MONTHLY:
        curDate.setMonth(curDate.getMonth() + 1);
        break;
      case RecurringTransactionType.YEARLY:
        curDate.setFullYear(curDate.getFullYear() + 1);
        break;
      default:
        throw new Error("Invalid frequency type");
    }
  }

  return curDate.toISOString();
};

export function tryParseJSON(input: string | null) {
  if (!input) return null;

  try {
    const parsed = JSON.parse(
      input
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim()
    );

    if (typeof parsed === "object" && parsed !== null) {
      return parsed as AnalysisResult;
    }
    return input;
  } catch {
    return input;
  }
}
