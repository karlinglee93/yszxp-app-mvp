"use client";
import {
  Categories,
  Currencies,
  Ledgers,
  TransactionFormType,
  TransactionTypeType,
} from "@/lib/definitions";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useState } from "react";
import { createTransaction } from "@/lib/actions";

const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  CNY: "¥",
  GBP: "£",
  JPY: "¥",
};

export default function TransactionForm({
  currencies,
  categories,
  ledgers,
}: {
  currencies: Currencies[];
  categories: Categories[];
  ledgers: Ledgers;
}) {
  const [type, setType] = useState(TransactionTypeType.EXPENSE);
  const [form] = useForm();

  const updatedCurrencies = currencies.map((currency) => ({
    ...currency,
    currency_symbol: currencySymbols[currency.currency_name] || "",
  }));
  const selectBefore = (
    <Select
      defaultValue={ledgers.currency_id}
      onChange={(e) => form.setFieldValue("currency", e)}
    >
      {updatedCurrencies.map((i) => (
        <Select.Option key={i.currency_name} value={i.currency_id}>
          {i.currency_name}&nbsp;
          {i.currency_symbol}
        </Select.Option>
      ))}
    </Select>
  );

  const handleSubmit = (values: TransactionFormType) => {
    console.log(values);
    const formattedValues = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };
    createTransaction(formattedValues);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      initialValues={{
        type: TransactionTypeType.EXPENSE,
        date: dayjs(),
        amount: 0,
        currency: ledgers.currency_id,
      }}
    >
      <Form.Item label="Type" name="type">
        <Radio.Group
          onChange={(e) => {
            setType(e.target.value);
            form.setFieldValue("category", undefined);
          }}
        >
          <Radio value={TransactionTypeType.EXPENSE}> Expense </Radio>
          <Radio value={TransactionTypeType.INCOME}> Income </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Category" name="category">
        <Select placeholder="Select a category">
          {categories
            .filter((i) => i.type === type)
            .map((i) => (
              <Select.Option key={i.category_name} value={i.category_id}>
                {i.category_name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="Date" name="date">
        <DatePicker format={"YYYY/MM/DD"} />
      </Form.Item>
      <Form.Item name="currency" hidden></Form.Item>
      <Form.Item label="Amount" name="amount">
        <Flex>
          <InputNumber
            placeholder="Enter transaction amount"
            addonBefore={selectBefore}
            min={0}
          />
        </Flex>
      </Form.Item>
      <Form.Item label="Note" name="note">
        <Input placeholder="Input notes" />
      </Form.Item>
      <Form.Item label={null}>
        <Flex justify="end">
          <Button type="default">Cannel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}
