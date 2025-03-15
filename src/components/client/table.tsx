"use client";
import { deleteTransaction } from "@/lib/actions";
import { Transaction } from "@/lib/definitions";
import { DeleteOutlined, DollarTwoTone, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="link"
          href={`/dashboard/transactions/${record.id}/edit`}
          icon={<EditOutlined />}
        />
        <Popconfirm
          title="Delete the transaction"
          description="Are you sure to delete this transaction?"
          onConfirm={() => deleteTransaction(record.id)}
          okText="Yes"
          cancelText="Cancel"
        >
          <Button danger type="link" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    ),
  },
];

export default function ClientTable({
  datasource,
  totalCount,
}: {
  datasource: Partial<Transaction>[];
  totalCount: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const handlePaginationChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Table columns={columns} dataSource={datasource} pagination={false} />
      <Pagination
        align="center"
        current={currentPage}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        showSizeChanger={false}
        total={totalCount}
        onChange={handlePaginationChange}
      />
    </div>
  );
}
