import { ExtendedQuestion } from "@/app/questions/page";
import { useQuery } from "@tanstack/react-query";

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
