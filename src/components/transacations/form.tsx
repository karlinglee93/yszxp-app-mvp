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
  Space,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { createTransaction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { CategoryIcon } from "../common/CategoryIcon";

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
  const router = useRouter();

  const selectBefore = (
    <Select
      defaultValue={ledgers.currency_id}
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

  const handleSubmit = async (values: TransactionFormType) => {
    const formattedValues = {
      ...values,
      date: values.date.format("YYYY-MM-DD HH:mm:ss"),
    };
    await createTransaction(formattedValues);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      style={{ maxWidth: 600, width: "100%" }}
      wrapperCol={{ span: 14 }}
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
        <DatePicker onChange={handleDateChange} format={"YYYY/MM/DD"} />
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
        <Flex justify="end" gap={8}>
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
