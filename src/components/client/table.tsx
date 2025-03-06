"use client";
import { Transaction } from "@/lib/definitions";
import { DollarTwoTone } from "@ant-design/icons";
import { Table, TableProps, Tag } from "antd";

const columns: TableProps["columns"] = [
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (item) => new Date(item).toISOString().split("T")[0],
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount) =>
      (amount as number) < 0 ? (
        <Tag color="red">{amount}</Tag>
      ) : (
        <Tag color="green">{amount}</Tag>
      ),
  },
  {
    title: "Currency",
    dataIndex: "currency_name",
    key: "currency_name",
    render: (currency_name) => (
      <Tag icon={<DollarTwoTone />} color="green">
        {currency_name}
      </Tag>
    ),
  },
  {
    title: "Category",
    dataIndex: "category_name",
    key: "category_name",
    render: (category) => <Tag color="gold">{category}</Tag>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

export default function ClientTable({
  datasource,
}: {
  datasource: Partial<Transaction>[];
}) {
  console.log(datasource);
  return <Table columns={columns} dataSource={datasource} />;
}
