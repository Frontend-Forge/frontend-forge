"use client";

import TopicCards from "@/components/miniTopicsCard";
import ProgressCards from "@/components/progress-cards";
import ActivityHeatmap from "@/components/streak-bar";
import { useUser } from "@/contexts/UserContext";
import { comapniesArray } from "@/data/comapines";
import { languages } from "@/data/languages";
import { topics } from "@/data/topics";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ActivityData {
  date: string;
  count: number;
}

const activityData: ActivityData[] = [
  { date: "2024-02-20", count: 3 },
  { date: "2024-02-21", count: 5 },
  { date: "2024-11-15", count: 2 },
];

export default function Page() {
  const { isAuthenticated, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/signin");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || (!loading && !isAuthenticated)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
        <LoaderCircle className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto md:ml-[280px] ml-8 mt-12 flex flex-col bg-background dark:bg-[#18181B]">
      <p className="text-3xl font-semibold mt-8">Dashboard</p>
      <p className="text-2xl mt-8">Your Progress at a glance</p>
      <ProgressCards />
      <ActivityHeatmap startDate={new Date("2024-02-01")} data={activityData} />
      <div className="flex flex-col w-full gap-2">
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-8">
          Focus Areas
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Deep-dive into topical focus areas critical for front end interviews
        </p>
        <TopicCards topics={topics} />
      </div>
      <div className="flex flex-col w-full gap-2">
        <p className="text-2xl font-semibold dark:text-gray-200 text-gray-700 mt-8">
          Frameworks and languages
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Targeted practice in specific front end frameworks and languages.
        </p>
        <TopicCards topics={languages} />
      </div>
      <div className="flex flex-col mb-4 w-full gap-2">
        <p className="text-2xl font-semibold  dark:text-gray-200 text-gray-700 mt-8">
          Company Guides
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Prepare for specific companies by learning insider tips and practicing
          known questions.
        </p>
        <TopicCards topics={comapniesArray} />
      </div>
    </div>
  );
}
