import { v4 as uuidv4 } from "uuid";

import { rawTransactions } from "./raw-transaction-data";
import {
  RecurringTransactionStatusType,
  RecurringTransactionType,
} from "./definitions";
import { calculateNextRecurringDate } from "./utils";

// TODO: secret user pwd
const users = [
  {
    user_id: uuidv4(),
    user_name: "admin",
    user_pwd: "admin",
  },
];

const currencies = [
  {
    currency_id: uuidv4(),
    currency_name: "EUR",
    currency_name_cn: "欧元",
    currency_symbol: "€",
  },
  {
    currency_id: uuidv4(),
    currency_name: "USD",
    currency_name_cn: "美元",
    currency_symbol: "$",
  },
  {
    currency_id: uuidv4(),
    currency_name: "CNY",
    currency_name_cn: "人民币",
    currency_symbol: "¥",
  },
  {
    currency_id: uuidv4(),
    currency_name: "GBP",
    currency_name_cn: "英镑",
    currency_symbol: "£",
  },
  {
    currency_id: uuidv4(),
    currency_name: "JPY",
    currency_name_cn: "日元",
    currency_symbol: "¥",
  },
];

const ledgers = [
  {
    ledger_id: uuidv4(),
    ledger_name: "default",
    currency_id: currencies.find((currency) => currency.currency_name === "EUR")
      ?.currency_id,
    is_shared: true,
  },
];

