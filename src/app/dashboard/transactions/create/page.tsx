import { TransactionFormSkeleton } from "@/components/skeletons";
import TransactionForm from "@/components/transacations/form";
import { fetchCategories, fetchCurrencies, fetchLedgers } from "@/lib/data";
import { Suspense } from "react";

export default async function Page() {
  const currencies = await fetchCurrencies();
  const categories = await fetchCategories();
  const ledgers = await fetchLedgers();

  return (
    <main className="transaction-form-page">
      <div className="card">
        <Suspense fallback={<TransactionFormSkeleton />}>
          <TransactionForm
            currencies={currencies}
            categories={categories}
            ledgers={ledgers}
          />
        </Suspense>
      </div>
    </main>
  );
}
