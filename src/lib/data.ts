import { sql } from "@vercel/postgres";

import {
  Categories,
  Currencies,
  CurrencyRates,
  FormattedTransactionFormType,
  Ledgers,
  TotalAmountByCategoryType,
  TotalAmountByDateType,
  TransactionType,
} from "@/lib/definitions";

async function fetchCurrencies() {
  try {
    const currencies = await sql<Currencies>`
      select * from currencies
    `;

    return currencies.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch currencies.");
  }
}

async function fetchCategories() {
  try {
    const categories = await sql<Categories>`
      select * from categories
    `;

    return categories.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categories.");
  }
}

async function fetchLedgers() {
  try {
    const ledgers = await sql<Ledgers>`
      select * from ledgers
    `;

    return ledgers.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categories.");
  }
}

async function fetchCurrencyRates(
  currencyName: string
): Promise<CurrencyRates> {
  console.info("Fetching currency rates from API");
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currencyName}`
    );

    if (!response.ok) throw new Error("Failed to fetch currency rates");

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch currency rates");
  }
}

// TODO: add where user_id
// Fetch each transaction data, including income and expense
async function fetchTransactions(timeRange: string) {
  try {
    const transactions = await sql<TransactionType>`
      SELECT 
      t.created_at, cat.category_name, t.amount, cur.currency_name, t.description
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
      ORDER BY t.created_at ASC`;

    return transactions.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transaction data.");
  }
}

async function fetchLatestExpenseTransactions(timeRange: string) {
  try {
    const transactions = await sql<TransactionType>`
      SELECT 
      t.created_at, cat.category_name, t.amount, cur.currency_name, t.description
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
        AND t.amount < 0
      ORDER BY t.created_at DESC
      LIMIT 5`;

    return transactions.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transaction data.");
  }
}

async function fetchTopExpenseTransactions(timeRange: string) {
  try {
    const transactions = await sql<TransactionType>`
      SELECT 
      t.created_at, cat.category_name, t.amount, cur.currency_name, t.description
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
        AND t.amount < 0
      ORDER BY t.amount ASC
      LIMIT 5`;

    return transactions.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transaction data.");
  }
}

async function fetchLatestIncomeTransactions(timeRange: string) {
  try {
    const transactions = await sql<TransactionType>`
      SELECT 
      t.created_at, cat.category_name, t.amount, cur.currency_name, t.description
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
        AND t.amount > 0
      ORDER BY t.created_at DESC
      LIMIT 5`;

    return transactions.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transaction data.");
  }
}

async function fetchTopIncomeTransactions(timeRange: string) {
  try {
    const transactions = await sql<TransactionType>`
      SELECT 
      t.created_at, cat.category_name, t.amount, cur.currency_name, t.description
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
        AND t.amount > 0
      ORDER BY t.amount DESC
      LIMIT 5`;

    return transactions.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transaction data.");
  }
}

async function fetchExpenseTotalAmountByDate(timeRange: string) {
  try {
    const expenseAmountsByDate = await sql<TotalAmountByDateType>`
      SELECT 
        DATE(t.created_at) as date, cur.currency_name as currency, sum(t.amount) as total_amount
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
        AND t.amount < 0
      GROUP BY date, currency
      ORDER BY date ASC`;

    return expenseAmountsByDate.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expense transaction data by date.");
  }
}

async function fetchIncomeTotalAmountByDate(timeRange: string) {
  try {
    const expenseAmountsByDate = await sql<TotalAmountByDateType>`
      SELECT 
        DATE(t.created_at) as date, cur.currency_name as currency, sum(t.amount) as total_amount
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
        AND t.amount > 0
      GROUP BY date, currency
      ORDER BY date ASC`;

    return expenseAmountsByDate.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expense transaction data by date.");
  }
}

async function fetchTotalAmountByDate(timeRange: string) {
  try {
    const expenseAmountsByDate = await sql<TotalAmountByDateType>`
      SELECT 
        DATE(t.created_at) as date, cur.currency_name as currency, sum(t.amount) as total_amount
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
      GROUP BY date, currency
      ORDER BY date ASC`;

    return expenseAmountsByDate.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expense transaction data by date.");
  }
}

async function fetchExpenseTotalAmountByCategory(timeRange: string) {
  try {
    const expenseAmountsByCategory = await sql<TotalAmountByCategoryType>`
      SELECT 
        cat.category_name as category, cur.currency_name as currency, sum(t.amount) as total_amount
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
        AND t.amount < 0
      GROUP BY category, currency
      ORDER BY total_amount ASC`;

    return expenseAmountsByCategory.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expense transaction data by category.");
  }
}

async function fetchIncomeTotalAmountByCategory(timeRange: string) {
  try {
    const expenseAmountsByCategory = await sql<TotalAmountByCategoryType>`
      SELECT 
        cat.category_name as category, cur.currency_name as currency, sum(t.amount) as total_amount
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE t.created_at::TEXT LIKE ${`${timeRange}%`}
        AND t.amount > 0
      GROUP BY category, currency
      ORDER BY total_amount DESC`;

    return expenseAmountsByCategory.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expense transaction data by category.");
  }
}

const ITEMS_PER_PAGE = 10;
async function fetchFilteredTransactions(
  query: string,
  timeRange: string,
  currentPage: number
): Promise<TransactionType[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const filteredTransactions = await sql<TransactionType>`
      SELECT 
        t.id, t.created_at, cat.category_name, t.amount, cur.currency_name, t.description
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE 
        t.created_at::TEXT LIKE ${`${timeRange}%`} AND (
          t.created_at::TEXT ILIKE ${`%${query}%`} OR
          cat.category_name ILIKE ${`%${query}%`} OR
          t.amount::TEXT ILIKE ${`%${query}%`} OR
          cur.currency_name ILIKE ${`%${query}%`} OR
          t.description ILIKE ${`%${query}%`}
        )
      ORDER BY t.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

    return filteredTransactions.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered transaction data.");
  }
}

