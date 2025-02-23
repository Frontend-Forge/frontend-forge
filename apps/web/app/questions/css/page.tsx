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
        <TechIcons dark="css" />
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
                <path
                  fill="#264DE4"
                  d="M71.357 460.819L30.272 0h451.456l-41.129 460.746L255.724 512z"
                />
                <path
                  fill="#2965F1"
                  d="M405.388 431.408l35.148-393.73H256v435.146z"
                />
                <path
                  fill="#EBEBEB"
                  d="M124.46 208.59l5.065 56.517H256V208.59H124.46zM119.419 150.715H256V94.197H114.281l1.35 15.874 13.788 40.644zM256 355.372l-.248.066-62.944-16.996-4.023-45.076h-56.736l7.919 88.741 115.772 32.14.26-.073z"
                />
                <path
                  fill="#FFF"
                  d="M255.805 208.59v56.517H325.4l-6.56 73.299-63.035 17.013v58.8l115.864-32.112.85-9.549 13.28-148.792 1.38-15.176 10.203-114.393H255.805v56.518h79.639L330.3 208.59z"
                />
              </svg>
              <h1 className="text-3xl font-semibold text-foreground">
                CSS Interview Questions
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              70+ most important CSS interview questions covering layouts,
              animations, responsive design, specificity, and creating engaging
              interfaces.
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
