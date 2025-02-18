"use client";
import Layout from "antd/lib/layout";

import SideNav from "@/components/dashboard/side-nav";

const { Sider, Header, Footer, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Sider width="25%"><SideNav/></Sider>
      <Layout>
        <Header>Dashboard</Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
