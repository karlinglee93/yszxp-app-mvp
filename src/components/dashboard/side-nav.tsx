"use client";
import Link from "next/link";
import { Menu } from "antd";
import {
  LineChartOutlined,
  TransactionOutlined,
  BankOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { usePathname, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

export default function SideNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.get("date")
    ? `?date=${searchParams.get("date")}`
    : `?date=${dayjs().format("YYYY-MM")}`;
  const itemProps = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: `/dashboard${queryString}`,
      icon: <LineChartOutlined />,
    },
    {
      key: "transactions",
      label: "Transactions",
      href: `/dashboard/transactions${queryString}`,
      icon: <TransactionOutlined />,
    },
    {
      key: "personal-finance",
      label: "Personal Finance",
      href: "/personal-finance",
      icon: <BankOutlined />,
      disabled: true,
    },
    {
      key: "real-estate-analysis",
      label: "Real Estate Analysis",
      href: "/real-estate-analysis",
      icon: <SearchOutlined />,
      disabled: true,
    },
  ];
  const items = itemProps.map((i) => ({
    key: i.key,
    label: <Link href={i.href}>{i.label}</Link>,
    icon: i.icon,
    disabled: i.disabled ? i.disabled : false,
  }));

  const selectedKey = itemProps
    .filter((item) => pathname.startsWith(item.href.split("?")[0]))
    .sort((a, b) => b.href.length - a.href.length)[0]?.key;

  return <Menu items={items} selectedKeys={[selectedKey]} />;
}
