import { fetchRecurringTransactions } from "@/lib/data";
import ClientRecurringCard from "../client/recurring-card";

export default async function RecurringTransactionCard({
  title,
}: {
  title: string;
}) {
  const recurringTransactions = await fetchRecurringTransactions();

  return (
    <ClientRecurringCard title={title} datasource={recurringTransactions} />
  );
}