async function fetchTransactionsCount(query: string, timeRange: string) {
  try {
    const count = await sql`SELECT COUNT(*)
      FROM transactions t
      JOIN users u ON t.user_id = u.user_id
      JOIN currencies cur ON t.currency_id = cur.currency_id
      JOIN categories cat ON t.category_id = cat.category_id
      JOIN ledgers l ON t.ledger_id = l.ledger_id
      WHERE 
        t.created_at::TEXT LIKE ${`${timeRange}%`} AND (
          t.created_at::TEXT ILIKE ${`%${query}%`} OR
          cat.category_name ILIKE ${`%${query}%`} OR
          t.amount::TEXT ILIKE ${`%${query}%`} OR
          cur.currency_name ILIKE ${`%${query}%`} OR
          t.description ILIKE ${`%${query}%`}
        )`;

    return count.rows[0].count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of transactions.");
  }
}

const fetchTransactionById = async (id: string) => {
  try {
    const transaction = await sql<FormattedTransactionFormType>`
      SELECT 
      t.created_at as date, t.category_id as category, t.amount as amount, t.currency_id as currency, t.description as note
      FROM transactions t
      WHERE t.id = ${id}
      LIMIT 1`;

    return transaction.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transaction data.");
  }
};

export {
  fetchCurrencies,
  fetchCategories,
  fetchLedgers,
  fetchCurrencyRates,
  fetchTransactions,
  fetchLatestExpenseTransactions,
  fetchTopExpenseTransactions,
  fetchLatestIncomeTransactions,
  fetchTopIncomeTransactions,
  fetchExpenseTotalAmountByDate,
  fetchIncomeTotalAmountByDate,
  fetchTotalAmountByDate,
  fetchExpenseTotalAmountByCategory,
  fetchIncomeTotalAmountByCategory,
  fetchFilteredTransactions,
  fetchTransactionsCount,
  fetchTransactionById,
};
