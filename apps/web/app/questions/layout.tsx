import type { Metadata } from "next";
import type React from "react";
import { SidebarLayout } from "@/components/sidebarLayout";

export const metadata: Metadata = {
  title: "Sidebar Example",
  description: "A sidebar example using Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
