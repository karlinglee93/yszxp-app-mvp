import TransactionSearch from "@/components/transacations/transaction-search";
import TransactionTable from "@/components/transacations/transaction-table";
import { Col, Row } from "antd";
import dayjs from "dayjs";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    date?: string
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const timeRange = searchParams?.date || `${dayjs().format("YYYY-MM")}`;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      <Row>
        <Col span={24}>
          <TransactionSearch />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionTable query={query} timeRange={timeRange} page={currentPage} />
        </Col>
      </Row>
    </div>
  );
}
