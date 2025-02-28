import BalanceCard from "@/components/dashboard/balance-card";
import TransactionLineChart from "@/components/dashboard/transaction-line-chart";
import CategoryPieChart from "@/components/dashboard/category-pie-chart";
import { CardSkeleton, LineChartSkeleton } from "@/components/skeletons";
import { Col, Row } from "antd";
import { Suspense } from "react";
import RecentSpendingList from "@/components/dashboard/recent-spending-list";
import TopSpendingList from "@/components/dashboard/top-spending-list";

// TODO: !!! re-structure sever & client components
// TODO: !!! re-structure API calls
// TODO: !!! handle currency difference
// TODO: re-seeding db with orignal categories
// TODO: add category expense list
// TODO: add category color and avatar configs
// TODO: handle 0 values, unit test
// TODO: add logs for each function
// TODO: define startDate and lastDate here
// TODO: add error status for each component
export default function Page() {
  return (
    <main>
      <Row>
        <Col span={12}>
          <Suspense fallback={<CardSkeleton />}>
            <BalanceCard />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Suspense fallback={<LineChartSkeleton />}>
            <TransactionLineChart />
          </Suspense>
        </Col>
        <Col span={12}>
          <CategoryPieChart />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <RecentSpendingList />
        </Col>
        <Col span={12}>
          <TopSpendingList />
        </Col>
      </Row>
    </main>
  );
}
