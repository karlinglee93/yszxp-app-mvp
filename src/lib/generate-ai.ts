"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const generativeAIModel = "gemini-2.0-flash";
const api_key = process.env.NEXT_PUBLIC_GENERATIVE_AI_API_KEY;
const instruction =
  "You are an AI assistant specialized in analyzing personal financial transactions provided by the user. Your primary role is to carefully examine the uploaded transaction data, identify patterns, trends, and unusual activities, and provide clear, precise, and insightful analyses. Your analysis should cover spending habits, income sources and stability, budgeting, category-based insights, recurring transactions, unusual transactions, savings and investment opportunities, personalized recommendations, and predictive financial insights. Emphasize comparisons between current-month transactions and historical data to help users better understand their financial behaviors and effectively plan their financial future.";

export async function fetchAnalysisFromGemini(summary: object) {
  if (!api_key) throw Error("Not able to find API Key for Gemini AI");

  const genAI = new GoogleGenerativeAI(api_key);
  const model = genAI.getGenerativeModel({
    model: generativeAIModel,
    systemInstruction: instruction,
  });

  // TODO: pre-process transactions data
  const prompt = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
            Here's a summary of user transactions:
            ${JSON.stringify(summary, null, 2)}
            
            Please perform an in-depth analysis specifically focusing on transactions from the current month ("this month"), using historical transaction data as context for comparison and insights.
            Include the following structured insights clearly separated by sections:
            
            1. Overview & Summaries:
              - Total income and expenses for this month.
              - Net savings for this month.
              - Comparison of balance to last month and monthly average.
            
            2. Income Insights:
              - Analysis of user's income sources (e.g., salary, investment, side income).
              - Stability and variability of income.
            
            3. Spending Habits Analysis:
              - Top spending categories.
              - Most frequent expense items or categories.
            
            4. Unusual Activity & Alerts:
              - Identification of unusually high transactions.
              - Alerts on unusual categories or significant changes in spending behavior.
            
            5. Savings & Investment Potential:
              - Analysis of user's potential for savings based on current spending.
              - Feasible investment recommendations.
            
            6. Personalized Recommendations & Insights:
              - Provide personalized AI-based recommendations to improve spending habits.
              - Suggest better financial practices tailored to user's spending patterns.
            
            7. Predictive Analysis & Future Forecast:
              - Predict upcoming expenses based on historical spending data.
              - Provide insights to help user effectively plan and forecast future financial activities.
            
            Provide your entire analysis strictly as a JSON object with the following keys, where each key's value should be a clear, insightful, and complete response sentence or paragraph summarizing that specific section:
            
            {
              "overview_summaries": "Your full sentence response for overview & summaries within 50 words.",
              "income_insights": "Your full sentence response for income insights within 50 words.",
              "spending_habits_analysis": "Your full sentence response for spending habits analysis within 100 words.",
              "unusual_activity_alerts": "Your full sentence response for unusual activities and alerts within 50 words.",
              "savings_investment_potential": "Your full sentence response for savings & investment potential within 50 words.",
              "personalized_recommendations": "Your full sentence response for personalized recommendations & insights within 100 words.",
              "predictive_analysis_forecast": "Your full sentence response for predictive analysis & future forecast within 100 words."
              "others": "Any additional important observations, insights, or notes you think are necessary or helpful to mention within 100 words."
            }            
            `,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      // temperature: 0.1,
    },
  };

  const result = await model.generateContent(prompt);

  return result.response.text();
}
