"use client";
import { TransactionType } from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";
import { List, Tag } from "antd";
import dayjs from "dayjs";
import { CategoryIcon } from "../common/CategoryIcon";
import { DollarTwoTone } from "@ant-design/icons";

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
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shadow-sm">
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
            title={item.category_name}
            description={item.description}
            key={`avatar-${index}`}
          />
          <List.Item key={`details-${index}`}>
            <Tag
              icon={<DollarTwoTone />}
              color={Number(item.amount) < 0 ? "red" : "green"}
            >
              {item.currency_name} {item.currency_symbol}{" "}
              {formatAmount(item.amount)}
            </Tag>
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
