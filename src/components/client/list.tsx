"use client";
import { TransactionType } from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";
import { List, Tag } from "antd";
import dayjs from "dayjs";
import { CategoryIcon } from "../common/CategoryIcon";
import { DollarOutlined } from "@ant-design/icons";

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
        <List.Item key={index} className="transaction-item">
          <List.Item.Meta
            avatar={
              <div className="icon-avatar">
                <CategoryIcon
                  symbol={
                    datasource.find(
                      (i) => i.category_name === item.category_name
                    )?.category_symbol
                  }
                  className="w-4 h-4 text-blue-600"
                />
              </div>
            }
            title={
              <span className="transaction-title">{item.category_name}</span>
            }
            description={
              <div className="transaction-meta">
                <span>{item.description}</span>
                <span className="transaction-date">
                  {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
            }
          />
          <div className="transaction-amount">
            <Tag
              icon={<DollarOutlined />}
              color={Number(item.amount) < 0 ? "red" : "green"}
            >
              {item.currency_name} {item.currency_symbol}{" "}
              {formatAmount(item.amount)}
            </Tag>
          </div>
        </List.Item>
      )}
    />
  );
}
