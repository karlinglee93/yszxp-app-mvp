import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function TransactionAddButton() {
  return (
    <Button href="/dashboard/transactions/create" icon={<PlusOutlined />}>Create Transaction</Button>
  );
}
