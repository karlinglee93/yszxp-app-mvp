import { db } from "@vercel/postgres";

import {
  users,
  ledgers,
  currencies,
  categories,
  transactions,
} from "@/lib/placeholder-data";

const client = await db.connect();

// TODO: auto seed per day for demo purpose
async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TABLE IF NOT EXISTS users (
    user_id uuid UNIQUE PRIMARY KEY NOT NULL,
    user_name varchar(255) UNIQUE NOT NULL,
    user_pwd varchar(255) NOT NULL
  )`;

  const insertedUsers = await Promise.all(
    users.map(
      (user) => client.sql`
      INSERT INTO users (user_id, user_name, user_pwd)
      VALUES (${user.user_id}, ${user.user_name}, ${user.user_pwd})
      ON CONFLICT (user_id) DO NOTHING
    `
    )
  );

  return insertedUsers;
}

async function seedLedgers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TABLE IF NOT EXISTS "ledgers" (
    "ledger_id" uuid UNIQUE PRIMARY KEY NOT NULL,
    "ledger_name" varchar(255) NOT NULL,
    "currency_id" uuid NOT NULL,
    "is_shared" bool NOT NULL DEFAULT false
  )`;

  const insertedLedgers = await Promise.all(
    ledgers.map(
      (ledger) => client.sql`
      INSERT INTO ledgers (ledger_id, ledger_name, currency_id, is_shared)
      VALUES (${ledger.ledger_id}, ${ledger.ledger_name}, ${ledger.currency_id}, ${ledger.is_shared})
      ON CONFLICT (ledger_id) DO NOTHING
    `
    )
  );

  return insertedLedgers;
}

async function seedCurrencies() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TABLE IF NOT EXISTS "currencies" (
    "currency_id" uuid UNIQUE PRIMARY KEY NOT NULL,
    "currency_name" varchar(255) NOT NULL
  )`;

  const insertedCurrencies = await Promise.all(
    currencies.map(
      (currency) => client.sql`
      INSERT INTO currencies (currency_id, currency_name)
      VALUES (${currency.currency_id}, ${currency.currency_name})
      ON CONFLICT (currency_id) DO NOTHING
    `
    )
  );

  return insertedCurrencies;
}

async function seedCategories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TYPE "category_type" AS ENUM ('expense', 'income')`;
  await client.sql`CREATE TABLE IF NOT EXISTS "categories" (
    "category_id" uuid UNIQUE PRIMARY KEY NOT NULL,
    "category_name" varchar(255) NOT NULL,
    "type" category_type NOT NULL,
    "is_shared" bool NOT NULL DEFAULT false
  )`;

  const insertedCategories = await Promise.all(
    categories.map(
      (category) => client.sql`
      INSERT INTO categories (category_id, category_name, type, is_shared)
      VALUES (${category.category_id}, ${category.category_name}, ${category.type}, ${category.is_shared})
      ON CONFLICT (category_id) DO NOTHING
    `
    )
  );

  return insertedCategories;
}

async function seedTransactions() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TABLE IF NOT EXISTS "transactions" (
    "id" uuid UNIQUE PRIMARY KEY NOT NULL,
    "user_id" uuid NOT NULL,
    "category_id" uuid NOT NULL,
    "created_at" timestamp DEFAULT (now()),
    "amount" decimal(10,2) NOT NULL,
    "ledger_id" uuid NOT NULL,
    "currency_id" uuid NOT NULL,
    "description" varchar(255)
  )`;

  const insertedTransactions = await Promise.all(
    transactions.map(
      (transaction) => client.sql`
        INSERT INTO transactions (id, user_id, category_id, created_at, amount, ledger_id, currency_id, description)
        VALUES (${transaction.id}, ${transaction.user_id}, ${transaction.category_id}, ${transaction.created_at}, ${transaction.amount}, ${transaction.ledger_id}, ${transaction.currency_id}, ${transaction.description})
        ON CONFLICT (id) DO NOTHING
      `
    )
  );

  return insertedTransactions;
}

async function seedRelationships() {
  await client.sql`ALTER TABLE "transactions" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("category_id")`;
  await client.sql`ALTER TABLE "transactions" ADD FOREIGN KEY ("ledger_id") REFERENCES "ledgers" ("ledger_id")`;
  await client.sql`ALTER TABLE "transactions" ADD FOREIGN KEY ("currency_id") REFERENCES "currencies" ("currency_id")`;
  await client.sql`ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")`;
  await client.sql`ALTER TABLE "ledgers" ADD FOREIGN KEY ("currency_id") REFERENCES "currencies" ("currency_id")`;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedLedgers();
    await seedCurrencies();
    await seedCategories();
    await seedTransactions();
    await seedRelationships();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
