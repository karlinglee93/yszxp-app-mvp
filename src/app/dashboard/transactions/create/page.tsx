// import { useState } from "react"
import { Tabs } from "antd";

import TransactionPanel from "@/components/transacations/transaction-panel";

const items = [
  {
    key: "expense-pannel",
    label: "Expense",
    children: <TransactionPanel type="expense-pannel" />,
  },
  {
    key: "income-pannel",
    label: "Income",
    children: <TransactionPanel type="income-pannel" />,
  },
];

export default function Page() {
  return (
    <div>
      <Tabs defaultActiveKey="expense-pannel" centered items={items} />
    </div>
  );
}
