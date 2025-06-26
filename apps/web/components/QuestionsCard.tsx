"use client";

import TechLogoComponent from "@workspace/editor/components/TechLogo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

type Tech = "html" | "css" | "js" | "react";

type QuestionCardProps = {
  tech: Tech[];
  questionName: string;
  desc: string;
  difficulty: "Easy" | "Medium" | "Hard";
  _id: string;
};

export function QuestionCard({
  tech,
  questionName,
  desc,
  difficulty,
  _id,
}: QuestionCardProps) {
  const { user } = useUser();

  console.log(user);

  return (
    <Link href={`/editor/${_id}`}>
      <Card className="dark:bg-[#1E1E21]">
        <CardHeader className="flex flex-row  items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold">{questionName}</CardTitle>

          <div className="flex items-center gap-2">
            {questionName === "Counter" && (
              <Badge
                variant="secondary"
                className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
              >
                Warm up question
              </Badge>
            )}
            {user?.questionsSolved?.includes(_id) && (
              <CheckCircle2 className="text-green-500 w-5 h-5 " />
            )}
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-muted-foreground mb-4">
            {desc.length < 200 ? desc : `${desc.slice(0, 200)}...`}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">UI coding</Badge>
            <Badge
              variant="default"
              className="bg-emerald-500/10 text-emerald-500"
            >
              {difficulty}
            </Badge>
            <TechLogoComponent logos={tech} />
          </div>
          <ArrowRight className="w-6 h-6 right-10 bottom-4 text-gray-400 absolute" />
        </CardContent>
      </Card>
    </Link>
  );
}
