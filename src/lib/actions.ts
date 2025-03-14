"use server";

import { FormattedTransactionFormType } from "./definitions";

export async function createTransaction(
  formData: FormattedTransactionFormType
) {
  console.log(`Success`);
  console.log(formData);
}
