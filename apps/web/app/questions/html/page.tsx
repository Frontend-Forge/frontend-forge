"use client";

import { useEffect, useState } from "react";
import {
  Book,
  Clock,
  FunctionSquare,
  GitGraph,
  Paperclip,
  Search,
  SortAsc,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { QuestionCard } from "@/components/QuestionsCard";
import { Question } from "@workspace/editor/data/questions";
import TechIcons from "@/components/TechIcons";

export type ExtendedQuestion = Question & {
  _id: string;
};

export default function Page() {
  const [questions, setQuestions] = useState<ExtendedQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/getData");
        const data = await response.json();

        if (response.ok) {
          setQuestions(data.data);
        } else {
          setError(data.message || "Failed to load data");
        }
      } catch (err) {
        setError(`An error occurred while fetching data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen overflow-y-auto md:ml-64 ml-4 mt-12 flex flex-row bg-background">
      <div className="container md:ml-16 md:px-4 md:py-8 md:w-[60%]  w-[90%]">
        <TechIcons dark="html" />
        {/* Header Section */}
        <div className="space-y-6 mt-4 mb-8">
          <div className="space-y-2">
            <div className="flex flex-row gap-2 mb-4 items-center">
              <svg
                width={"40px"}
                height={"40px"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path fill="#E34F26" d="M71,460 L30,0 481,0 440,460 255,512" />
                <path fill="#EF652A" d="M256,472 L405,431 440,37 256,37" />
                <path
                  fill="#EBEBEB"
                  d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 115,109 129,265 256,265zM256,355 L255,355 192,338 188,293 158,293 132,293 139,382 255,414 256,414z"
                />
                <path
                  fill="#FFF"
                  d="M255,208 L255,265 325,265 318,338 255,355 255,414 371,382 372,372 385,223 387,208 371,208zM255,94 L255,129 255,150 255,150 392,150 392,150 392,150 393,138 396,109 397,94z"
                />
              </svg>
              <h1 className="text-3xl font-semibold text-foreground">
                HTML Interview Questions
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              90+ most important HTML interview questions covering semantics,
              forms, accessibility, media, and creating structured, interactive
              web pages.
            </p>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search within this list of questions"
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <SortAsc className="h-4 w-4" />
            Sort by
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="coding" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="system">System design</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="coding" className="space-y-6">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-2">
                <FunctionSquare className="h-4 w-4" />
                JavaScript functions
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <Paperclip className="w-4 h-4" />
                User interface coding
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <GitGraph className="w-4 h-4" />
                Algorithmic coding
              </Badge>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                {questions.length} questions
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                100 hours total
              </div>
            </div>

            {/* Loading/Error Messages */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Question Cards */}
            <div className="grid gap-4">
              {questions.map((question) => (
                <QuestionCard
                  key={question._id}
                  tech={question.questionDetails.techStack}
                  questionName={question.questionDetails.name}
                  desc={question.questionDetails.questionDescription}
                  difficulty={question.questionDetails.difficulty}
                  _id={question._id}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
