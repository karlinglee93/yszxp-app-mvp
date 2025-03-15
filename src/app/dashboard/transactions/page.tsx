import TransactionAddButton from "@/components/transacations/add-button";
import TransactionSearch from "@/components/transacations/transaction-search";
import TransactionTable from "@/components/transacations/transaction-table";
import { Col, Flex, Row } from "antd";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    date?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  if (!searchParams?.date) {
    redirect(`/dashboard/transactions?date=${`${dayjs().format("YYYY-MM")}`}`);
  }

  const query = searchParams?.query || "";
  const timeRange = searchParams?.date || `${dayjs().format("YYYY-MM")}`;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      <Row>
        <Col span={24}>
          <Flex>
            <TransactionSearch />
            <TransactionAddButton />
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionTable
            query={query}
            timeRange={timeRange}
            page={currentPage}
          />
        </Col>
      </Row>
    </div>
  );
}
