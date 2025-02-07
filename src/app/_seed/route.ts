import { db } from "@vercel/postgres";

import { transactions } from "@/lib/placeholder-data";

const client = await db.connect();

async function seedTransactions() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category VARCHAR(32) NOT NULL,
    timestamp DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    account VARCHAR(32),
    ledger VARCHAR(32) NOT NULL,
    currency VARCHAR(32) NOT NULL,
    description VARCHAR(255)
  )`;

  const insertedTransactions = await Promise.all(
    transactions.map(
      (transaction) => client.sql`
        INSERT INTO transactions (category, timestamp, amount, account, ledger, currency, description)
        VALUES (${transaction.category}, ${transaction.timestamp}, ${transaction.amount}, ${transaction.account}, ${transaction.ledger}, ${transaction.currency}, ${transaction.description})
        ON CONFLICT (id) DO NOTHING
      `
    )
  );

  return insertedTransactions;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedTransactions();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
