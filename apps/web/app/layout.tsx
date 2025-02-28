"use client";

import { Inter, Roboto } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { CodeProvider } from "@/contexts/CodeContext";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontRoboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontRoboto.className} dark:bg-[#18181B] ${fontInter.className} `}
      >
        <CodeProvider>
          <Providers>{children}</Providers>
        </CodeProvider>
      </body>
    </html>
  );
}
