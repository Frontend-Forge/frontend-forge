"use client";

import { HeroScrollDemo } from "@/components/hero-scroll";
import LandingHeader from "@/components/landing-header";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import TextGenerateEffect from "@workspace/ui/components/text-generate-effect";
import { motion } from "framer-motion";
import FeatureCards from "@/components/features-cards";
import CompaniesCards from "@/components/companies-cards";
import { MarqueeDemo } from "@/components/reviews";
import MessageBox from "@/components/message";
import Footer from "@/components/Footer";
import { AccordionDemo } from "@/components/accordian";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

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

  const { isAuthenticated } = useUser();

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
            className="bp3:mt-32 mt-10 bp3:text-5xl text-3xl font-semibold"
            words="Navigate frontend"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextGenerateEffect
            className="bp3:text-5xl text-3xl font-semibold"
            words="interviews with ease"
          />
        </motion.div>

        <motion.p
          className="bp3:text-xl text-[16px] mt-6 dark:text-gray-300 text-gray-600 bp2:w-[58%]"
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
        <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
          <motion.div variants={itemVariants}>
            <Button
              variant="default"
              className="bg-[#E2FB75] rounded-full h-[40px] px-8 mt-8 text-black hover:bg-[#E2FB75]/90"
            >
              <p className="text-[14px]">Get Started now</p>
              <ArrowRight className="w-3 h-4" />
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      <motion.div
        className="w-[95%]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <HeroScrollDemo />
      </motion.div>

      <div className=" bp2:-mt-[280px] mt-4  w-[80%] flex flex-col items-start">
        <p className="bg-gradient-to-r from-[#19191C] to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1] bp4:text-5xl text-3xl">
          Practice in an environment{" "}
          <span className="bp3:hidden inline-block">that</span>
        </p>
        <p className="bg-gradient-to-r from-[#19191C] to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1] bp4:text-5xl text-3xl">
          <span className="bp3:inline-block hidden">that</span> simulates real
          interviews
        </p>

        <p className=" text-[#52525B] bp3:text-xl text-[16px]  dark:text-gray-200 mt-10  bp5:w-[50%] bp4:w-[90%]">
          Our in-browser coding workspace allows you to simulate a real
          interview environment with no set up required.
        </p>

        <div className="mt-14 w-full">
          <FeatureCards />
        </div>
      </div>
      <div className="mt-8 w-[80%] flex flex-col items-start">
        <p className="bg-gradient-to-r from-[#19191C] to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1] bp4:text-5xl text-3xl">
          Let experienced developers
        </p>
        <p className="bg-gradient-to-r bp4:mt-3 mt-0 from-[#19191C] pb-1 to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1] bp4:text-5xl text-3xl">
          craft your learning resources.
        </p>

        <p className=" text-[#52525B] bp5:w-[50%] bp4:w-[90%] bp3:text-xl text-[16px]  dark:text-gray-200  mt-10">
          Gain valuable best practices and advanced techniques, carefully
          refined through extensive hands-on experience and deep industry
          knowledge.
        </p>

        <div className="mt-14 w-full">
          <CompaniesCards />
        </div>
      </div>

      {/* <FeatureCards /> */}

      <div className="mt-12 w-[80%] flex flex-col items-start">
        <p className="bg-gradient-to-r pb-1 from-[#19191C] to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1] bp4:text-5xl text-3xl">
          What People are Saying!
        </p>

        <div className="mt-14 w-full">
          <MarqueeDemo />
          <MarqueeDemo />
        </div>
      </div>

      <div className="mt-8 w-[80%] flex flex-col items-start">
        <p className="bg-gradient-to-r from-[#19191C] to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1]  bp4:text-5xl text-3xl">
          Your commonly asked
        </p>
        <p className="bg-gradient-to-r mt-3 from-[#19191C] pb-1 to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1]  bp4:text-5xl text-3xl">
          questions, answered
        </p>
      </div>

      <AccordionDemo />

      <div className="mt-8 w-[80%] flex flex-col items-start">
        <p className="bg-gradient-to-r  from-[#19191C] to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1]  bp4:text-5xl text-3xl">
          Don&lsquo;t hesitate to reach out.{" "}
          <span className="bp4:hidden"> We&lsquo;re always here to help.</span>
        </p>
        <p className="bg-gradient-to-r bp4:block hidden mt-3 from-[#19191C] pb-1 to-[#717171] bg-clip-text text-transparent dark:from-[#F3F3F4] dark:to-[#C1C1C1]  bp4:text-5xl text-3xl">
          We&lsquo;re always here to help.
        </p>

        <p className="  text-[#52525B] bp5:w-[50%] bp4:w-[90%] bp3:text-xl text-[16px]  dark:text-gray-200  mt-10">
          Have questions, feedback, or anything to say? Tell us. We usually get
          back within 1-2 days.
        </p>

        <div className="mt-14 w-full">
          <MessageBox />
        </div>
      </div>

      <Footer />
    </div>
  );
}
