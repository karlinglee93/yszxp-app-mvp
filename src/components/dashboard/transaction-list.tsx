"use client";
import { Transaction } from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";
import { Avatar, Card, List } from "antd";

export default function TransactionList({
  title,
  datasource,
  displayCount,
}: {
  title: string,
  datasource: Transaction[];
  displayCount: number;
}) {
  const displayData = datasource.slice(0, displayCount);

  return (
    <Card title={title}>
      <List
        itemLayout="horizontal"
        dataSource={displayData}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={item.category_name}
              description={item.description}
            />
            <List.Item>
              {formatAmount(parseFloat(item.amount))}
              &nbsp;&nbsp;
              {(item.created_at as Date).toISOString()}
            </List.Item>
          </List.Item>
        )}
      />
    </Card>
  );
}
