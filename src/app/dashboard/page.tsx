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
import { getDates } from "@/lib/utils";
import TransactionList from "@/components/dashboard/transaction-list";
import { TransactionSortType, TransactionTypeType } from "@/lib/definitions";
import CategoryCharts from "@/components/dashboard/category-charts";

// TODO: !!! add calender filter to show different data: this month, this year, latest year, util now, custom
// TODO: !!! enhance fetch API
// TODO: add category color and avatar configs
// TODO: handle 0 values, unit test
// TODO: add logs for each function
// TODO: add error status/page for each component
// TODO: set defauly currency for the ledger
export default async function Page(props: {
  searchParams?: Promise<{
    start?: string;
    end?: string;
    page?: string;
  }>;
}) {
  const params = await props.searchParams;
  const start = params?.start || getDates("this_month").start;
  const end = params?.end || getDates("this_month").end;
  console.info(`Dashboard date range from ${start} to ${end}`);

  const ledgerCurrency = "EUR";
  const currencyRates = await fetchCurrencyRates(ledgerCurrency);
  console.info(`Succeed to fetch currency rate on ${currencyRates.date}`);

  return (
    <main>
      <Row>
        <Col span={12}>
          <Suspense fallback={<CardSkeleton />}>
            <BalanceCard
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates}
              timeRange={{ start, end }}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Suspense fallback={<LineChartSkeleton />}>
            <TransactionLineChart
              title="Spending"
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates}
              timeRange={{ start, end }}
              type={TransactionTypeType.EXPENSE}
            />
          </Suspense>
        </Col>
        <Col span={12}>
          <Suspense fallback={<LineChartSkeleton />}>
            <TransactionLineChart
              title="Earning"
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates}
              timeRange={{ start, end }}
              type={TransactionTypeType.INCOME}
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
              timeRange={{ start, end }}
              type={TransactionTypeType.EXPENSE}
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
              timeRange={{ start, end }}
              type={TransactionTypeType.INCOME}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList
              title="Latest Spendings"
              timeRange={{ start, end }}
              type={TransactionTypeType.EXPENSE}
              sort={TransactionSortType.DATE}
            />
          </Suspense>
        </Col>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList
              title="Top Spendings"
              timeRange={{ start, end }}
              type={TransactionTypeType.EXPENSE}
              sort={TransactionSortType.AMOUNT}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList
              title="Latest Earnings"
              timeRange={{ start, end }}
              type={TransactionTypeType.INCOME}
              sort={TransactionSortType.DATE}
            />
          </Suspense>
        </Col>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList
              title="Top Earnings"
              timeRange={{ start, end }}
              type={TransactionTypeType.INCOME}
              sort={TransactionSortType.AMOUNT}
            />
          </Suspense>
        </Col>
      </Row>
    </main>
  );
}
