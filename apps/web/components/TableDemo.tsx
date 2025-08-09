// 4. Update your TableDemo.tsx component

/* eslint-disable react/no-unknown-property */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ExtendedQuestion } from "./DisplayQuestions";
import { usePathname, useRouter } from "next/navigation";
import { useGetQuestionStatus } from "@/hooks/queries";

function styleDifficultyText(diff: string) {
  switch (diff) {
    case "Easy":
      return "text-green-500";
    case "Medium":
      return "text-yellow-500";
    case "Hard":
      return "text-red-500";
    default:
      return "Unknow Case";
  }
}

// Component to show individual question status
function QuestionStatusIcon({ questionId }: { questionId: string }) {
  const { data: isCompleted, isLoading } = useGetQuestionStatus(questionId);

  if (isLoading) {
    return (
      <div className="w-6 h-6 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
    );
  }

  return (
    <CheckCircle2
      className={`w-6 h-6 mb-2 ${isCompleted ? "text-green-400" : "text-gray-300"}`}
    />
  );
}

export function TableDemo({
  setShowQuestionBar,
  setQuestionIndex,
  query,
}: {
  setShowQuestionBar: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number | null>>;
  query: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [questions, setQuestions] = useState<ExtendedQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<
    ExtendedQuestion[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathName = usePathname();

  const questionId = pathName.slice(8);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/getData");
        const data = await response.json();

        if (response.ok) {
          setQuestions(data.data);
          setFilteredQuestions(data.data); // Initialize filtered questions with all questions
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

  // Update filtered questions whenever the query or questions change
  useEffect(() => {
    if (query) {
      const filtered = questions.filter((q) =>
        q.questionDetails.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions(questions);
    }
  }, [query, questions]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occured</p>;
  }

  return (
    <div
      className="h-[90%] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx global>{`
        /* Base scrollbar styling - always functional but visually transparent */
        .hover-visible-scroll {
          overflow-y: auto;
          scrollbar-width: thin;
        }

        /* For Webkit browsers (Chrome, Safari) */
        .hover-visible-scroll::-webkit-scrollbar {
          width: 6px; /* Keep width so layout doesn't shift */
        }

        .hover-visible-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .hover-visible-scroll::-webkit-scrollbar-thumb {
          background-color: transparent; /* Transparent by default */
          border-radius: 20px;
          transition: background-color 0.2s;
        }

        /* Show the scrollbar thumb only when hovered */
        .hover-visible-scroll.hovered::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
        }
      `}</style>

      <div
        className={`hover-visible-scroll h-full ${isHovered ? "hovered" : ""}`}
      >
        <Table>
          <TableHeader className="sticky top-0 bg-background dark:bg-[#18181B]  z-10">
            <TableRow>
              <TableHead className="w-[60%]">Name</TableHead>
              <TableHead className="w-[20%]">Format</TableHead>
              <TableHead className="w-[20%]">Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.map((question, i) => (
              <TableRow
                onClick={() => {
                  router.push(`/editor/${question._id}`);
                  setQuestionIndex(i + 1);
                  setShowQuestionBar(false);
                }}
                key={i}
                className={`cursor-pointer ${questionId === question._id ? "dark:bg-[#222225] bg-gray-100" : ""}`}
              >
                <TableCell className="font-medium flex flex-row items-center gap-4">
                  <span>
                    <QuestionStatusIcon questionId={question._id} />
                  </span>
                  {question.questionDetails.name}{" "}
                </TableCell>
                <TableCell>
                  {question.questionDetails.questionType === "logical"
                    ? "JS Function"
                    : "UI Coding"}
                </TableCell>
                <TableCell
                  className={styleDifficultyText(
                    question.questionDetails.difficulty
                  )}
                >
                  🔥 {question.questionDetails.difficulty}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
