import { NextResponse } from "next/server";
import { fetchTransactions } from "@/lib/data";
import { fetchAnalysisFromGemini } from "@/lib/generate-ai";
import dayjs from "dayjs";

export async function GET() {
  const summary = await fetchTransactions(dayjs().format("YYYY"));
  const result = await fetchAnalysisFromGemini(summary);

  return NextResponse.json({ result });
}
