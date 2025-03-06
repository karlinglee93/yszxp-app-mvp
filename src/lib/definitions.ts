// Manually define the types that will be returned from the database
export type Transaction = {
  id: string;
  created_at: object;
  amount: string;
  user_id: string;
  user_name: string;
  category_id: string;
  category_name: string;
  ledger_id: string;
  ledger_name: string;
  currency_id: string;
  currency_name: string;
  description: string;
};

export type TransactionType = {
  created_at: object;
  amount: string;
  category_name: string;
  currency_name: string;
  description: string;
};

export interface Amount {
  total_amount: string;
  day: Date;
  category: string;
  currency: string;
}

// DB Query Params
export interface TransactionQueryParams {
  startDate?: string;
  endDate?: string;
  transactionType: "expense" | "income" | "all";
  sortBy: "date" | "amount";
  orderBy: "ASC" | "DESC";
  groupBy?: "day" | "category" | "currency";
  limit?: number;
}

export interface CurrencyRates {
  provider: string;
  base: string;
  date: Date;
  rates: object;
}
