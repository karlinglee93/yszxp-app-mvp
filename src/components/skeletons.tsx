// TODO: enhance skeletions
"use client";
import { Skeleton, Card, Table, Form } from "antd";

export function CardSkeleton() {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Skeleton active paragraph={{ rows: 4 }} />
    </Card>
  );
}

export function LineChartSkeleton() {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Skeleton active title={false} paragraph={{ rows: 6 }} />
    </Card>
  );
}

export function PieChartSkeleton() {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Skeleton active title={false} paragraph={{ rows: 4 }} />
    </Card>
  );
}

export function ListSkeleton() {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Skeleton active paragraph={{ rows: 4 }} />
    </Card>
  );
}

export const TransactionFormSkeleton = () => {
  return (
    <Form>
      <Skeleton active paragraph={{ rows: 4 }} />
    </Form>
  );
};

export const TransactionTableSkeleton = () => {
  return (
    <Table>
      <Skeleton active paragraph={{ rows: 4 }} />
    </Table>
  );
};
