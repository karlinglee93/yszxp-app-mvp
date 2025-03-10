import BalanceCard from "@/components/dashboard/balance-card";
import TransactionLineChart from "@/components/dashboard/transaction-line-chart";
import {
  CardSkeleton,
  LineChartSkeleton,
  ListSkeleton,
  PieChartSkeleton,
} from "@/components/skeletons";
import { Col, Row } from "antd";
import { Suspense } from "react";
import { fetchCurrencyRates } from "@/lib/data";
import TransactionList from "@/components/dashboard/transaction-list";
import { TransactionSortType, TransactionTypeType } from "@/lib/definitions";
import CategoryCharts from "@/components/dashboard/category-charts";
import { TransactionTabs } from "@/components/dashboard/transaction-tabs";
import dayjs from "dayjs";

// TODO: !!! add calender filter to show different data: this month, this year, util now, latest year, custom
// TODO: to hide/combine the pie proportions smaller than X%
// TODO: add category color and avatar configs
// TODO: handle 0 values, unit test
// TODO: add logs for each function
// TODO: add error status/404 page for each component
// TODO: fetch defauly currency for the ledger
export default async function Page(props: {
  searchParams?: Promise<{
    date?: string;
    page?: string;
  }>;
}) {
  const params = await props.searchParams;
  const timeRange = params?.date || `${dayjs().format("YYYY-MM")}`;
  // const start = params?.start || getDates("this_month").start;
  // const end = params?.end || getDates("this_month").end;
  console.info(`Dashboard data on: ${timeRange}`);

  const ledgerCurrency = "EUR";
  const currencyRates = await fetchCurrencyRates(ledgerCurrency);
  console.info(`Succeed to fetch currency rate on ${currencyRates.date}`);

  const expenseChildren = (
    <div>
      <Row>
        <Col span={12}>
          <Suspense fallback={<LineChartSkeleton />}>
            <TransactionLineChart
              title="Spending"
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates}
              timeRange={timeRange}
              type={TransactionTypeType.EXPENSE}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Suspense fallback={<PieChartSkeleton />}>
            <CategoryCharts
              title="Spending Category Overview"
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates}
              timeRange={timeRange}
              type={TransactionTypeType.EXPENSE}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList
              title="Latest Spendings"
              timeRange={timeRange}
              type={TransactionTypeType.EXPENSE}
              sort={TransactionSortType.DATE}
            />
          </Suspense>
        </Col>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList
              title="Top Spendings"
              timeRange={timeRange}
              type={TransactionTypeType.EXPENSE}
              sort={TransactionSortType.AMOUNT}
            />
          </Suspense>
        </Col>
      </Row>
    </div>
  );
  const incomeChildren = (
    <div>
      <Row>
        <Col span={12}>
          <Suspense fallback={<LineChartSkeleton />}>
            <TransactionLineChart
              title="Earning"
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates}
              timeRange={timeRange}
              type={TransactionTypeType.INCOME}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Suspense fallback={<PieChartSkeleton />}>
            <CategoryCharts
              title="Earning Category Overview"
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates}
              timeRange={timeRange}
              type={TransactionTypeType.INCOME}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList
              title="Latest Earnings"
              timeRange={timeRange}
              type={TransactionTypeType.INCOME}
              sort={TransactionSortType.DATE}
            />
          </Suspense>
        </Col>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList
              title="Top Earnings"
              timeRange={timeRange}
              type={TransactionTypeType.INCOME}
              sort={TransactionSortType.AMOUNT}
            />
          </Suspense>
        </Col>
      </Row>
    </div>
  );

  return (
    <main>
      <Row>
        <Col span={12}>
          <Suspense fallback={<CardSkeleton />}>
            <BalanceCard
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates}
              timeRange={timeRange}
            />
          </Suspense>
        </Col>
      </Row>
      <TransactionTabs
        expenseChildren={expenseChildren}
        incomeChildren={incomeChildren}
      />
    </main>
  );
}
