"use client";
import { TransactionType } from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";
import { Avatar, List } from "antd";
import dayjs from "dayjs";

export default function ClientList({
  datasource,
}: {
  datasource: TransactionType[];
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
                src={`https://api.dicebear.com/7.x/icons/svg?seed=${index}`}
              />
            }
            title={item.category_name}
            description={item.description}
            key={`avatar-${index}`}
          />
          <List.Item key={`details-${index}`}>
            {item.currency_name}
            &nbsp;&nbsp;
            {formatAmount(parseFloat(item.amount as string))}
          </List.Item>
          <List.Item key={`date-${index}`}>
            &nbsp;&nbsp;
            {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
          </List.Item>
        </List.Item>
      )}
    />
  );
}
