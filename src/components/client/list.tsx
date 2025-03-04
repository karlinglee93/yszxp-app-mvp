"use client";
import { Transaction } from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";
import { Avatar, List } from "antd";

export default function ClientList({
  datasource,
}: {
  datasource: Partial<Transaction>[];
}) {
  // TODO: fix bug - <li> cannot be a descendant of <li>
  return (
    <List
      itemLayout="horizontal"
      dataSource={datasource}
      renderItem={(item, index) => (
        <List.Item key={`avatar-wrap-${index}`}>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={item.category_name}
            description={item.description}
            key={`avatar-${index}`}
          />
          <List.Item key={`details-${index}`}>
            {item.currency_name}
            &nbsp;&nbsp;
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
