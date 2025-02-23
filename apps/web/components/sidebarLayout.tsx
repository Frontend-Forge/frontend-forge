import { Button } from "@workspace/ui/components/button";
import { Sidebar } from "./Sidebar";
import { Inter } from "next/font/google";
import { Sun } from "lucide-react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex relative ${inter.className} bg-white `}>
      <Sidebar />
      <main className="flex-1">{children}</main>
      <div className="flex flex-row gap-4 absolute top-4 right-4 items-center">
        <p className="text-[14px] hover:underline cursor-pointer">Pricing</p>
        <div className="rounded-full border-[1px] p-[7px] hover:bg-[#E4E4E7] hover:border-gray-500 hover:scale-110 transition-all ease-in-out cursor-pointer duration-200 border-[#E4E4E7]">
          <Sun className="w-4 h-4 text-gray-700 hover:text-black transition-all duration-200" />
        </div>

        <Button
          variant="default"
          className="bg-[#E2FB75] rounded-full h-[30px] text-black hover:bg-[#E2FB75]/90"
        >
          <p className="text-[12px]">Get full access</p>
        </Button>
        <div className="rounded-full border-[1px] p-[3px] hover:bg-[#E4E4E7] hover:border-gray-500 hover:scale-110 transition-all ease-in-out cursor-pointer duration-200 border-[#E4E4E7]">
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
  );
}
