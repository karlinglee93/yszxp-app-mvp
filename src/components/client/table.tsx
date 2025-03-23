"use client";
import { deleteTransaction } from "@/lib/actions";
import { Transaction } from "@/lib/definitions";
import {
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Flex,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryIcon } from "../common/CategoryIcon";

const columns: TableProps["columns"] = [
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (item) => new Date(item).toISOString().split("T")[0],
  },
  {
    title: "Currency",
    dataIndex: "currency_name",
    key: "currency_name",
    render: (currency_name, record) => (
      <Flex>
        <Space>
          <DollarOutlined style={{ color: "green" }} />
          <label>{currency_name}</label>
          <label>{record.currency_symbol}</label>
        </Space>
      </Flex>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount) => (
      <div style={{ textAlign: "left" }}>
        <Tag color={amount < 0 ? "red" : "green"}>
          {amount < 0 ? "-" : "+"} {Math.abs(amount)}
        </Tag>
      </div>
    ),
  },
  {
    title: "Category",
    dataIndex: "category_name",
    key: "category_name",
    render: (category, record) => (
      <Flex align="center">
        <Space>
          <CategoryIcon
            symbol={record.category_symbol}
            className="w-4 h-4 text-blue-600"
          />
          <label>{category}</label>
        </Space>
      </Flex>
    ),
  },
  {
    title: "Note",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Tooltip title="Edit">
          <Button
            type="link"
            href={`/dashboard/transactions/${record.id}/edit`}
            icon={<EditOutlined />}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Popconfirm
            title="Delete the transaction"
            description="Are you sure to delete this transaction?"
            onConfirm={() => deleteTransaction(record.id)}
            okText="Yes"
            cancelText="Cancel"
          >
            <Button danger type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Tooltip>
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
      <div className="pagination-wrapper">
        <Pagination
          current={currentPage}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          showSizeChanger={false}
          total={totalCount}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}
