"use client";

import { Inter } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { CodeProvider } from "@/contexts/CodeContext";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontInter.className} `}>
        <CodeProvider>
          <Providers>{children}</Providers>
        </CodeProvider>
      </body>
    </html>
  );
}
