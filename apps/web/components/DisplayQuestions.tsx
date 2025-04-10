"use client";

import {
  AlertCircle,
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
import { QuestionCardSkeleton } from "./questionCardSkeleton";

export type ExtendedQuestion = Question & {
  _id: string;
};

type DisplayQuestionsProps = {
  heading: string;
  description: string;
  techIcons: boolean;
  headingIcon: JSX.Element;
  questions: ExtendedQuestion[];
  loading: boolean;
  error: string | null;
  language?: "html" | "css" | "javascript" | "react";
};

export default function DisplayQuestions({
  heading,
  description,
  techIcons,
  headingIcon,
  questions,
  loading,
  error,
  language,
}: DisplayQuestionsProps) {
  return (
    <div className="min-h-screen overflow-y-auto md:ml-64 ml-4 mt-12 flex flex-row bg-background dark:bg-[#18181B]">
      <div className="container relative md:ml-16 md:px-4 md:py-8 md:w-[60%]  w-[90%]">
        {techIcons && language && <TechIcons dark={language} />}

        {/* Header Section */}
        <div className="space-y-6 mt-4 mb-8">
          <div className="space-y-2">
            <div className="flex flex-row gap-6 mb-4 items-center">
              <div className="p-4 rounded-md bg-[#F8F8F8] border-gray-300 border-[2px] ">
                {headingIcon}
              </div>
              <h1 className="text-3xl font-semibold text-foreground">
                {heading}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">{description}</p>
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
            {loading && [...Array(4)].map((_, i) => <QuestionCardSkeleton key={i} />)}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 my-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-red-800 dark:text-red-300">
                      Error loading questions
                    </h3>
                    <p className="text-red-700 dark:text-red-400 text-sm mt-1">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

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
