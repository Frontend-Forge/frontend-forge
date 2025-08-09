// 1. First, update your hooks/queries.tsx file

import { ExtendedQuestion } from "@/app/questions/page";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const backendUrl = "http://localhost:4000";

// Existing queries...
export const useGetQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await fetch("/api/getData");
      if (!response.ok) {
        throw new Error("Failed to fetch questions !");
      }
      const questions = await response.json();
      return questions.data as ExtendedQuestion[];
    },
  });
};

export const useGetQuestion = (id: string) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      const response = await fetch(`/api/questions/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch question !");
      }
      const question = await response.json();
      return question as ExtendedQuestion;
    },
  });
};

// New query for checking completion status
export const useGetQuestionStatus = (questionId: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  return useQuery({
    queryKey: ["questionStatus", questionId],
    queryFn: async () => {
      if (!token) throw new Error("No auth token");

      const response = await fetch(
        `${backendUrl}/api/questions/check-solved/${questionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check question status");
      }

      const data = await response.json();
      return data.isSolved as boolean;
    },
    enabled: !!token && !!questionId, // Only run if we have token and questionId
  });
};

// Mutation for marking question as complete
export const useMarkQuestionComplete = () => {
  const queryClient = useQueryClient();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  return useMutation({
    mutationFn: async (questionId: string) => {
      if (!token) throw new Error("No auth token");

      const response = await fetch(
        `${backendUrl}/api/questions/mark-completed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ questionId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to mark as complete");
      }

      return response.json();
    },
    onSuccess: (_, questionId) => {
      // Update the specific question status
      queryClient.setQueryData(["questionStatus", questionId], true);

      // Optionally invalidate user data to refresh solved questions count
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// Mutation for marking question as incomplete
export const useMarkQuestionIncomplete = () => {
  const queryClient = useQueryClient();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  return useMutation({
    mutationFn: async (questionId: string) => {
      if (!token) throw new Error("No auth token");

      const response = await fetch(
        `${backendUrl}/api/questions/mark-incomplete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ questionId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to mark as incomplete");
      }

      return response.json();
    },
    onSuccess: (_, questionId) => {
      // Update the specific question status
      queryClient.setQueryData(["questionStatus", questionId], false);

      // Optionally invalidate user data to refresh solved questions count
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// Custom hook to toggle completion status
export const useToggleQuestionCompletion = (questionId: string) => {
  const { data: isCompleted, isLoading } = useGetQuestionStatus(questionId);
  const markComplete = useMarkQuestionComplete();
  const markIncomplete = useMarkQuestionIncomplete();

  const toggleCompletion = () => {
    if (isCompleted) {
      markIncomplete.mutate(questionId);
    } else {
      markComplete.mutate(questionId);
    }
  };

  return {
    isCompleted: isCompleted ?? false,
    isLoading: isLoading || markComplete.isPending || markIncomplete.isPending,
    toggleCompletion,
    error: markComplete.error || markIncomplete.error,
  };
};
