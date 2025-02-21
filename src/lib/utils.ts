// import CurrencyConverter from 'currency-converter-lt';

// export const convertCurrency: number = async (amount: number, currency: string, defaultCurrency: string) => {
//   if (currency !== defaultCurrency) {
//     const currencyConverter = new CurrencyConverter({ from: `${currency}`, to: `${defaultCurrency}`, amount: amount });
//     return await currencyConverter.convert();
//   }

//   return amount;
// }

export const formatAmount = (amount: number) => {
  return Math.abs(Math.round(amount * 100) / 100);
};

export const formatPercentage = (persentage: number) => {
  return Math.abs(Math.round(persentage * 100));
}

export const generateDates = (startDate: Date, endDate: Date) => {
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

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1);
};

export const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0);
};