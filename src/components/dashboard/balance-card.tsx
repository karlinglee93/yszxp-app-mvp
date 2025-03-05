import ClientCard from "@/components/client/card";
import { fetchTransactions } from "@/lib/data";
import { Transaction, TransactionQueryParams } from "@/lib/definitions";
import { convertCurrency } from "@/lib/utils";

export default async function BalanceCard({
  defaultCurrency,
  rates,
  query,
}: {
  defaultCurrency: string;
  rates: Record<string, number>;
  query: Partial<TransactionQueryParams>;
}) {
  const transactions = await fetchTransactions(query);

  if (!Array.isArray(transactions)) {
    console.error("Error fetching transactions:", transactions);
    return;
  }

  const espense = transactions.reduce((acc: number, item: Transaction) => {
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

    return amount < 0 ? acc + convertCurrency(amount, currencyRate) : acc;
  }, 0);
  const income = transactions.reduce((acc: number, item: Transaction) => {
    const amount = parseFloat(item.amount);
    return amount > 0 ? acc + amount : acc;
  }, 0);

  return (
    <ClientCard income={income} expense={espense} currency={defaultCurrency} />
  );
}
