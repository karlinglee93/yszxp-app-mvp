"use client";
import { updateTransaction } from "@/lib/actions";
import {
  Categories,
  Currencies,
  FormattedTransactionFormType,
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
  Space,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryIcon } from "../common/CategoryIcon";

export default function EditForm({
  id,
  transaction,
  currencies,
  categories,
}: {
  id: string;
  transaction: FormattedTransactionFormType;
  currencies: Currencies[];
  categories: Categories[];
}) {
  const { category, date, currency, amount, note } = transaction;
  const initialType =
    Number(amount) < 0
      ? TransactionTypeType.EXPENSE
      : TransactionTypeType.INCOME;

  const [type, setType] = useState(initialType);
  const [form] = useForm();
  const router = useRouter();

  const selectBefore = (
    <Select
      defaultValue={currency}
      onChange={(e) => form.setFieldValue("currency", e)}
    >
      {currencies.map((i) => (
        <Select.Option key={i.currency_name} value={i.currency_id}>
          {i.currency_name}&nbsp;
          {i.currency_symbol}
        </Select.Option>
      ))}
    </Select>
  );

  const handleDateChange = (date: Dayjs) => {
    if (date) {
      const now = dayjs();
      const formattedDateTime = date
        .hour(now.hour())
        .minute(now.minute())
        .second(now.second());

      form.setFieldValue("date", formattedDateTime);
    }
  };

  const handleSubmit = (values: TransactionFormType) => {
    const formattedValues = {
      ...values,
      date: values.date.format("YYYY-MM-DD HH:mm:ss"),
    };
    updateTransaction(formattedValues, id);
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
        type: initialType,
        category: category,
        date: dayjs(date),
        currency: currency,
        amount: Math.abs(amount),
        note: note,
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
        <Select
          placeholder="Select a category"
          showSearch
          optionFilterProp="children"
        >
          {categories
            .filter((i) => i.type === type)
            .map((i) => (
              <Select.Option key={i.category_name} value={i.category_id}>
                <Flex align="center">
                  <Space>
                    <CategoryIcon
                      symbol={i.category_symbol}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label>{i.category_name}</label>
                  </Space>
                </Flex>
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="Date" name="date">
        <DatePicker format={"YYYY/MM/DD"} onChange={handleDateChange} />
      </Form.Item>
      <Form.Item name="currency" hidden></Form.Item>
      <Form.Item label="Amount" name="amount">
        <Flex>
          <InputNumber
            placeholder="Enter transaction amount"
            addonBefore={selectBefore}
            min={0}
            defaultValue={Math.abs(amount)}
          />
        </Flex>
      </Form.Item>
      <Form.Item label="Note" name="note">
        <Input placeholder="Input notes" />
      </Form.Item>
      <Form.Item label={null}>
        <Flex justify="end">
          <Button type="default" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}
