import { languages } from "@/data/languages";
import Link from "next/link";

type Dark = {
  dark: "html" | "css" | "javascript" | "react";
};

export default function TechIcons({ dark }: Dark) {
  return (
    <div className="w-full py-4 dark:text-white text-black">
      <div className="flex flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16 items-center overflow-x-auto scrollbar-hide">
        {languages.map((lang, i) => {
          const isActive = dark === lang.title.toLowerCase();
          return (
            <Link
              href={
                lang.title.toLowerCase() === "javascript"
                  ? "js"
                  : lang.title.toLowerCase()
              }
              key={i}
              className={`
                flex flex-row gap-2 sm:gap-3 md:gap-4 items-center px-2 sm:px-3 py-2 rounded-lg
                transition-colors duration-200 ease-in-out flex-shrink-0
                hover:bg-gray-100 dark:hover:bg-gray-800/50
                ${isActive ? "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" : ""}
              `}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                {lang.icon}
              </div>
              <p
                className={`
                  text-sm sm:text-[16px] font-semibold transition-colors duration-200 whitespace-nowrap
                  ${isActive ? "text-black dark:text-white" : "text-gray-700 dark:text-gray-300"}
                `}
              >
                {lang.title}
              </p>
              {isActive && (
                <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
