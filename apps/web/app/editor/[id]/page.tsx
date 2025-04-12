"use client";

import { useParams } from "next/navigation";
import Editor from "@workspace/editor/components/Editor";

import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { useCode } from "@/contexts/CodeContext";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useGetQuestion } from "@/hooks/queries";
import { AlertCircle, Code, Loader2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function QuestionPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: question, isLoading, isError, error } = useGetQuestion(id);

  const { code, setCode, testCases } = useCode();
  const { theme } = useDarkMode();

  if (isLoading)
    return (
      <div
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <div className="flex flex-col fixed top-14 bottom-14 w-full dark:bg-[#18181B] bg-white dark:text-white text-black">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
            <h3 className="text-xl font-medium">Loading Editor</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Preparing your coding environment...
            </p>
          </div>
        </div>
      </div>
    );
    
    if (!question)
      return (
        <div
          className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
        >
          <div className="flex flex-col fixed top-14 bottom-14 w-full dark:bg-[#18181B] bg-white dark:text-white text-black">
            <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center px-4">
              <h2 className="text-2xl font-bold mb-2">Question Not Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find the question you're looking for. It may have been
                removed or doesn't exist.
              </p>
              <Button
                onClick={() => (window.location.href = "/questions")}
                className="bg-[#E2FB75] hover:bg-[#E2FB75]/80 text-black"
              >
                Browse Questions
              </Button>
            </div>
          </div>
        </div>
      );

  if (isError)
    return (
      <div
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <div className="flex flex-col fixed top-14 bottom-14 w-full dark:bg-[#18181B] bg-white dark:text-white text-black">
          <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Unable to Load Editor</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error?.message ||
                "An unexpected error occurred while loading the question."}
            </p>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "/questions")}
              className="border-gray-300 dark:border-gray-700"
            >
              Back to Questions
            </Button>
          </div>
        </div>
      </div>
    );


  return (
    <div
      className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
    >
      <Editor
        theme={theme}
        question={question}
        setCode={setCode}
        testCases={testCases}
        className="flex flex-col fixed top-14 bottom-14  dark:bg-[#18181B] bg-white dark:text-white text-black"
      />
    </div>
  );
}
