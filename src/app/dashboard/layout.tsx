"use client";
import Layout from "antd/lib/layout";

import SideNav from "@/components/dashboard/side-nav";
import { Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDates } from "@/lib/utils";

const { Sider, Header, Footer, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const { start, end } = getDates(value);
    params.set("start", start);
    params.set("end", end);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Layout>
      <Sider>
        <SideNav />
      </Sider>
      <Layout>
        <Header>
          <Select
            defaultValue="this_month"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "this_month", label: "This month" },
              { value: "last_30_days", label: "Last 30 days" },
              { value: "this_year", label: "This year" },
              { value: "last_12_months", label: "Last 12 months" },
              { value: "from_start", label: "From start" },
              { value: "custom", label: "Custom" },
            ]}
          />
        </Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
