"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import type React from "react"; // Import React
import Image from "next/image";
import { Check, InfoIcon, Moon, PlayIcon, Sun } from "lucide-react";

import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { usePathname } from "next/navigation";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useDarkMode();
  const pathName = usePathname();
  const questionId = pathName.slice(8, pathName.length);

  const { code, setTestCases } = useCode();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;

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

  return (
    <div
      className={` ${fontSans.variable} ${fontMono.variable} font-sans antialiased  bg-white text-balck`}
    >
      <div className="flex min-h-screen flex-col ">
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
              <div className="rounded-full border-[1px] p-[3px] dark:hover:bg-[#1f1f20] hover:bg-[#E4E4E7] hover:border-gray-500 hover:scale-110 transition-all ease-in-out cursor-pointer duration-200 dark:border-[#27272A] border-[#E4E4E7]">
                <Image
                  src={"/images/pratiyank.jpg"}
                  width={26}
                  height={26}
                  className="rounded-full"
                  alt="pratiyank-image"
                />
              </div>
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

            <div className="flex flex-row items-center gap-4 mr-8">
              <Button
                variant="default"
                className="bg-[#E2FB75] rounded-full flex flex-row gap-[4px] items-center h-[30px] px-2 text-black hover:bg-[#E2FB75]/90"
              >
                <Check className="w-3 h-3" />
                <p className="text-[12px]">Mark Completed</p>
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
