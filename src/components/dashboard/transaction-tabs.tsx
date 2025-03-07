"use client";
import { Tabs, TabsProps } from "antd";
import { ReactNode } from "react";

export function TransactionTabs({
  expenseChildren,
  incomeChildren,
}: {
  expenseChildren: ReactNode;
  incomeChildren: ReactNode;
}) {
  const items: TabsProps["items"] = [
    {
      key: "expense",
      label: "Expense",
      children: expenseChildren,
    },
    {
      key: "income",
      label: "Income",
      children: incomeChildren,
    },
  ];

  return <Tabs centered items={items} />;
}
