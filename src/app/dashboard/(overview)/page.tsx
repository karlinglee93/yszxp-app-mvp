import BalanceCard from "@/components/dashboard/balance-card";
import TransactionLineChart from "@/components/dashboard/transaction-line-chart";
import CategoryPieChart from "@/components/dashboard/category-pie-chart";
import { CardSkeleton, LineChartSkeleton } from "@/components/skeletons";
import { Col, Row } from "antd";
import { Suspense } from "react";
import RecentSpendingList from "@/components/dashboard/recent-spending-list";
import TopSpendingList from "@/components/dashboard/top-spending-list";
import { fetchCurrencyRates } from "@/lib/data";

// TODO: !!! add calender filter to show different data: this month, this year, latest year, util now
// TODO: add category expense list
// TODO: add category color and avatar configs
// TODO: handle 0 values, unit test
// TODO: add logs for each function
// TODO: add error status/page for each component
// TODO: set defauly currency for the ledger
export default async function Page() {
  // TODO: replace today
  const today = new Date("2025-02-20");
  const ledgerCurrency = "EUR";
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
              today={today}
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates as Record<string, number>}
            />
          </Suspense>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Suspense fallback={<LineChartSkeleton />}>
            <TransactionLineChart
              today={today}
              defaultCurrency={ledgerCurrency}
              rates={currencyRates.rates as Record<string, number>}
            />
          </Suspense>
        </Col>
        <Col span={12}>
          <CategoryPieChart
            today={today}
            defaultCurrency={ledgerCurrency}
            rates={currencyRates.rates as Record<string, number>}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <RecentSpendingList
            today={today}
            defaultCurrency={ledgerCurrency}
            rates={currencyRates.rates as Record<string, number>}
          />
        </Col>
        <Col span={12}>
          <TopSpendingList
            today={today}
            defaultCurrency={ledgerCurrency}
            rates={currencyRates.rates as Record<string, number>}
          />
        </Col>
      </Row>
    </main>
  );
}
