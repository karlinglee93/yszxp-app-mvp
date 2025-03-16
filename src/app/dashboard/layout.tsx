"use client";
import Layout from "antd/lib/layout";

import "@/components/global.css"

import SideNav from "@/components/dashboard/side-nav";
import DatePicker from "@/components/layout/date-picker";
import { usePathname } from "next/navigation";

const { Sider, Header, Footer, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const datePickerExistPathnames = ["/dashboard", "/dashboard/transactions"];

  return (
    <Layout>
      <Sider
        width={200}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          zIndex: 1000,
        }}
      >
        <SideNav />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            background: "#fff",
          }}
        >
          {/* TODO: enhance to display the oldest data if the timerange is too long */}
          <DatePicker hidden={!datePickerExistPathnames.includes(pathname)} />
        </Header>
        <Content
          style={{
            padding: "24px",
            minHeight: "100vh",
            background: "#f0f2f5",
          }}
        >
          {children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
