// app/api/run/runner.js
import { parentPort, workerData } from "worker_threads";

const { userCode, functionName, input } = workerData;

try {
  console.log("Runner received:", {
    userCodeLength: userCode.length,
    functionName,
    input,
  });

  // Create a clean execution context
  const context = {
    console: {
      log: (...args) => {
        logs.push(
          args
            .map((arg) =>
              typeof arg === "object" ? JSON.stringify(arg) : String(arg)
            )
            .join(" ")
        );
      },
    },
  };

  // Capture console.log outputs
  const logs = [];

  // Execute user code in a new function context
  const execFunc = new Function(
    "context",
    `
    const console = context.console;
    ${userCode}
    context.${functionName} = ${functionName};
    `
  );

  execFunc(context);

  const userFunc = context[functionName];

  if (typeof userFunc !== "function") {
    throw new Error(`Function ${functionName} not found or is not a function`);
  }

  // Parse input if it's provided as a string
  let parsedInput;
  if (input) {
    try {
      // Handle different input formats (string, JSON string, or already parsed)
      if (typeof input === "string") {
        try {
          parsedInput = JSON.parse(input);
        } catch {
          // If not valid JSON, use as is
          parsedInput = input;
        }
      } else {
        parsedInput = input;
      }
    } catch (error) {
      throw new Error(`Failed to parse input: ${error.message}`);
    }
  }

  // Execute the function with the provided input
  const result = input !== undefined ? userFunc(parsedInput) : userFunc();

  parentPort.postMessage({
    success: true,
    result: result,
    logs: logs,
    type: typeof result,
  });
} catch (error) {
  console.error("Runner error:", error);
  parentPort.postMessage({
    success: false,
    error: error instanceof Error ? error.message : "An error occurred",
  });
}
