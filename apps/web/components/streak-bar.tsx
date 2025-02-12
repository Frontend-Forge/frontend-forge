import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

interface ActivityData {
  date: string;
  count: number;
}

interface ActivityHeatmapProps {
  data?: ActivityData[];
  startDate?: Date | string;
  endDate?: Date | string; // Add endDate prop
}

interface MonthData {
  [key: string]: Date[];
}

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  data = [],
  startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  // Default endDate to current date or one year from start date, whichever is earlier
  endDate = new Date(
    Math.min(
      new Date().getTime(),
      new Date(startDate).getTime() + 365 * 24 * 60 * 60 * 1000
    )
  ),
}) => {
  const startDateTime =
    typeof startDate === "string" ? new Date(startDate) : startDate;
  const endDateTime = typeof endDate === "string" ? new Date(endDate) : endDate;

  const getDateKey = (date: Date): string => {
    return date.toISOString().split("T")[0] as string;
  };

  // Format date for tooltip display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const activityMap: Map<string, number> = new Map(
    data.map((item) => {
      const dateKey = getDateKey(new Date(item.date));
      return [dateKey, item.count];
    })
  );

  const generateDates = (): Date[] => {
    const dates: Date[] = [];
    const currentDate = new Date(startDateTime);

    while (currentDate <= endDateTime) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const groupByMonth = (dates: Date[]): MonthData => {
    const months: MonthData = {};
    dates.forEach((date) => {
      const monthKey = date.toLocaleString("default", { month: "short" });
      if (!months[monthKey]) {
        months[monthKey] = [];
      }
      months[monthKey].push(date);
    });
    return months;
  };

  const getColor = (count: number = 0): string => {
    if (count === 0) return "bg-gray-200";
    if (count <= 2) return "bg-green-200";
    if (count <= 4) return "bg-green-400";
    if (count <= 6) return "bg-green-600";
    return "bg-green-800";
  };

  const dates = generateDates();
  const monthsData = groupByMonth(dates);

  const colorScale = [
    "bg-gray-100",
    "bg-green-200",
    "bg-green-400",
    "bg-green-600",
    "bg-green-800",
  ];

  return (
    <TooltipProvider>
      <div className="w-[90%] max-w-6xl ml-3 p-4 border border-gray-300 shadow-sm rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Activity Heatmap</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Less</span>
              <div className="flex gap-1">
                {colorScale.map((color, i) => (
                  <div key={i} className={`w-3 h-3 ${color} rounded-sm`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">More</span>
            </div>
          </div>

          <div className="flex justify-center gap-1">
            <div className="flex flex-wrap gap-1 overflow-x-auto">
              {Object.entries(monthsData).map(([month, dates]) => (
                <div key={month} className="flex flex-col gap-1">
                  <div className="h-4 text-xs text-gray-500">{month}</div>
                  <div className="grid grid-rows-7 grid-flow-col gap-1">
                    {dates.map((date) => {
                      const dateKey = getDateKey(date);
                      const count = activityMap.get(dateKey) ?? 0;
                      return (
                        <Tooltip key={dateKey} delayDuration={200}>
                          <TooltipTrigger asChild>
                            <div
                              className={`w-3 h-3 ${getColor(count)} rounded-sm cursor-pointer transition-colors duration-200 hover:ring-2 hover:ring-offset-1 hover:ring-blue-400`}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white p-3 rounded-lg shadow-lg">
                            <div className="flex flex-col gap-1">
                              <div className="font-medium">
                                {formatDate(date)}
                              </div>
                              <div className="text-gray-200">
                                {count}{" "}
                                {count === 1 ? "activity" : "activities"}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ActivityHeatmap;
