"use client";

import { HeroScrollDemo } from "@/components/hero-scroll";
import LandingHeader from "@/components/landing-header";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <div className="h-screen items-center flex font-mono flex-col gap-4 ">
      <LandingHeader />
      <div className="w-[85%] mt-[50px] flex flex-col items-start ">
        <p className="mt-32 text-5xl font-semibold">Navigate frontend</p>
        <p className="text-5xl mt-3 font-semibold">interviews with ease</p>
        <p className="text-xl mt-6 dark:text-gray-300 text-gray-600 w-[50%]">
          Meet the{" "}
          <span className="text-black dark:text-white">
            {" "}
            front-end interview prep platform
          </span>{" "}
          built to make your interviews much easier—streamlining your practice,
          enhancing your skills, and giving you the edge to succeed with
          confidence.
        </p>
        <Button
          variant="default"
          className="bg-[#E2FB75] rounded-full h-[40px] px-8   mt-8 text-black hover:bg-[#E2FB75]/90"
        >
          <p className="text-[14px]">Get Started now</p>
          <ArrowRight className="w-3 h-4" />
        </Button>
      </div>

      <div className="w-[95%] ">
        <HeroScrollDemo />
      </div>
    </div>
  );
}
