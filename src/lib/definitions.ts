import { Dayjs } from "dayjs";

// Manually define the types that will be returned from the database
export enum TransactionTypeType {
  EXPENSE = "expense",
  INCOME = "income",
  ALL = "all",
}

export enum TransactionSortType {
  DATE = "date",
  AMOUNT = "amount",
}

export enum PickerType {
  MONTH = "month",
  YEAR = "year",
  FROM_START = "from_start",
}

export enum RecurringTransactionType {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum RecurringTransactionStatusType {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type RecurringTransaction = {
  id: string;
  amount: string;
  category_name: string;
  currency_name: string;
  description: string;
  frequency: RecurringTransactionType;
  next_transaction_date: Date;
  status: RecurringTransactionStatusType;
};

export type Transaction = {
  id: string;
  created_at: Date;
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
  id: string;
  created_at: Date;
  amount: string;
  category_name: string;
  currency_name: string;
  description: string;
};

export type TotalAmountByDateType = {
  date: Date;
  total_amount: string;
  currency: string;
  total_count: string;
};

export type TotalAmountByCategoryType = {
  category: string;
  total_amount: string;
  currency: string;
  total_count: string;
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
  transactionType: TransactionTypeType;
  sortBy: "date" | "amount";
  orderBy: "ASC" | "DESC";
  groupBy?: "day" | "category" | "currency";
  limit?: number;
}

export interface CurrencyRates {
  provider: string;
  base: string;
  date: Date;
  rates: Record<string, number>;
}

export interface Currencies {
  currency_id: string;
  currency_name: string;
  currency_symbol: string;
}

export interface Categories {
  category_id: string;
  category_name: string;
  type: TransactionTypeType;
}

export interface Ledgers {
  currency_id: string;
}

export interface TransactionFormType {
  type: string;
  category: string;
  currency: string;
  amount: number;
  date: Dayjs;
  note: string | undefined;
}

export interface FormattedTransactionFormType {
  type: string;
  category: string;
  currency: string;
  amount: number;
  date: string;
  note: string | undefined;
}

export type AnalysisResult = {
  overview_summaries: string;
  income_insights: string;
  spending_habits_analysis: string;
  unusual_activity_alerts: string;
  savings_investment_potential: string;
  personalized_recommendations: string;
  predictive_analysis_forecast: string;
  others?: string;
};
