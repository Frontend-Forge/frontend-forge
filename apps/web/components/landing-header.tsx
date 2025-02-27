import { useDarkMode } from "@/hooks/useDarkMode";
import Image from "next/image";

export default function LandingHeader() {
  const { theme } = useDarkMode();

  return (
    <div className="w-full h-[50px] flex flex-row justify-between items-center bg-white">
      <div className="flex flex-row items-center gap-8 ml-6 ">
        <div className="flex items-center gap-1">
          <div className="flex items-center space-x-1">
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
          </div>
          <span className="font-semibold">Frontend Forge</span>
        </div>
        <p className="text-gray-300">|</p>
        <p className="text-sm hover:underline cursor-pointer">Get Started</p>
        <p className="text-sm">Prepare</p>
      </div>
      <div></div>
    </div>
  );
}
