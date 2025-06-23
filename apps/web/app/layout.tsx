import { Inter, Roboto } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { CodeProvider } from "@/contexts/CodeContext";
import { UserProvider } from "@/contexts/UserContext";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontRoboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "400",
});

export const metadata = {
  title: "Frontend Forge",
  icons: {
    icon: [
      {
        rel: "icon",
        url: "/images/logo-light.svg",
        sizes: "32x32",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        url: "/images/logo-light.svg",
        sizes: "64x64",
        type: "image/svg+xml",
      },
    ],
  },
};

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
        <UserProvider>
          <CodeProvider>
            <Providers>{children}</Providers>
          </CodeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
