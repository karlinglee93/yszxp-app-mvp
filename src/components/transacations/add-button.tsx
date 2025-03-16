import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function TransactionAddButton() {
  return (
    <Button
      type="primary"
      href="/dashboard/transactions/create"
      icon={<PlusOutlined />}
    >
      Create Transaction
    </Button>
  );
}
