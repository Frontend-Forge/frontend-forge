/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/test/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import QuestionModel, { IQuestion, TestCases } from "@/models/Question";
import { Worker } from "worker_threads";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { questionId, userCode } = await req.json();

    if (!questionId || !userCode) {
      return NextResponse.json(
        { error: "Missing questionId or userCode" },
        { status: 400 }
      );
    }

    const question: IQuestion | null = await QuestionModel.findById(questionId);

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const testCases: TestCases[] = question.questionDetails.testCases || [];

    const functionName = extractFunctionName(userCode);

    if (!functionName) {
      return NextResponse.json(
        { error: "Could not determine function name" },
        { status: 400 }
      );
    }

    // Serialize test cases
    const serializedTestCases = testCases.map((testCase) => ({
      serializedInput: JSON.stringify(testCase.input),
      serializedOutput: JSON.stringify(testCase.output),
      description: testCase.description,
    }));

    // Use a relative path that matches your monorepo structure
    const workerPath = path.join(
      process.cwd(),
      "app",
      "api",
      "test",
      "worker.js"
    );

    // Verify the worker file exists
    if (!fs.existsSync(workerPath)) {
      console.error(`Worker file not found at: ${workerPath}`);
      return NextResponse.json(
        { error: `Worker file not found at: ${workerPath}` },
        { status: 500 }
      );
    }

    console.log("Worker path:", workerPath);

    const results = await Promise.all(
      serializedTestCases.map(
        (serializedTestCase) =>
          new Promise((resolve) => {
            const worker = new Worker(workerPath, {
              workerData: {
                userCode,
                testCase: serializedTestCase,
                functionName,
              },
            });

            worker.on("message", (result: any) => {
              console.log("Worker result:", result);
              resolve(result);
              worker.terminate();
            });

            worker.on("error", (error) => {
              console.error("Worker error event:", error);
              resolve({
                passed: false,
                input: serializedTestCase.serializedInput,
                expected: serializedTestCase.serializedOutput,
                actual: error.message,
                description: serializedTestCase.description,
              });
              worker.terminate();
            });

            worker.on("exit", (code) => {
              if (code !== 0) {
                console.error("Worker exited with code:", code);
                resolve({
                  passed: false,
                  input: serializedTestCase.serializedInput,
                  expected: serializedTestCase.serializedOutput,
                  actual: `Worker exited with code ${code}`,
                  description: serializedTestCase.description,
                });
              }
            });
          })
      )
    );

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Main thread error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper functions
function extractFunctionName(code: string): string | null {
  const functionDecl = code.match(/function\s+(\w+)\s*\(/);
  const constAssign = code.match(/const\s+(\w+)\s*=/);
  return functionDecl?.[1] || constAssign?.[1] || null;
}
