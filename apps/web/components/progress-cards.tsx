"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";

export default function ProgressCards() {
  return (
    <div className="flex md:flex-row flex-col gap-6 p-4 w-[92%]">
      {/* Solved Problems Card */}
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Solved problems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  className="stroke-muted"
                  fill="none"
                  strokeWidth="8"
                  cx="50"
                  cy="50"
                  r="42"
                />
                {/* Progress circle - only showing a small portion to match the low completion rate */}
                <circle
                  className="stroke-[#4ade80] rotate-[-90deg] origin-center"
                  fill="none"
                  strokeWidth="8"
                  strokeDasharray="264, 264"
                  strokeDashoffset="250"
                  cx="50"
                  cy="50"
                  r="42"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">12</span>
                <span className="text-xs text-muted-foreground">Solved</span>
              </div>
            </div>
            <div className="flex-1 space-y-3 ml-4">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>Easy</span>
                  <span className="text-muted-foreground">7/221</span>
                </div>
                <Progress value={3.17} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>Medium</span>
                  <span className="text-muted-foreground">5/254</span>
                </div>
                <Progress value={1.97} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>Hard</span>
                  <span className="text-muted-foreground">0/78</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solved by Question Type Card */}
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Solved by question type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mt-2">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span>Coding</span>
                <div className="text-muted-foreground">
                  <span>12/251 completed</span>
                  <span className="ml-4">5%</span>
                </div>
              </div>
              <Progress value={5} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span>Quizzes</span>
                <div className="text-muted-foreground">
                  <span>0/283 completed</span>
                  <span className="ml-4">0%</span>
                </div>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span>System Design</span>
                <div className="text-muted-foreground">
                  <span>0/19 completed</span>
                  <span className="ml-4">0%</span>
                </div>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
