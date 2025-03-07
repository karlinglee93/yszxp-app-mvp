import TransactionSearch from "@/components/transacations/transaction-search";
import TransactionTable from "@/components/transacations/transaction-table";
import { Col, Row } from "antd";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
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
          <TransactionTable query={query} page={currentPage} />
        </Col>
      </Row>
    </div>
  );
}
