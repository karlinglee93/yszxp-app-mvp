import { db } from "@vercel/postgres";

import { Transaction } from "./definitions";

async function fetchTransactions() {
  try {
    const transactions = await db.sql<Transaction>`SELECT * FROM transactions`;

    return transactions.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export { fetchTransactions };
