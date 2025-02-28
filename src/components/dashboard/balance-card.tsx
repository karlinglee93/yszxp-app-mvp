import ClientCard from "@/components/client/card";
import { fetchTransactions } from "@/lib/data";
import { Transaction, TransactionQueryParams } from "@/lib/definitions";
import { formatDate, getMonthFirstDate, getMonthLastDate } from "@/lib/utils";

export default async function BalanceCard() {
  const tempCurrency = "€";
  const year = new Date().getFullYear();
  const monthIndex = new Date().getMonth();
  const startDate = getMonthFirstDate(year, monthIndex);
  const endDate = getMonthLastDate(year, monthIndex);
  const query: Partial<TransactionQueryParams> = {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    transactionType: "all",
  };
  const transactions = await fetchTransactions(query);

  if (!Array.isArray(transactions)) {
    console.error("Error fetching transactions:", transactions);
    return;
  }

  const espense = transactions.reduce((acc: number, item: Transaction) => {
    const amount = parseFloat(item.amount);
    return amount < 0 ? acc + amount : acc;
  }, 0);
  const income = transactions.reduce((acc: number, item: Transaction) => {
    const amount = parseFloat(item.amount);
    return amount > 0 ? acc + amount : acc;
  }, 0);

  return (
    <ClientCard income={income} expense={espense} currency={tempCurrency} />
  );
}
