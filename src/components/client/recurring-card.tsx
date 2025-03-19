"use client";
import { RecurringTransaction } from "@/lib/definitions";
import { DollarTwoTone, SettingOutlined } from "@ant-design/icons";
import { Button, Card, message, Table, Tag } from "antd";
import dayjs from "dayjs";

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
      render: (value: string) => <Tag color="gold">{value}</Tag>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value: string, record: RecurringTransaction) => (
        <Tag
          icon={<DollarTwoTone />}
          color={Number(value) < 0 ? "red" : "green"}
        >
          {record.currency_name} {value}
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
              messageApi.info(
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
