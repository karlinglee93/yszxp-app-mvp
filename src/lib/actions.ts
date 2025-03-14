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

export async function createTransaction(
  formData: FormattedTransactionFormType
) {
  // INSERT INTO transactions (id, user_id, category_id, created_at, amount, ledger_id, currency_id, description)
  // VALUES (uuid_generate_v4(), 'd85e6d01-b4da-4656-97fc-0dd9a3e96272', 'e80a9458-d27c-46a5-b454-9087543c381c', '2025-03-14', -88, 'e5a8ab9e-48f5-4a18-a6b5-4bf22f8bb601', 'b4ad8c8a-3f11-4da1-8ad2-af5debaf1b05', 'test')
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

  revalidatePath('/dashboard/transactions')
  redirect('/dashboard/invoices');
}
