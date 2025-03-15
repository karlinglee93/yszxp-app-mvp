"use server";
import {
  FormattedTransactionFormType,
  TransactionTypeType,
} from "./definitions";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const USER_ID = "d85e6d01-b4da-4656-97fc-0dd9a3e96272";
const LEDGER_ID = "e5a8ab9e-48f5-4a18-a6b5-4bf22f8bb601";
const TransactionFormSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  category_id: z.string().uuid(),
  created_at: z.string(),
  amount: z.coerce.number(),
  ledger_id: z.string().uuid(),
  currency_id: z.string().uuid(),
  description: z.string().optional(),
});
const UpdateTransactionFormSchema = z.object({
  category_id: z.string().uuid(),
  created_at: z.string(),
  amount: z.coerce.number(),
  currency_id: z.string().uuid(),
  description: z.string().optional(),
});

export async function createTransaction(
  formData: FormattedTransactionFormType
) {
  const {
    id,
    user_id,
    category_id,
    created_at,
    amount,
    ledger_id,
    currency_id,
    description,
  } = TransactionFormSchema.parse({
    id: uuidv4(),
    user_id: USER_ID,
    category_id: formData.category,
    created_at: formData.date,
    amount:
      formData.type === TransactionTypeType.EXPENSE
        ? Math.abs(formData.amount) * -1
        : Math.abs(formData.amount),
    ledger_id: LEDGER_ID,
    currency_id: formData.currency,
    description: formData.note,
  });
  // TODO: Storing values in cents
  await sql`
    INSERT INTO transactions (id, user_id, category_id, created_at, amount, ledger_id, currency_id, description)
    VALUES (${id}, ${user_id}, ${category_id}, ${created_at}, ${amount}, ${ledger_id}, ${currency_id}, ${description})
  `;

  revalidatePath("/dashboard/transactions");
  redirect("/dashboard/transactions");
}

export async function updateTransaction(
  formData: FormattedTransactionFormType,
  id: string
) {
  const { category_id, created_at, amount, currency_id, description } =
    UpdateTransactionFormSchema.parse({
      category_id: formData.category,
      created_at: formData.date,
      amount:
        formData.type === TransactionTypeType.EXPENSE
          ? Math.abs(formData.amount) * -1
          : Math.abs(formData.amount),
      currency_id: formData.currency,
      description: formData.note,
    });
  await sql`
    UPDATE transactions
    SET category_id = ${category_id}, amount = ${amount}, created_at = ${created_at}, currency_id=${currency_id}, description=${description}
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/transactions");
  redirect("/dashboard/transactions");
}

export async function deleteTransaction(id: string) {
  await sql`DELETE FROM transactions WHERE id = ${id}`;

  revalidatePath("/dashboard/transactions");
}
