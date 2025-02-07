import { db } from "@vercel/postgres";

const client = await db.connect();

async function listTransactions() {
  const transactions = await client.sql`
    SELECT * FROM transactions
  `;
  return transactions.rows;
}

export async function GET() {
  try {
    return Response.json(await listTransactions());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
