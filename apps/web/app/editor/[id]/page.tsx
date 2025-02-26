"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ExtendedQuestion } from "@/app/questions/page";
import Editor from "@workspace/editor/components/Editor";

import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { useCode } from "@/contexts/CodeContext";
import { useDarkMode } from "@/hooks/useDarkMode";

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

  const [question, setQuestion] = useState<ExtendedQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { code, setCode, testCases } = useCode();
  const { theme } = useDarkMode();

  console.log(code);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    fetch(`/api/questions/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQuestion(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load question");
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!question) return <p>Question not found</p>;

  return (
    <div
      className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
    >
      <Editor
        theme={theme}
        question={question}
        setCode={setCode}
        testCases={testCases}
      />
    </div>
  );
}
