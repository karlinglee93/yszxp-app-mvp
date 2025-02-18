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
