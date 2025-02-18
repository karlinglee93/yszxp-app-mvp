// Manually define the types that will be returned from the database
export type Transaction = {
  id: string;
  user_id: string;
  category_id: string;
  category_name: string;
  created_at: string;
  amount: string;
  ledger_id: string;
  ledger_name: string;
  currency_id: string;
  currency_name: string;
  description: string;
};

enum categoryType {
  "expense",
  "income",
}

export type Category = {
  category_id: string;
  category_name: string;
  type: categoryType;
  is_shared: boolean;
};
