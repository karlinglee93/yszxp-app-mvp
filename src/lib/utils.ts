// import CurrencyConverter from 'currency-converter-lt';

// export const convertCurrency: number = async (amount: number, currency: string, defaultCurrency: string) => {
//   if (currency !== defaultCurrency) {
//     const currencyConverter = new CurrencyConverter({ from: `${currency}`, to: `${defaultCurrency}`, amount: amount });
//     return await currencyConverter.convert();
//   }

//   return amount;
// }

export const formatAmount = (amount: number | string) => {
  if (typeof amount === "string")
    return Math.round(parseFloat(amount) * 100) / 100;
  return Math.round(amount * 100) / 100;
};

export const formatPercentage = (persentage: number) => {
  return Math.abs(Math.round(persentage * 100));
};

export const generateFullDates = (startDate: Date, endDate: Date) => {
  const dates = [];
  const curDate = new Date(startDate);

  while (curDate <= endDate) {
    dates.push(new Date(curDate));
    curDate.setDate(curDate.getDate() + 1);
  }

  return dates;
};

export const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const getMonthFirstDate = (year: number, monthIndex: number) => {
  return new Date(year, monthIndex, 1);
};

export const getMonthLastDate = (year: number, monthIndex: number) => {
  return new Date(year, monthIndex + 1, 0);
};

export const convertCurrency = (value: number, rate: number) => {
  return value / rate;
};
