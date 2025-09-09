"use client";

import { Button } from "@workspace/ui/components/button";
import { Sidebar } from "./Sidebar";
import { Inter } from "next/font/google";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useUser } from "@/contexts/UserContext";
import { Avatar } from "./Avatar";

const inter = Inter({ subsets: ["latin"] });

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { toggleTheme, theme } = useDarkMode();
  const { user, logOutUser } = useUser();
  return (
    <div
      className={`flex relative ${inter.className} dark:bg-[#18181B] bg-white `}
    >
      <Sidebar />
      <main className="flex-1">{children}</main>
      <div className="flex flex-row gap-4 absolute top-4 right-4 items-center">
        <p className="text-[14px] hover:underline cursor-pointer">Pricing</p>
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

        <Avatar user={user} logOutUser={logOutUser} />
      </div>
    </div>
  );
}
