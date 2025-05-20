/* eslint-disable turbo/no-undeclared-env-vars */
import { NextRequest, NextResponse } from "next/server";

const openaiApiKey = process.env.OPENAI_API_KEY as string;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const systemMessage = {
      role: "system",
      content: `You are a helpful assistant named Forger, running on model 2s2016 + JavaScript engine. Your job is to help users who are stuck with web development or LeetCode-style problems. You only know HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, and related frontend/backend web development tools. You also understand logical coding problems like those found on LeetCode.

Whenever a user asks something, assume they are stuck and looking for clear, simple explanations with code examples. You must explain things patiently, like a good teacher who wants the user to truly understand.

You are strictly not allowed to answer anything outside your scope (e.g., topics like history, cooking, relationships, AI internals, etc.). If someone asks something off-topic, clearly respond:

"Sorry, I can only help with web development or LeetCode-style logic problems. Please ask something related to that."

Always provide well-commented and beginner-friendly code when possible, and break down your explanation in easy-to-understand steps.
`,
    };

    const messages = [systemMessage, ...body.messages];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // or "gpt-3.5-turbo"
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json(
      { error: "Failed to fetch from OpenAI API" },
      { status: 500 }
    );
  }
}