const categories = [
  {
    category_name: "vegetables",
    category_name_cn: "蔬菜",
    type: "expense",
    category_symbol: "leaf",
  },
  {
    category_name: "fruits",
    category_name_cn: "水果",
    type: "expense",
    category_symbol: "apple",
  },
  {
    category_name: "fandom",
    category_name_cn: "追星",
    type: "expense",
    category_symbol: "star",
  },
  {
    category_name: "others",
    category_name_cn: "其它",
    type: "expense",
    category_symbol: "more-horizontal",
  },
  {
    category_name: "lottery",
    category_name_cn: "彩票",
    type: "expense",
    category_symbol: "dice-5",
  },
  {
    category_name: "pets",
    category_name_cn: "宠物",
    type: "expense",
    category_symbol: "paw-print",
  },
  {
    category_name: "games",
    category_name_cn: "游戏",
    type: "expense",
    category_symbol: "gamepad-2",
  },
  {
    category_name: "donations",
    category_name_cn: "捐赠",
    type: "expense",
    category_symbol: "hand-heart",
  },
  {
    category_name: "repairs",
    category_name_cn: "维修",
    type: "expense",
    category_symbol: "wrench",
  },
  {
    category_name: "car",
    category_name_cn: "汽车",
    type: "expense",
    category_symbol: "car",
  },
  {
    category_name: "tobacco_alcohol",
    category_name_cn: "烟酒",
    type: "expense",
    category_symbol: "glass",
  },
  {
    category_name: "education",
    category_name_cn: "学习",
    type: "expense",
    category_symbol: "book-open",
  },
  {
    category_name: "courier",
    category_name_cn: "快递",
    type: "expense",
    category_symbol: "package",
  },
  {
    category_name: "red_envelope",
    category_name_cn: "红包",
    type: "expense",
    category_symbol: "gift",
  },
  {
    category_name: "repayment",
    category_name_cn: "还款",
    type: "expense",
    category_symbol: "credit-card",
  },
  {
    category_name: "lending",
    category_name_cn: "借出",
    type: "expense",
    category_symbol: "send",
  },
  {
    category_name: "travel",
    category_name_cn: "旅行",
    type: "expense",
    category_symbol: "plane",
  },
  {
    category_name: "career",
    category_name_cn: "事业",
    type: "expense",
    category_symbol: "briefcase",
  },
  {
    category_name: "subscription",
    category_name_cn: "订阅",
    type: "expense",
    category_symbol: "newspaper",
  },
  {
    category_name: "beverages",
    category_name_cn: "饮品",
    type: "expense",
    category_symbol: "cup-soda",
  },
  {
    category_name: "takeout",
    category_name_cn: "外卖",
    type: "expense",
    category_symbol: "pizza",
  },
  {
    category_name: "finance",
    category_name_cn: "理财",
    type: "expense",
    category_symbol: "bar-chart-3",
  },
  {
    category_name: "communication",
    category_name_cn: "通讯",
    type: "expense",
    category_symbol: "phone",
  },
  {
    category_name: "entertainment",
    category_name_cn: "娱乐",
    type: "expense",
    category_symbol: "music",
  },
  {
    category_name: "social",
    category_name_cn: "社交",
    type: "expense",
    category_symbol: "users",
  },
  {
    category_name: "digital_products",
    category_name_cn: "数码",
    type: "expense",
    category_symbol: "monitor-smartphone",
  },
  {
    category_name: "clothing",
    category_name_cn: "服饰",
    type: "expense",
    category_symbol: "shirt",
  },
  {
    category_name: "beauty",
    category_name_cn: "美容",
    type: "expense",
    category_symbol: "sparkles",
  },
  {
    category_name: "gifts",
    category_name_cn: "礼品",
    type: "expense",
    category_symbol: "gift",
  },
  {
    category_name: "gift_money",
    category_name_cn: "礼金",
    type: "expense",
    category_symbol: "wallet",
  },
  {
    category_name: "sports",
    category_name_cn: "运动",
    type: "expense",
    category_symbol: "dumbbell",
  },
  {
    category_name: "medical",
    category_name_cn: "医疗",
    type: "expense",
    category_symbol: "stethoscope",
  },
  {
    category_name: "books",
    category_name_cn: "书籍",
    type: "expense",
    category_symbol: "book",
  },
  {
    category_name: "dining",
    category_name_cn: "餐饮",
    type: "expense",
    category_symbol: "utensils",
  },
  {
    category_name: "restaurant",
    category_name_cn: "下馆子",
    type: "expense",
    category_symbol: "utensils-crossed",
  },
  {
    category_name: "supermarket",
    category_name_cn: "超市",
    type: "expense",
    category_symbol: "shopping-cart",
  },
  {
    category_name: "snacks",
    category_name_cn: "零食",
    type: "expense",
    category_symbol: "cookie",
  },
  {
    category_name: "transportation",
    category_name_cn: "交通",
    type: "expense",
    category_symbol: "bus",
  },
  {
    category_name: "housing",
    category_name_cn: "住房",
    type: "expense",
    category_symbol: "home",
  },
  {
    category_name: "household",
    category_name_cn: "家庭",
    type: "expense",
    category_symbol: "lamp",
  },
  {
    category_name: "daily_necessities",
    category_name_cn: "日用",
    type: "expense",
    category_symbol: "shopping-bag",
  },
  {
    category_name: "home_furnishing",
    category_name_cn: "家居",
    type: "expense",
    category_symbol: "sofa",
  },
  {
    category_name: "office",
    category_name_cn: "办公",
    type: "expense",
    category_symbol: "briefcase",
  },
  {
    category_name: "shopping",
    category_name_cn: "购物",
    type: "expense",
    category_symbol: "shopping-cart",
  },
  {
    category_name: "salary",
    category_name_cn: "工资",
    type: "income",
    category_symbol: "wallet",
  },
  {
    category_name: "red_envelope_income",
    category_name_cn: "红包",
    type: "income",
    category_symbol: "gift",
  },
  {
    category_name: "rent",
    category_name_cn: "租金",
    type: "income",
    category_symbol: "home",
  },
  {
    category_name: "gift_money_income",
    category_name_cn: "礼金",
    type: "income",
    category_symbol: "wallet",
  },
  {
    category_name: "dividends",
    category_name_cn: "分红",
    type: "income",
    category_symbol: "piggy-bank",
  },
  {
    category_name: "investment",
    category_name_cn: "理财",
    type: "income",
    category_symbol: "line-chart",
  },
  {
    category_name: "year_end_bonus",
    category_name_cn: "年终奖",
    type: "income",
    category_symbol: "badge-dollar-sign",
  },
  {
    category_name: "borrowing",
    category_name_cn: "借入",
    type: "income",
    category_symbol: "arrow-down-circle",
  },
  {
    category_name: "receivables",
    category_name_cn: "收款",
    type: "income",
    category_symbol: "arrow-down-left",
  },
  {
    category_name: "idle_goods",
    category_name_cn: "闲置",
    type: "income",
    category_symbol: "box",
  },
  {
    category_name: "coffee",
    category_name_cn: "咖啡",
    type: "income",
    category_symbol: "coffee",
  },
].map((category) => ({
  category_id: uuidv4(),
  category_name: category.category_name,
  category_name_cn: category.category_name_cn,
  type: category.type,
  is_shared: true,
  category_symbol: category.category_symbol,
}));

