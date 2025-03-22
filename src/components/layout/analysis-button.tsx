"use client";
import { AnalysisResult } from "@/lib/definitions";
import { tryParseJSON } from "@/lib/utils";
import { BarChartOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Drawer,
  Flex,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

const AnalysisContent = ({ data }: { data: AnalysisResult }) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Typography>
        <Title level={4}>Overview</Title>
        <Paragraph>{data.overview_summaries}</Paragraph>
        <Divider />

        <Title level={4}>Income Insights</Title>
        <Paragraph>{data.income_insights}</Paragraph>
        <Divider />

        <Title level={4}>Spending Habits</Title>
        <Paragraph>{data.spending_habits_analysis}</Paragraph>
        <Divider />

        <Title level={4}>Unusual Activities</Title>
        <Paragraph>{data.unusual_activity_alerts}</Paragraph>
        <Divider />

        <Title level={4}>Savings Potential</Title>
        <Paragraph>{data.savings_investment_potential}</Paragraph>
        <Divider />

        <Title level={4}>Recommendations</Title>
        <Paragraph>{data.personalized_recommendations}</Paragraph>
        <Divider />

        <Title level={4}>Forecast</Title>
        <Paragraph>{data.predictive_analysis_forecast}</Paragraph>
      </Typography>
    </Space>
  );
};

export default function AnalysisButton() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<
    AnalysisResult | string | null
  >(null);

  useEffect(() => {
    const savedResult = sessionStorage.getItem("analysis-result");
    if (savedResult) {
      setAnalysisResult(tryParseJSON(savedResult));
    }
  }, []);

  const handleAnalysis = async () => {
    if (!analysisResult) {
      setBtnLoading(true);
      setDrawerOpen(true);

      try {
        const result = await fetch("/api/analysis");
        const data = await result.json();
        sessionStorage.setItem("analysis-result", data.result);
        const parsedData = tryParseJSON(data.result);
        console.log("parsedData", parsedData)
        setAnalysisResult(parsedData);
      } catch (error) {
        setAnalysisResult(`Error generating analysis: ${error}`);
      } finally {
        setBtnLoading(false);
      }
    } else {
      setDrawerOpen(true);
    }
  };

  return (
    <div>
      <Tooltip title="Analyze your transactions with Gemini AI">
        <Button
          type="primary"
          icon={<BarChartOutlined />}
          shape="round"
          loading={btnLoading}
          onClick={handleAnalysis}
        >
          Analysis
        </Button>
      </Tooltip>
      <Drawer
        title="Transaction Analysis"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {analysisResult === null ? (
          <Flex style={{ height: "100%" }} justify="center" align="center">
            <Spin tip="Analyzing..." />
          </Flex>
        ) : typeof analysisResult === "string" ? (
          <Typography.Text type="danger">{analysisResult}</Typography.Text>
        ) : (
          <AnalysisContent data={analysisResult} />
        )}
      </Drawer>
    </div>
  );
}
