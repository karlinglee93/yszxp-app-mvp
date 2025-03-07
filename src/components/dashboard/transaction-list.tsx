import { Card } from "antd";

import {
  fetchLatestExpenseTransactions,
  fetchLatestIncomeTransactions,
  fetchTopExpenseTransactions,
  fetchTopIncomeTransactions,
} from "@/lib/data";
import { TransactionSortType, TransactionType, TransactionTypeType } from "@/lib/definitions";
import ClientList from "@/components/client/list";
import { formatDate } from "@/lib/utils";

export default async function TransactionList({
  title,
  timeRange,
  type,
  sort,
}: {
  title: string;
  timeRange: { start: string; end: string };
  type: TransactionTypeType;
  sort: TransactionSortType;
}) {
  let transactions: TransactionType[] = [];
  const start = formatDate(timeRange.start);
  const end = formatDate(timeRange.end);

  if (type === TransactionTypeType.EXPENSE) {
    if (sort === TransactionSortType.AMOUNT) {
      transactions = await fetchTopExpenseTransactions(start, end);
    } else if (sort === TransactionSortType.DATE) {
      transactions = await fetchLatestExpenseTransactions(start, end);
    } else {
      throw Error(`No such transaction type and sort: ${type}, ${sort}`);
    }
  } else if (type === TransactionTypeType.INCOME) {
    if (sort === TransactionSortType.AMOUNT) {
      transactions = await fetchTopIncomeTransactions(start, end);
    } else if (sort === TransactionSortType.DATE) {
      transactions = await fetchLatestIncomeTransactions(start, end);
    } else {
      throw Error(`No such transaction type and sort: ${type}, ${sort}`);
    }
  }

  return (
    <Card title={title}>
      <ClientList datasource={transactions} />
    </Card>
  );
}
