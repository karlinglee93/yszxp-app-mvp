import { fetchTransactions } from "@/lib/data";

import TransactionTable from "@/components/dashboard/transaction-table";

export default async function Page() {
  const transactions = await fetchTransactions();

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <TransactionTable transactions={transactions}/>
      </div>
    </main>
  );
}
