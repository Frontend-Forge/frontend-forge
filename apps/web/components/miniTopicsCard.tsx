import { ArrowRight, MessageSquare } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import Link from "next/link";
import { TopicCard } from "@/data/topics";

interface PropTypes {
  topics: TopicCard[];
}

export default function TopicCards({ topics }: PropTypes) {
  return (
    <div className="grid w-[90%] ml-4 gap-4 md:grid-cols-2">
      {topics.map((topic: TopicCard) => (
        <Link key={topic.title} href={topic.href}>
          <Card className="flex items-center justify-between p-6 transition-colors hover:bg-accent">
            <div className="flex items-center gap-4">
              {
                <div className="rounded-lg bg-[#FAFAFA] p-2 shadow-sm">
                  {topic.icon}
                </div>
              }
              <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight">
                  {topic.title}
                </h3>
                <p className="flex items-center text-sm text-muted-foreground">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {topic.questions} questions
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Card>
        </Link>
      ))}
    </div>
  );
}
