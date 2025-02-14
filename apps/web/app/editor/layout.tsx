"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import type React from "react"; // Import React
import Image from "next/image";
import { Check, FileWarning, InfoIcon, PlayIcon } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-[#1a1a1a] text-neutral-200">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 text-white z-50 w-full border-b border-neutral-800 bg-[#1a1a1a]">
            <div className="flex h-14 items-center px-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  alt="logo"
                  src={"/images/logo.png"}
                  width={30}
                  height={30}
                  className="rounded-md"
                />
                <div className="font-bold text-white">Frontend Forge</div>
              </Link>

              <nav className="flex items-center space-x-6 mx-6">
                <button className="text-sm font-medium transition-colors hover:text-yellow-200">
                  Interviews
                </button>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium transition-colors hover:text-yellow-200"
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <button className="text-sm font-medium transition-colors hover:text-yellow-200">
                    Prepare
                  </button>
                </div>
              </nav>

              <div className="flex flex-1 items-center justify-end space-x-4">
                <Link
                  href="/pricing"
                  className="text-sm font-medium transition-colors hover:text-yellow-200"
                >
                  Pricing
                </Link>
                <Button
                  variant="default"
                  className="bg-[#E2FB75] rounded-full h-[30px] text-black hover:bg-[#E2FB75]/90"
                >
                  <p className="text-[12px]">Get full access</p>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t w-full h-14 border-neutral-800 bg-[#1a1a1a]">
            <div className="flex flex-row items-center justify-between h-full w-full">
              <div className="flex flex-row ml-8 gap-[6px] text-gray-300 cursor-pointer duration-300 transition-all hover:text-white items-center">
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
                >
                  <PlayIcon className="w-3 h-3" />
                  <p className="text-[12px]">Run</p>
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
