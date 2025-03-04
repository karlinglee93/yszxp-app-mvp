import { Card } from "antd";

import { fetchTransactions } from "@/lib/data";
import { Transaction, TransactionQueryParams } from "@/lib/definitions";
import { formatDate, getMonthFirstDate, getMonthLastDate } from "@/lib/utils";
import ClientList from "@/components/client/list";

export default async function TopSpendingList({
  today,
  defaultCurrency,
  rates,
}: {
  today: Date;
  defaultCurrency: string;
  rates: object;
}) {
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const startDate = getMonthFirstDate(year, monthIndex);
  const endDate = getMonthLastDate(year, monthIndex);
  const query: Partial<TransactionQueryParams> = {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    transactionType: "expense",
    sortBy: "amount",
    orderBy: "ASC",
    limit: 5,
  };
  const transactions: Partial<Transaction>[] = await fetchTransactions(query);

  return (
    <Card title="Top Spendings">
      <ClientList datasource={transactions} />
    </Card>
  );
}
