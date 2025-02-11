import { Table } from "antd";
import type { TableProps } from "antd";

import { fetchTransactions } from "@/lib/data";
import { Transaction } from "@/lib/definitions";

const columns: TableProps<Transaction>["columns"] = [
  { dataIndex: "category", title: "Category", key: "category" },
  { dataIndex: "timestamp", title: "Date", key: "timestamp" },
  { dataIndex: "amount", title: "Amount", key: "amount" },
  { dataIndex: "ledger", title: "Ledger", key: "ledger" },
  { dataIndex: "currency", title: "Currency", key: "currency" },
  { dataIndex: "description", title: "Description", key: "description" },
];

export default async function TransactionTable() {
  const transactions = await fetchTransactions();

  return <Table columns={columns} dataSource={transactions} />;
}
