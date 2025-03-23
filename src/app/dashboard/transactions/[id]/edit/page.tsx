import { TransactionFormSkeleton } from "@/components/skeletons";
import EditForm from "@/components/transacations/edit-form";
import {
  fetchCategories,
  fetchCurrencies,
  fetchTransactionById,
} from "@/lib/data";
import { Suspense } from "react";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [transaction, currencies, categories] = await Promise.all([
    fetchTransactionById(id),
    fetchCurrencies(),
    fetchCategories(),
  ]);

  return (
    <main>
      <Suspense fallback={<TransactionFormSkeleton />}>
        <EditForm
          id={id}
          transaction={transaction}
          currencies={currencies}
          categories={categories}
        />
      </Suspense>
    </main>
  );
}
