"use client";
import React, { useState } from "react";
import { ContainerScroll } from "@workspace/ui/components/scroll-animation";
import Editor from "@workspace/editor/components/Editor";
import {
  question as question1,
  question2,
} from "@workspace/editor/data/questions";
import { useDarkMode } from "@/hooks/useDarkMode";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function HeroScrollDemo() {
  const { theme } = useDarkMode();

  const [questionType, setQuestionType] = useState<"logical" | "ui">("ui");

  function handleQuestionTypeChange(input: "logical" | "ui") {
    if (input === "ui") {
      setQuestionType("ui");
    } else {
      setQuestionType("logical");
    }
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll>
        <div className="w-full dark:border-[#353538] border-gray-400 border-[2px] flex flex-col bg-[#E4E4E7] dark:bg-[#353538] rounded-md shadow-xl overflow-hidden">
          {/* Mac window header */}
          <div className="h-8 w-full bg-gray-200 dark:bg-[#1E1E21] flex items-center px-4 border-b border-gray-300 dark:border-gray-700">
            <div className="flex space-x-2">
              <div
                className="w-3 h-3 rounded-full bg-red-500"
                title="Close"
              ></div>
              <div
                className="w-3 h-3 rounded-full bg-yellow-500"
                title="Minimize"
              ></div>
              <div
                className="w-3 h-3 rounded-full bg-green-500"
                title="Maximize"
              ></div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="text-xs font-medium px-3 py-1 dark:bg-black dark:text-white text-center w-[30%] bg-white rounded-md  text-gray-600 flex flex-row items-center gap-4 justify-center">
                <LinkIcon className="w-3 h-3" />
                <p>frontend-forge-web.vercel.app</p>
              </div>
            </div>
          </div>

          {questionType === "ui" ? (
            <Editor
              question={question1}
              theme={theme}
              className="flex flex-col h-[550px] dark:bg-[#18181B] bg-white dark:text-white text-black"
              key={1}
            />
          ) : (
            <Editor
              question={question2}
              theme={theme}
              className="flex flex-col h-[550px] dark:bg-[#18181B] bg-white dark:text-white text-black"
              key={2}
            />
          )}

          {/* Status bar at the bottom like in VSCode */}
          <Link
            href={
              questionType === "logical"
                ? "/editor/67b54f63f8d517c2bd25ebb3"
                : "/editor/67b012ffac5eb1bde3a25dae"
            }
            target="_blank"
            className="h-6 w-full bg-[#EAFE7C] flex items-center justify-center px-4 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700"
          >
            <p className="text-[12px] text-black">
              Click here to try actual workspace And run test cases
            </p>
          </Link>
        </div>

        <div className="flex flex-row gap-4 w-full justify-center items-center mt-6">
          <Button
            onClick={() => handleQuestionTypeChange("ui")}
            className="rounded-full text-sm "
            variant={questionType === "ui" ? "default" : "outline"}
          >
            UI Components
          </Button>
          <Button
            onClick={() => handleQuestionTypeChange("logical")}
            className="rounded-full text-sm"
            variant={questionType === "logical" ? "default" : "outline"}
          >
            JavaScript Function
          </Button>
        </div>
      </ContainerScroll>
    </div>
  );
}
