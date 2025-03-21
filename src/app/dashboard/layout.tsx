"use client";
import Layout from "antd/lib/layout";

import "@/components/global.css";

import SideNav from "@/components/dashboard/side-nav";
import DatePicker from "@/components/layout/date-picker";
import { usePathname } from "next/navigation";
import { Button, Flex, Space, Tooltip } from "antd";
import { OpenAIOutlined } from "@ant-design/icons";
import { GoogleGenerativeAI } from "@google/generative-ai";

const { Sider, Header, Footer, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const datePickerExistPathnames = ["/dashboard", "/dashboard/transactions"];
  const handleAnalysisBtnClick = async () => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyAwDV3Hdj91oNQ1fsRwao1a4EGlwd0GL9k"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = "Explain how AI works";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  };

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
          <Flex align="center">
            <Space>
              <DatePicker
                hidden={!datePickerExistPathnames.includes(pathname)}
              />
              <Tooltip title="Transactions Analysis">
                <Button
                  icon={<OpenAIOutlined />}
                  color="primary"
                  shape="round"
                  onClick={handleAnalysisBtnClick}
                >
                  Analysis
                </Button>
              </Tooltip>
            </Space>
          </Flex>
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