// Steps to convert raw data of transactions to standarded data:
// 1. export transaction data from App
// 2. import csv on https://jsoneditoronline.org
const convertCurrencyToId = (currency_cn: string) => {
  const currency = currencies.find(
    (currency) => currency.currency_name_cn === currency_cn
  );

  if (!currency) {
    throw new Error(`Currency not found: ${currency_cn}`);
  }

  return currency.currency_id;
};

const convertCategoryToId = (category_cn: string) => {
  const category = categories.find(
    (category) => category.category_name_cn === category_cn
  );

  if (!category) {
    throw new Error(`Category not found: ${category_cn}`);
  }

  return category.category_id;
};

const transactions = rawTransactions.map((transaction) => ({
  id: uuidv4(),
  user_id: users.find((user) => user.user_name === "admin")?.user_id,
  category_id: convertCategoryToId(transaction["分类"]),
  created_at: transaction["时间"],
  amount: transaction["金额"],
  ledger_id: ledgers.find((ledger) => ledger.ledger_name === "default")
    ?.ledger_id,
  currency_id: convertCurrencyToId(transaction["货币"]),
  description: transaction["备注"],
}));

const rawRecurringTransactions = [
  {
    category_name_cn: "订阅",
    amount: -11,
    currency_name_cn: "人民币",
    description: "apple music",
    frequency: RecurringTransactionType.MONTHLY,
    end_date: null,
    status: RecurringTransactionStatusType.ACTIVE,
    created_at: "2025-01-01",
  },
  {
    category_name_cn: "订阅",
    amount: -68,
    currency_name_cn: "人民币",
    description: "icloud",
    frequency: RecurringTransactionType.MONTHLY,
    end_date: null,
    status: RecurringTransactionStatusType.ACTIVE,
    created_at: "2025-01-01",
  },
  {
    category_name_cn: "通讯",
    amount: -10.99,
    currency_name_cn: "欧元",
    description: "月通信费",
    frequency: RecurringTransactionType.MONTHLY,
    end_date: null,
    status: RecurringTransactionStatusType.ACTIVE,
    created_at: "2025-01-01",
  },
  {
    category_name_cn: "订阅",
    amount: -23.56,
    currency_name_cn: "欧元",
    description: "ChatGPT",
    frequency: RecurringTransactionType.MONTHLY,
    end_date: null,
    status: RecurringTransactionStatusType.ACTIVE,
    created_at: "2025-01-12",
  },
];

const recurringTransactions = rawRecurringTransactions.map((i) => {
  return {
    id: uuidv4(),
    user_id: users.find((user) => user.user_name === "admin")?.user_id,
    ledger_id: ledgers.find((ledger) => ledger.ledger_name === "default")
      ?.ledger_id,
    category_id: categories.find(
      (c) => c.category_name_cn === i.category_name_cn
    )?.category_id,
    currency_id: currencies.find(
      (c) => c.currency_name_cn === i.currency_name_cn
    )?.currency_id,
    amount: i.amount,
    description: i.description,
    frequency: i.frequency,
    created_at: i.created_at,
    next_transaction_date: calculateNextRecurringDate(
      i.created_at,
      i.frequency
    ),
    end_date: null,
    status: i.status,
  };
});

export {
  users,
  ledgers,
  currencies,
  categories,
  transactions,
  recurringTransactions,
};
