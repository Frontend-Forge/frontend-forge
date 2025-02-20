// app/api/test/worker.js
import { parentPort, workerData } from "worker_threads";

const { userCode, testCase, functionName } = workerData;

try {
  console.log("Worker received:", {
    userCodeLength: userCode.length,
    functionName,
    testCase,
  });

  // Create a clean execution context
  const context = {};

  // Execute user code in a new function, ensuring no module resolution
  const execFunc = new Function(
    "context",
    `
    ${userCode}
    context.${functionName} = ${functionName};
  `
  );
  execFunc(context);

  const userFunc = context[functionName];

  if (typeof userFunc !== "function") {
    throw new Error(`Function ${functionName} not found or is not a function`);
  }

  // Deserialize input and output
  // Parse twice to handle double-serialized JSON strings
  const parsedInput = JSON.parse(JSON.parse(testCase.serializedInput));
  const expectedOutput = JSON.parse(testCase.serializedOutput);

  function areEqual(a, b) {
    try {
      if (a === b) return true;
      if (a === undefined || b === undefined) return false;
      if (a === null || b === null) return a === b;
      return JSON.stringify(a) === JSON.stringify(b);
    } catch {
      return false;
    }
  }

  const actual = userFunc(parsedInput);
  const passed = areEqual(actual, expectedOutput);

  parentPort.postMessage({
    passed,
    input: testCase.serializedInput,
    expected: testCase.serializedOutput,
    actual: JSON.stringify(actual),
    description: testCase.description,
  });
} catch (error) {
  console.error("Worker error:", error);
  parentPort.postMessage({
    passed: false,
    input: testCase.serializedInput,
    expected: testCase.serializedOutput,
    actual: error instanceof Error ? error.message : "An error occurred",
    description: testCase.description,
  });
}
