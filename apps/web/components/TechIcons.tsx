import { languages } from "@/data/languages";
import Link from "next/link";

type Dark = {
  dark: "html" | "css" | "javascript" | "react";
};

export default function TechIcons({ dark }: Dark) {
  return (
    <div className="w-full py-4 flex flex-row gap-16 items-center">
      {languages.map((lang, i) => {
        return (
          <Link
            href={
              lang.title.toLowerCase() === "javascript"
                ? "js"
                : lang.title.toLowerCase()
            }
            key={i}
            className="flex flex-row gap-4"
          >
            <div className="w-5 h-5">{lang.icon}</div>
            <p
              className={` text-[16px] font-semibold ${dark === lang.title.toLowerCase() ? "text-black underline" : "text-gray-700"} `}
            >
              {lang.title}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
