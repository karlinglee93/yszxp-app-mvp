import { TransactionTableSkeleton } from "@/components/skeletons";
import TransactionAddButton from "@/components/transacations/add-button";
import TransactionSearch from "@/components/transacations/transaction-search";
import TransactionTable from "@/components/transacations/transaction-table";
import { Col, Flex, Row, Space } from "antd";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    date?: string;
    page?: string;
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  if (!searchParams?.date) {
    redirect(`/dashboard/transactions?date=${`${dayjs().format("YYYY-MM")}`}`);
  }

  const query = searchParams?.query || "";
  const timeRange = searchParams?.date || `${dayjs().format("YYYY-MM")}`;
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      <Row>
        <Col span={24}>
          <Flex>
            <Space>
              <TransactionSearch />
              <TransactionAddButton />
            </Space>
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Suspense fallback={<TransactionTableSkeleton />}>
            <TransactionTable
              query={query}
              timeRange={timeRange}
              page={currentPage}
              category={category}
            />
          </Suspense>
        </Col>
      </Row>
    </div>
  );
}
