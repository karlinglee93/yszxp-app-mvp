import { fetchRecurringTransactions } from "@/lib/data";
import ClientRecurringCard from "../client/recurring-card";
import dayjs from "dayjs";
import {
  processRecurringTransactions,
} from "@/lib/actions";
import {
  Categories,
  Currencies,
  Ledgers,
} from "@/lib/definitions";

export default async function RecurringTransactionCard({
  title,
  currencies,
  categories,
  ledgers,
}: {
  title: string;
  currencies: Currencies[];
  categories: Categories[];
  ledgers: Ledgers;
}) {
  const recurringTransactions = await fetchRecurringTransactions();
  const transactionsToBeUpdated = recurringTransactions.filter(
    (i) =>
      dayjs(i.next_transaction_date).format("YYYY-MM-DD") <=
      dayjs().format("YYYY-MM-DD")
  );

  if (transactionsToBeUpdated.length > 0) {
    await processRecurringTransactions(
      transactionsToBeUpdated,
      currencies,
      categories,
      ledgers
    );
  }

  return (
    <ClientRecurringCard title={title} datasource={recurringTransactions} />
  );
}
