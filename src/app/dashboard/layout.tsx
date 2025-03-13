"use client";
import Layout from "antd/lib/layout";

import SideNav from "@/components/dashboard/side-nav";
import DatePicker from "@/components/layout/date-picker";

const { Sider, Header, Footer, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Sider>
        {/* TODO: fix selected menu issue */}
        <SideNav />
      </Sider>
      <Layout>
        <Header>
          {/* TODO: enhance to display the oldest data if the timerange is too long */}
          <DatePicker />
        </Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
