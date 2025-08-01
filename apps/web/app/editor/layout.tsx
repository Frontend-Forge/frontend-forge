"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import type React from "react"; // Import React
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  InfoIcon,
  Moon,
  PlayIcon,
  Sun,
} from "lucide-react";

import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useCode } from "@/contexts/CodeContext";
import { useDarkMode } from "@/hooks/useDarkMode";
import { QuestionSidebar } from "@/components/SidebarQuestions";
import { useCallback, useEffect, useRef, useState } from "react";
import { ExtendedQuestion } from "@/components/DisplayQuestions";
import ChatbotPopup from "@/components/AskAI";
import { useUser } from "@/contexts/UserContext";
import { Avatar } from "@/components/Avatar";
import { ConfettiButton } from "@/components/magicui/confetti";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showQuestionBar, setShowQuestionBar] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const [questions, setQuestions] = useState<ExtendedQuestion[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const { theme, toggleTheme } = useDarkMode();
  const pathName = usePathname();
  const questionId = pathName.slice(8, pathName.length);

  const { code, setTestCases } = useCode();

  const backendUrl = "http://localhost:4000";

  const [completed, setCompleted] = useState<boolean>(false);
  const [isUpdatingCompletion, setIsUpdatingCompletion] =
    useState<boolean>(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // Function to check if question is solved
  const checkQuestionStatus = useCallback(
    async (questionId: string) => {
      if (!questionId || !token) return;

      setIsCheckingStatus(true);

      try {
        const response = await fetch(
          `${backendUrl}/api/questions/check-solved/${questionId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCompleted(data.isSolved);
        } else {
          console.error("Failed to check question status");
          // Reset to false if we can't determine the status
          setCompleted(false);
        }
      } catch (error) {
        console.error("Error checking question status:", error);
        // Reset to false if there's an error
        setCompleted(false);
      } finally {
        setIsCheckingStatus(false);
      }
    },
    [backendUrl, token]
  );

  // Check question status whenever questionId changes
  useEffect(() => {
    if (questionId && token) {
      checkQuestionStatus(questionId);
    }
  }, [questionId, token, checkQuestionStatus]);

  const handleCompleted = useCallback(async () => {
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set debounce timeout
    debounceTimeoutRef.current = setTimeout(async () => {
      if (isUpdatingCompletion) return; // Prevent multiple simultaneous requests

      setIsUpdatingCompletion(true);

      try {
        const newCompletedState = !completed;
        const endpoint = newCompletedState
          ? `${backendUrl}/api/questions/mark-completed`
          : `${backendUrl}/api/questions/mark-incomplete`;

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            questionId: questionId,
          }),
        });

        if (response.ok) {
          // Only update state if the API call was successful
          setCompleted(newCompletedState);

          // Optional: Show success feedback
          console.log(
            `Question ${newCompletedState ? "marked as completed" : "marked as incomplete"}`
          );
        } else {
          const errorData = await response.json();
          console.error(
            "Failed to update completion status:",
            errorData.message || "Unknown error"
          );

          // Optional: Show error message to user
          // You might want to add a toast notification here
        }
      } catch (error) {
        console.error("Error updating completion status:", error);

        // Optional: Show error message to user
        // You might want to add a toast notification here
      } finally {
        setIsUpdatingCompletion(false);
      }
    }, 300); // 300ms debounce delay
  }, [completed, questionId, backendUrl, isUpdatingCompletion, token]);

  // Cleanup function - add this useEffect for cleanup
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  async function handleSubmit() {
    const req = await fetch(`${backendUrl}/api/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId,
        userCode: code,
      }),
    });

    const res = await req.json();

    setTestCases(res.results);
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/getData");
        const data = await response.json();

        if (response.ok) {
          setQuestions(data.data);
        } else {
          setError(data.message || "Failed to load data");
        }
      } catch (err) {
        setError(`An error occurred while fetching data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const router = useRouter();

  useEffect(() => {
    questions.map((q, i) => {
      if (q._id === questionId) {
        setQuestionIndex(i + 1);
      }
    });
  }, [questionId, questions]);

  function handleNextQuestion() {
    questions.map((q, i) => {
      if (q._id === questionId && i !== questions.length - 1) {
        router.push(`/editor/${questions[i + 1]?._id}`);
      }
    });
  }

  function handlePrevQuestion() {
    questions.map((q, i) => {
      if (q._id === questionId && i >= 1) {
        router.push(`/editor/${questions[i - 1]?._id}`);
      }
    });
  }

  const { user, logOutUser } = useUser();

  return (
    <div
      className={` ${fontSans.variable} ${fontMono.variable} font-sans antialiased  bg-white text-balck`}
    >
      <div className="flex min-h-screen flex-col ">
        <QuestionSidebar
          showQuestionBar={showQuestionBar}
          setShowQuestionBar={setShowQuestionBar}
          setQuestionIndex={setQuestionIndex}
        />
        <header className="sticky top-0 text-black z-50 w-full border-b dark:border-neutral-800 border-neutral-300 dark:bg-[#18181B] dark:text-white bg-white">
          <div className="flex h-14 items-center px-4">
            <Link href="/" className="flex items-center space-x-1">
              {theme === "dark" ? (
                <Image
                  alt="logo"
                  src={"/images/logo-light.svg"}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              ) : (
                <Image
                  alt="logo"
                  src={"/images/logo.svg"}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              )}
              <div className="font-bold ">Frontend Forge</div>
            </Link>

            <nav className="flex items-center space-x-6 mx-6">
              <button className="text-sm font-medium transition-colors hover:text-yellow-500">
                Interviews
              </button>
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-yellow-500"
              >
                Dashboard
              </Link>
              <div className="relative">
                <button className="text-sm font-medium transition-colors hover:text-yellow-500">
                  Prepare
                </button>
              </div>
            </nav>

            <div className="flex flex-row gap-4 absolute top-4 right-4 items-center">
              <p className="text-[14px] hover:underline cursor-pointer">
                Pricing
              </p>
              <div
                onClick={toggleTheme}
                className="rounded-full border-[1px] p-[7px] hover:bg-[#E4E4E7] dark:hover:bg-[#1f1f20] hover:border-gray-500 hover:scale-110 transition-all ease-in-out cursor-pointer duration-200 dark:border-[#27272A] border-[#E4E4E7]"
              >
                {theme === "dark" ? (
                  <Moon className="w-4 h-4 text-gray-300 hover:text-white transition-all duration-200" />
                ) : (
                  <Sun className="w-4 h-4 text-gray-700 hover:text-black transition-all duration-200" />
                )}
              </div>

              <Button
                variant="default"
                className="bg-[#E2FB75] rounded-full h-[30px] text-black hover:bg-[#E2FB75]/90"
              >
                <p className="text-[12px]">Get full access</p>
              </Button>
              <Avatar user={user} logOutUser={logOutUser} />
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t w-full h-14 border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#18181B] dark:text-white text-black">
          <div className="flex flex-row items-center justify-between h-full w-full">
            <div className="flex flex-row ml-8 gap-[6px] dark:hover:text-gray-300 cursor-pointer duration-300 transition-all hover:text-gray-900 items-center">
              <InfoIcon className="h-3 w-3" />
              <p className=" text-[12px] mt-[1px]">Report an Issue</p>
            </div>

            <div className="text-sm  flex flex-row items-center justify-center gap-3">
              <div
                onClick={handlePrevQuestion}
                className="hover:bg-gray-200 dark:hover:dark:bg-gray-950 delay-150 ease-in-out  hover:scale-110 duration-200 cursor-pointer p-2 rounded-full "
              >
                {" "}
                <ArrowLeft className="w-4 h-4 " />
              </div>

              <div
                onClick={() => setShowQuestionBar(true)}
                className=" px-3 cursor-pointer py-1 flex flex-row items-center gap-2 dark:bg-black bg-white  border-[1px] border-gray-400 dark:border-[#3D3D44] rounded-full"
              >
                Questions{" "}
                <span className="px-3 py-[1px] text-[10px] dark:bg-black bg-gray-200 border-[1px] border-gray-400 dark:border-[#3D3D44] rounded-full">
                  {questionIndex}/5
                </span>
              </div>
              <div
                onClick={handleNextQuestion}
                className="hover:bg-gray-200 dark:hover:dark:bg-gray-950 delay-150 ease-in-out  hover:scale-110 duration-200 cursor-pointer p-2 rounded-full "
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-row items-center gap-4 mr-8">
              <ChatbotPopup />
              <Button
                variant="default"
                className={` ${completed ? "bg-[#74f080] hover:bg-[#74f080]/70" : "bg-[#E2FB75] hover:bg-[#E2FB75]/70"} rounded-full flex flex-row gap-[4px] items-center h-[30px] px-2 text-black`}
                onClick={handleCompleted}
                disabled={isUpdatingCompletion || isCheckingStatus}
              >
                {isUpdatingCompletion ? (
                  <>
                    <div className="w-3 h-3 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-[12px]">Updating...</p>
                  </>
                ) : isCheckingStatus ? (
                  <>
                    <div className="w-3 h-3 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-[12px]">Checking...</p>
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3" />
                    <p className="text-[12px]">
                      {completed ? (
                        "Completed"
                      ) : (
                        <ConfettiButton className="">
                          Mark Completed
                        </ConfettiButton>
                      )}
                    </p>
                  </>
                )}
              </Button>
              <Button
                variant="default"
                className="bg-[#E2FB75] rounded-full flex flex-row gap-[4px] items-center h-[30px] px-2 text-black hover:bg-[#E2FB75]/90"
                onClick={handleSubmit}
              >
                <PlayIcon className="w-3 h-3" />
                <p className="text-[12px]">Run</p>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
