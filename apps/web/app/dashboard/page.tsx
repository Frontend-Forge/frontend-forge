import TopicCards from "@/components/miniTopicsCard";
import ProgressCards from "@/components/progress-cards";
import ActivityHeatmap from "@/components/streak-bar";
import { comapniesArray } from "@/data/comapines";
import { languages } from "@/data/languages";
import { topics } from "@/data/topics";

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
  return (
    <div className="min-h-screen overflow-y-auto md:ml-[280px] ml-8 mt-12 flex flex-col bg-background">
      <p className="text-3xl font-semibold mt-8">Dashbaord</p>
      <p className="text-2xl mt-8">Your Progress at a glance</p>
      <ProgressCards />
      <ActivityHeatmap startDate={new Date("2024-02-01")} data={activityData} />
      <div className="flex flex-col w-full gap-2">
        <p className="text-2xl font-semibold text-gray-700 mt-8">Focus Areas</p>
        <p className="text-gray-500">
          Deep-dive into topical focus areas critical for front end interviews
        </p>
        <TopicCards topics={topics} />
      </div>
      <div className="flex flex-col w-full gap-2">
        <p className="text-2xl font-semibold text-gray-700 mt-8">
          Frameworks and languages
        </p>
        <p className="text-gray-500">
          Targeted practice in specific front end frameworks and languages.
        </p>
        <TopicCards topics={languages} />
      </div>
      <div className="flex flex-col mb-4 w-full gap-2">
        <p className="text-2xl font-semibold text-gray-700 mt-8">
          Company Guides
        </p>
        <p className="text-gray-500">
          Prepare for specific companies by learning insider tips and practicing
          known questions.
        </p>
        <TopicCards topics={comapniesArray} />
      </div>
    </div>
  );
}
