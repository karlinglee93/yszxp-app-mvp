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
import { TransactionQueryParams } from "@/lib/definitions";
import { formatDate, getMonthFirstDate, getMonthLastDate } from "@/lib/utils";
import TransactionList from "@/components/dashboard/transaction-list";
import CategoryChart from "@/components/dashboard/category-chart";

// TODO: !!! add calender filter to show different data: this month, this year, latest year, util now, custom
// TODO: add category expense list
// TODO: add category color and avatar configs
// TODO: handle 0 values, unit test
// TODO: add logs for each function
// TODO: add error status/page for each component
// TODO: set defauly currency for the ledger
// TODO: replace today
const today = new Date("2025-02-20");
const year = today.getFullYear();
const monthIndex = today.getMonth();
const startDate = getMonthFirstDate(year, monthIndex);
const endDate = getMonthLastDate(year, monthIndex);
const ledgerCurrency = "EUR";

const balanceCardQuery: Partial<TransactionQueryParams> = {
  startDate: formatDate(startDate),
  endDate: formatDate(endDate),
  transactionType: "all",
};

const spendingTrendQuery: Partial<TransactionQueryParams> = {
  startDate: formatDate(startDate),
  endDate: formatDate(endDate),
  transactionType: "expense",
  groupBy: "day",
};

const earningTrendQuery: Partial<TransactionQueryParams> = {
  startDate: formatDate(startDate),
  endDate: formatDate(endDate),
  transactionType: "income",
  groupBy: "day",
};

const categorySpendingQuery: Partial<TransactionQueryParams> = {
  startDate: formatDate(startDate),
  endDate: formatDate(endDate),
  transactionType: "expense",
  groupBy: "category",
  sortBy: "amount",
};
const recentSpendingQuery: Partial<TransactionQueryParams> = {
  startDate: formatDate(startDate),
  endDate: formatDate(endDate),
  transactionType: "expense",
  sortBy: "date",
  orderBy: "DESC",
  limit: 5,
};
const topSpendingQuery: Partial<TransactionQueryParams> = {
  startDate: formatDate(startDate),
  endDate: formatDate(endDate),
  transactionType: "expense",
  sortBy: "amount",
  orderBy: "ASC",
  limit: 5,
};

export default async function Page() {
  const currencyRates = await fetchCurrencyRates(ledgerCurrency);
  console.info(
    `Succeed to fetch currency rate on ${currencyRates.date}: ${JSON.stringify(
      currencyRates.rates
    )}`
  );

  return (
    <main>
      <Row>
        <Col span={12}>
          <Suspense fallback={<CardSkeleton />}>
            <BalanceCard
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates as Record<string, number>}
              query={balanceCardQuery}
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
              rates={currencyRates.rates as Record<string, number>}
              query={spendingTrendQuery}
            />
          </Suspense>
        </Col>
        <Col span={12}>
          <Suspense fallback={<LineChartSkeleton />}>
            <TransactionLineChart
              title="Earning"
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates as Record<string, number>}
              query={earningTrendQuery}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Suspense fallback={<PieChartSkeleton />}>
            <CategoryChart
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates as Record<string, number>}
              query={categorySpendingQuery}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList
              title="Recent Spendings"
              query={recentSpendingQuery}
            />
          </Suspense>
        </Col>
        <Col span={12}>
          <Suspense fallback={<ListSkeleton />}>
            <TransactionList title="Top Spendings" query={topSpendingQuery} />
          </Suspense>
        </Col>
      </Row>
    </main>
  );
}
