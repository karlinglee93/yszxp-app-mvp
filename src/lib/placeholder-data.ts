import { v4 as uuidv4 } from "uuid";

import { rawTransactions } from "./raw-transaction-data";

const userId = uuidv4();
const ledgerId = uuidv4();
// Define currency IDs
const currencyIdUsd = uuidv4();
const currencyIdEur = uuidv4();
const currencyIdCny = uuidv4();
const currencyIdGbp = uuidv4();
const currencyIdJpy = uuidv4();
// Define category IDs
const categoryIdGroceries = uuidv4();
const categoryIdShopping = uuidv4();
const categoryIdRestaurants = uuidv4();
const categoryIdTransport = uuidv4();
const categoryIdTravel = uuidv4();
const categoryIdEntertainment = uuidv4();
const categoryIdHealth = uuidv4();
const categoryIdServices = uuidv4();
const categoryIdGeneral = uuidv4();
const categoryIdUtilities = uuidv4();
const categoryIdInsurance = uuidv4();
const categoryIdTransfers = uuidv4();
const categoryIdGift = uuidv4();
const categoryIdLoan = uuidv4();
const categoryIdCredit = uuidv4();
const categoryIdDonation = uuidv4();
const categoryIdRefund = uuidv4();
const categoryIdCashback = uuidv4();
const categoryIdAllowance = uuidv4();
const categoryIdSalary = uuidv4();
const categoryIdNetSales = uuidv4();
const categoryIdInterest = uuidv4();
const categoryIdRemittances = uuidv4();
const categoryIdInvestment = uuidv4();
const categoryIdWealth = uuidv4();
const categoryIdTopUps = uuidv4();
const categoryIdCash = uuidv4();
const categoryIdSavings = uuidv4();

// TODO: secret user pwd
const users = [
  {
    user_id: userId,
    user_name: "admin",
    user_pwd: "admin",
  },
];

const ledgers = [
  {
    ledger_id: ledgerId,
    ledger_name: "default",
    currency_id: currencyIdEur,
    is_shared: true,
  },
];

const currencies = [
  {
    currency_id: currencyIdUsd,
    currency_name: "USD",
  },
  {
    currency_id: currencyIdEur,
    currency_name: "EUR",
  },
  {
    currency_id: currencyIdCny,
    currency_name: "CNY",
  },
  {
    currency_id: currencyIdGbp,
    currency_name: "GBP",
  },
  {
    currency_id: currencyIdJpy,
    currency_name: "JPY",
  },
];

const categories = [
  {
    category_id: categoryIdGroceries,
    category_name: "groceries",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdShopping,
    category_name: "shopping",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdRestaurants,
    category_name: "restaurants",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdTransport,
    category_name: "transport",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdTravel,
    category_name: "travel",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdEntertainment,
    category_name: "entertainment",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdHealth,
    category_name: "health",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdServices,
    category_name: "services",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdGeneral,
    category_name: "general",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdUtilities,
    category_name: "utilities",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdInsurance,
    category_name: "insurance",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdGift,
    category_name: "gift",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdLoan,
    category_name: "loan",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdCredit,
    category_name: "credit",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdDonation,
    category_name: "donation",
    type: "expense",
    is_shared: true,
  },
  {
    category_id: categoryIdRefund,
    category_name: "refund",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdCashback,
    category_name: "cashback",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdAllowance,
    category_name: "allowance",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdSalary,
    category_name: "salary",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdNetSales,
    category_name: "net_sales",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdInterest,
    category_name: "interest",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdRemittances,
    category_name: "remittances",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdInvestment,
    category_name: "investment",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdWealth,
    category_name: "wealth",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdTopUps,
    category_name: "top_ups",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdCash,
    category_name: "cash",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdSavings,
    category_name: "savings",
    type: "income",
    is_shared: true,
  },
  {
    category_id: categoryIdTransfers,
    category_name: "transfers",
    type: "income",
    is_shared: true,
  },
];

// Steps to convert raw data of transactions to standarded data:
// 1. export transaction data from App
// 2. import csv on https://jsoneditoronline.org
// TODO: ensure income transaction should be positive value, expense one should be minus.
const convertCurrencyToId = (currency: string) => {
  switch (currency) {
    case "欧元":
      return currencyIdEur;
    case "人民币":
      return currencyIdCny;
    case "美元":
      return currencyIdUsd;
    case "英镑":
      return currencyIdGbp;
    case "日元":
      return currencyIdJpy;
    default:
      return currencyIdEur;
  }
};

const convertCategoryToId = (category: string) => {
  switch (category) {
    case "社交":
    case "娱乐":
      return categoryIdEntertainment;
    case "借出":
      return categoryIdLoan;
    case "通讯":
      return categoryIdUtilities;
    case "住房":
    case "办公":
    case "学习":
      return categoryIdGeneral;
    case "零食":
    case "超市":
      return categoryIdGroceries;
    case "餐饮":
    case "下馆子":
      return categoryIdRestaurants;
    case "数码":
    case "日用":
    case "服饰":
    case "家居":
      return categoryIdShopping;
    case "旅行":
      return categoryIdTravel;
    case "礼品":
      return categoryIdGift;
    case "美容":
    case "运动":
      return categoryIdHealth;
    case "订阅":
    case "快递":
    case "还款":
      return categoryIdServices;
    case "交通":
      return categoryIdTransport;
    case "分红":
      return categoryIdInvestment;
    case "闲置":
    case "咖啡":
      return categoryIdNetSales;
    case "收款":
    case "红包":
      return categoryIdTransfers;
    default:
      return categoryIdGeneral;
  }
};

const transactions = rawTransactions.map((transaction) => ({
  id: uuidv4(),
  user_id: userId,
  category_id: convertCategoryToId(transaction["分类"]),
  created_at: transaction["时间"],
  amount: transaction["金额"],
  ledger_id: ledgerId,
  currency_id: convertCurrencyToId(transaction["货币"]),
  description: transaction["备注"],
}));

export { users, ledgers, currencies, categories, transactions };
