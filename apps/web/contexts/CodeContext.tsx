"use client";

import { TestCases } from "@/models/Question";
import { createContext, ReactNode, useContext, useState } from "react";

export type ResultTest = TestCases & {
  passed: boolean;
  actual: number | boolean | string | number[] | object;
  expected: number | boolean | string | number[] | object;
};

interface CodeContextType {
  code: string | undefined;
  setCode: (code: string | undefined) => void;
  testCases: ResultTest[] | undefined;
  setTestCases: (testCases: ResultTest[] | undefined) => void;
}

const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const CodeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [code, setCode] = useState<string | undefined>();
  const [testCases, setTestCases] = useState<ResultTest[] | undefined>();

  return (
    <CodeContext.Provider value={{ code, setCode, testCases, setTestCases }}>
      {children}
    </CodeContext.Provider>
  );
};

export const useCode = (): CodeContextType => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error("useCode must be used within a CodeProvider");
  }
  return context;
};
