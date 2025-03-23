"use client";
import { RecurringTransaction } from "@/lib/definitions";
import { DollarTwoTone, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Flex, message, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import { CategoryIcon } from "../common/CategoryIcon";

export default function ClientRecurringCard({
  title,
  datasource,
}: {
  title: string;
  datasource: RecurringTransaction[];
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const columns = [
    {
      title: "Date",
      dataIndex: "next_transaction_date",
      render: (value: string) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      render: (value: string) => (
        <Flex align="center">
          <Space>
            <CategoryIcon
              symbol={
                datasource.find((i) => i.category_name === value)
                  ?.category_symbol
              }
              className="w-4 h-4 text-blue-600"
            />
            <label>{value}</label>
          </Space>
        </Flex>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value: string, record: RecurringTransaction) => (
        <Tag
          icon={<DollarTwoTone />}
          color={Number(value) < 0 ? "red" : "green"}
        >
          {record.currency_name} {record.currency_symbol} {value}
        </Tag>
      ),
    },
    {
      title: "Note",
      dataIndex: "description",
    },
  ];

  return (
    <div>
      {contextHolder}
      <Card
        title={title}
        extra={
          <Button
            icon={<SettingOutlined />}
            onClick={() =>
              messageApi.warning(
                "The Configuration of Recurring Transactions is under development."
              )
            }
          />
        }
      >
        <Table
          pagination={false}
          size="small"
          columns={columns}
          dataSource={datasource}
        />
      </Card>
    </div>
  );
}
