import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import type React from "react";
import { Button } from "@workspace/ui/components/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sidebar Example",
  description: "A sidebar example using Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex relative ${inter.className} `}>
      <Sidebar />
      <main className="flex-1">{children}</main>
      <div className="flex flex-row gap-4 absolute top-4 right-4 items-center">
        <Button
          variant="default"
          className="bg-[#E2FB75] rounded-full h-[30px] text-black hover:bg-[#E2FB75]/90"
        >
          <p className="text-[12px]">Get full access</p>
        </Button>
      </div>
    </div>
  );
}
