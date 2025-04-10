"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Book,
  Clock,
  FunctionSquare,
  GitGraph,
  Paperclip,
  RefreshCw,
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
import { question, Question } from "@workspace/editor/data/questions";
import useDebounce from "@/hooks/useDebounce";
import { useGetQuestions } from "@/hooks/queries";
import { QuestionCardSkeleton } from "@/components/questionCardSkeleton";

export type ExtendedQuestion = Question & {
  _id: string;
};

export default function Page() {
  const [filteredQuestions, setFilteredQuestions] = useState<
    ExtendedQuestion[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: questions, isLoading, isError, error } = useGetQuestions();

  useEffect(() => {
    if (questions && debouncedSearchTerm) {
      const filtered = questions.filter(
        (question) =>
          question.questionDetails.name
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          question.questionDetails.questionDescription
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()),
      );

      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions(questions ?? []);
    }
  }, [debouncedSearchTerm, questions]);

  return (
    <div className="min-h-screen overflow-y-auto md:ml-64 ml-4 mt-12 flex flex-row dark:bg-[#18181B]">
      <div className="container md:ml-16 md:px-4 md:py-8 md:w-[60%]  w-[90%]">
        {/* Header Section */}
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">
              All Coding Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              The largest bank of 500+ practice questions for front-end
              interviews.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-muted-foreground max-w-3xl">
              Save the trouble of searching the web for front-end interview
              questions. We have 500+ practice questions in every framework,
              format, and topic, each with high-quality answers and tests from
              big tech senior / staff engineers.
            </p>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute  left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search within this list of questions"
              className="pl-10 dark:bg-[#1E1E21]"
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 dark:bg-[#1E1E21]">
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
                {questions?.length || 0} questions
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                100 hours total
              </div>
            </div>

            {isLoading &&
              [...Array(4)].map((_, index) => <QuestionCardSkeleton key={index} />)}

            {isError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 my-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-red-800 dark:text-red-300">
                      Error loading questions
                    </h3>
                    <p className="text-red-700 dark:text-red-400 text-sm mt-1">
                      {error?.message ||
                        "An unknown error occurred. Please try again."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* No Results Message */}
            {!isLoading && !isError && filteredQuestions.length === 0 && (
              <div className="flex flex-col items-center gap-2 my-10">
                <Search className="h-6 w-6 text-muted-foreground" />
                <p className="text-center text-xl font-bold">
                  No questions found
                </p>
                <p className="text-center text-muted-foreground">
                  we couldn't find any results for{" "}
                  <span className="font-medium">"{debouncedSearchTerm}"</span>
                </p>

                <Button
                  variant="outline"
                  className="mx-auto mt-4"
                  onClick={() => setSearchTerm("")}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset search
                </Button>
              </div>
            )}

            {/* Question Cards */}
            {!isLoading && !isError && filteredQuestions.length > 0 && (
              <div className="grid gap-4">
                {filteredQuestions.map((question) => (
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
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
