"use client";

import { HeroScrollDemo } from "@/components/hero-scroll";
import LandingHeader from "@/components/landing-header";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import TextGenerateEffect from "@workspace/ui/components/text-generate-effect";
import { motion } from "framer-motion";
import FeatureCards from "@/components/features-cards";

export default function Page() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="h-screen items-center flex font-mono flex-col gap-4">
      <LandingHeader />

      <motion.div
        className="w-[80%] mt-[50px] flex flex-col items-start"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <TextGenerateEffect
            className="mt-32 text-5xl font-semibold"
            words="Navigate frontend"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextGenerateEffect
            className="text-5xl font-semibold"
            words="interviews with ease"
          />
        </motion.div>

        <motion.p
          className="text-xl mt-6 dark:text-gray-300 text-gray-600 w-[58%]"
          variants={itemVariants}
        >
          Meet the{" "}
          <span className="text-black dark:text-white">
            {" "}
            front-end interview prep platform
          </span>{" "}
          built to make your interviews much easier—streamlining your practice,
          enhancing your skills, and giving you the edge to succeed with
          confidence.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button
            variant="default"
            className="bg-[#E2FB75] rounded-full h-[40px] px-8 mt-8 text-black hover:bg-[#E2FB75]/90"
          >
            <p className="text-[14px]">Get Started now</p>
            <ArrowRight className="w-3 h-4" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-[95%]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <HeroScrollDemo />
      </motion.div>

      <div className="-mt-[280px] w-[80%] flex flex-col items-start">
        <p className="bg-gradient-to-r from-[#19191C] to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1] text-5xl">
          Practice in an environment
        </p>
        <p className="bg-gradient-to-r from-[#19191C] to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1] text-5xl">
          that simulates real interviews
        </p>

        <p className=" text-[#52525B] dark:text-gray-200 text-xl mt-10 w-[50%]">
          Our in-browser coding workspace allows you to simulate a real
          interview environment with no set up required.
        </p>

        <div className="mt-14 w-full">
          <FeatureCards />
        </div>
      </div>

      {/* <FeatureCards /> */}
    </div>
  );
}
