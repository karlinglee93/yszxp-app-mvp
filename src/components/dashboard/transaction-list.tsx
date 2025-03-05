import { Card } from "antd";

import { fetchTransactions } from "@/lib/data";
import { Transaction, TransactionQueryParams } from "@/lib/definitions";
import ClientList from "@/components/client/list";

export default async function TransactionList({
  query,
  title,
}: {
  query: Partial<TransactionQueryParams>;
  title: string;
}) {
  const transactions: Partial<Transaction>[] = await fetchTransactions(query);

  return (
    <Card title={title}>
      <ClientList datasource={transactions} />
    </Card>
  );
}
