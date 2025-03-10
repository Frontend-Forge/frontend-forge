import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { CodeProvider } from "@/contexts/CodeContext";

export const metadata = {
  title: "Sign In",
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
    <div>
      <CodeProvider>
        <Providers>{children}</Providers>
      </CodeProvider>
    </div>
  );
}
