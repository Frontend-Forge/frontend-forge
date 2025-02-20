// app/api/run/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Worker } from "worker_threads";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const { userCode, input } = await req.json();

    if (!userCode) {
      return NextResponse.json({ error: "Missing userCode" }, { status: 400 });
    }

    // Extract function name from the code
    const functionName = extractFunctionName(userCode);

    if (!functionName) {
      return NextResponse.json(
        { error: "Could not determine function name" },
        { status: 400 }
      );
    }

    // Use a relative path that matches your monorepo structure
    const workerPath = path.join(
      process.cwd(),
      "app",
      "api",
      "run",
      "runner.js"
    );

    // Verify the worker file exists
    if (!fs.existsSync(workerPath)) {
      console.error(`Worker file not found at: ${workerPath}`);
      return NextResponse.json(
        { error: `Worker file not found at: ${workerPath}` },
        { status: 500 }
      );
    }

    console.log("Runner worker path:", workerPath);

    // Execute code in worker
    const result = await new Promise((resolve) => {
      const worker = new Worker(workerPath, {
        workerData: {
          userCode,
          functionName,
          input,
        },
      });

      worker.on("message", (result) => {
        console.log("Runner result:", result);
        resolve(result);
        worker.terminate();
      });

      worker.on("error", (error) => {
        console.error("Runner error event:", error);
        resolve({
          success: false,
          error: error.message,
        });
        worker.terminate();
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error("Runner exited with code:", code);
          resolve({
            success: false,
            error: `Worker exited with code ${code}`,
          });
        }
      });
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Main thread error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper function
function extractFunctionName(code: string): string | null {
  const functionDecl = code.match(/function\s+(\w+)\s*\(/);
  const constAssign = code.match(/const\s+(\w+)\s*=/);
  const arrowFunc = code.match(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>/);

  return functionDecl?.[1] || arrowFunc?.[1] || constAssign?.[1] || null;
}
