import { Suspense } from "react";
import TransactionTable from "@/components/dashboard/transaction-table";

import { TransactionTableSkeleton } from "@/components/skeletons";

export default async function Page() {
  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <Suspense fallback={<TransactionTableSkeleton />}>
          <TransactionTable />
        </Suspense>
      </div>
    </main>
  );
}
