"use client";
import Layout from "antd/lib/layout";

import SideNav from "@/components/dashboard/side-nav";
import DatePicker from "@/components/layout/date-picker";
import { usePathname } from "next/navigation";

const { Sider, Header, Footer, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const datePickerExistPathnames = ["/dashboard", "/dashboard/transactions"];

  return (
    <Layout>
      <Sider>
        {/* TODO: fix selected menu issue */}
        <SideNav />
      </Sider>
      <Layout>
        <Header>
          {/* TODO: enhance to display the oldest data if the timerange is too long */}
          <DatePicker hidden={!datePickerExistPathnames.includes(pathname)} />
        </Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
