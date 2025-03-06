import TransactionSearch from "@/components/transacations/transaction-search";
import TransactionTable from "@/components/transacations/transaction-table";
import { Col, Row } from "antd";

// const today = new Date("2025-02-20");
// const year = today.getFullYear();
// const monthIndex = today.getMonth();
// const startDate = getMonthFirstDate(year, monthIndex);
// const endDate = getMonthLastDate(year, monthIndex);
// const ledgerCurrency = "EUR";

export default function Page() {
  return (
    <div>
      <Row>
        <Col span={24}>
          <TransactionSearch />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionTable />
        </Col>
      </Row>
    </div>
  );
}
