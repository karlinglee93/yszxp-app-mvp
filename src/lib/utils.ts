import { TransactionType } from "./definitions";

export const formatAmount = (amount: number | string) => {
  if (typeof amount === "string")
    return Math.round(parseFloat(amount) * 100) / 100;
  return Math.round(amount * 100) / 100;
};

export const formatPercentage = (persentage: number) => {
  return Math.abs(Math.round(persentage * 100));
};

export const generateFullDates = (
  startDate: Date | string,
  endDate: Date | string
) => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const dates = [];
  const current = new Date(start);

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

export const formatDate = (date: Date | string): string => {
  if (typeof date === "string")
    return new Date(date).toISOString().split("T")[0];
  return date.toISOString().split("T")[0];
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
    // TODO: handle custom date
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
