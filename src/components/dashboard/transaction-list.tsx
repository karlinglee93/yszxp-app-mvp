import { Card } from "antd";

import {
  fetchLatestExpenseTransactions,
  fetchLatestIncomeTransactions,
  fetchTopExpenseTransactions,
  fetchTopIncomeTransactions,
} from "@/lib/data";
import {
  TransactionSortType,
  TransactionType,
  TransactionTypeType,
} from "@/lib/definitions";
import ClientList from "@/components/client/list";

export default async function TransactionList({
  title,
  timeRange,
  type,
  sort,
}: {
  title: string;
  timeRange: string;
  type: TransactionTypeType;
  sort: TransactionSortType;
}) {
  // TODO: fix top spendings with different currency
  let transactions: TransactionType[] = [];

  if (type === TransactionTypeType.EXPENSE) {
    if (sort === TransactionSortType.AMOUNT) {
      transactions = await fetchTopExpenseTransactions(timeRange);
    } else if (sort === TransactionSortType.DATE) {
      transactions = await fetchLatestExpenseTransactions(timeRange);
    } else {
      throw Error(`No such transaction type and sort: ${type}, ${sort}`);
    }
  } else if (type === TransactionTypeType.INCOME) {
    if (sort === TransactionSortType.AMOUNT) {
      transactions = await fetchTopIncomeTransactions(timeRange);
    } else if (sort === TransactionSortType.DATE) {
      transactions = await fetchLatestIncomeTransactions(timeRange);
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
