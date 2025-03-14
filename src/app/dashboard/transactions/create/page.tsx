import TransactionForm from "@/components/transacations/form";
import { fetchCategories, fetchCurrencies, fetchLedgers } from "@/lib/data";

export default async function Page() {
  const currencies = await fetchCurrencies();
  const categories = await fetchCategories();
  const ledgers = await fetchLedgers();

  return (
    <main>
      <TransactionForm
        currencies={currencies}
        categories={categories}
        ledgers={ledgers}
      />
    </main>
  );
}
