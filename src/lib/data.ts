import { db } from "@vercel/postgres";

import { TransactionQueryParams } from "@/lib/definitions";

// TODO: fetch all data, fetch by sort, by order
// TODO: add where user_id
async function fetchTransactions(queryParams: Partial<TransactionQueryParams>) {
  try {
    const {
      startDate,
      endDate,
      transactionType = "all",
      sortBy = "date",
      orderBy = "ASC",
      groupBy,
      limit,
    } = queryParams;

    // TODO: add user filter
    const filters = [];
    const initialParams = [];
    if (startDate) {
      filters.push(`t.created_at >= $${filters.length + 1}`);
      initialParams.push(startDate);
    }
    if (endDate) {
      filters.push(`t.created_at <= $${filters.length + 1}`);
      initialParams.push(endDate);
    }
    if (transactionType) {
      if (transactionType === "expense") {
        filters.push(`t.amount < 0`);
        // initialParams.push(`<`);
      } else if (transactionType === "income") {
        filters.push(`t.amount > 0`);
        // initialParams.push(`>`);
      }
    }
    const filterQuery =
      filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    let query = "";
    const allowedGroupBy = ["day", "category"];
    const useGroupBy =
      groupBy && allowedGroupBy.includes(groupBy) ? true : undefined;

    const sortQuery =
      sortBy === "date"
        ? `ORDER BY DATE(t.created_at) ${orderBy}`
        : sortBy === "amount"
        ? useGroupBy
          ? `ORDER BY total_amount ${orderBy}`
          : `ORDER BY t.amount ${orderBy}`
        : "";

    const limitQuery = limit ? `LIMIT ${limit}` : "";

    if (useGroupBy) {
      let groupByName = "";
      // TODO: add LIMIT and OFFSET
      // TODO: !!!handle currency difference
      if (groupBy === "day") {
        groupByName = "t.created_at";
        query = `SELECT DATE(${groupByName}) as ${groupBy}, sum(t.amount) as total_amount
          FROM transactions t
          JOIN users u ON t.user_id = u.user_id
          JOIN currencies cur ON t.currency_id = cur.currency_id
          JOIN ledgers l ON t.ledger_id = l.ledger_id
          ${filterQuery}
          GROUP BY DATE(${groupByName})
          ${sortQuery}
          ${limitQuery}`;
      } else if (groupBy === "category") {
        groupByName = "cat.category_name";
        query = `SELECT ${groupByName} as ${groupBy}, sum(t.amount) as total_amount
          FROM transactions t
          JOIN users u ON t.user_id = u.user_id
          JOIN currencies cur ON t.currency_id = cur.currency_id
          JOIN categories cat ON cat.category_id = t.category_id
          JOIN ledgers l ON t.ledger_id = l.ledger_id
          ${filterQuery}
          GROUP BY ${groupByName}
          ${sortQuery}
          ${limitQuery}`;
      }
    } else {
      query = `SELECT t.created_at, u.user_name, l.ledger_name, cat.category_name, t.amount, cur.currency_name, t.description
        FROM transactions t
        JOIN users u ON t.user_id = u.user_id
        JOIN currencies cur ON t.currency_id = cur.currency_id
        JOIN categories cat ON t.category_id = cat.category_id
        JOIN ledgers l ON t.ledger_id = l.ledger_id
        ${filterQuery}
        ${sortQuery}
        ${limitQuery}`;
    }

    console.debug(`Query params: ${initialParams.join(", ")}`);
    console.debug(`SQL: ${query}`);
    const result = await db.query(query, initialParams);
    // console.debug(`Results: ${result.rows}`)
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transaction data.");
  }
}

export { fetchTransactions };
