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

async function fetchMonthlyTransactions() {
  try {
    const transactions = await db.sql<Transaction>`
      SELECT created_at, user_name, ledger_name, category_name, amount, currency_name, description
      FROM transactions t
      join users u on t.user_id = u.user_id
      join currencies cur on t.currency_id = cur.currency_id
      join categories cat on t.category_id = cat.category_id
      join ledgers l on t.ledger_id = l.ledger_id
      WHERE created_at >= date_trunc('month', CURRENT_DATE) AND (created_at <= date_trunc('month', CURRENT_DATE) + INTERVAL '1 month')
      ORDER BY t.created_at DESC;
    `;

    return transactions.rows.sort();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export { fetchTransactions, fetchMonthlyTransactions };
