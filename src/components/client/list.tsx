"use client";
import { Transaction } from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";
import { Avatar, List } from "antd";

export default function ClientList({
  datasource,
}: {
  datasource: Partial<Transaction>[];
}) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={datasource}
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
            {formatAmount(
              parseFloat((item as Partial<Transaction>).amount as string)
            )}
            &nbsp;&nbsp;
            {(item.created_at as Date).toISOString()}
          </List.Item>
        </List.Item>
      )}
    />
  );
}
