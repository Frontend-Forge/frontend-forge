/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect, ReactNode } from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Avatar } from "@workspace/ui/components/avatar";
import { Send, Code, CodeSquare } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { SparklesText } from "./magicui/sparkles-text";
import { useGetQuestion } from "@/hooks/queries";
import { useParams } from "next/navigation";

// Keep all the existing helper interfaces and functions here
interface CodeBlock {
  type: "code" | "text";
  language?: string;
  content: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface OpenAIResponse {
  choices?: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message?: string;
  };
}

const extractCodeBlocks = (text: string): CodeBlock[] => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
  const codeBlocks: CodeBlock[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      codeBlocks.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }

    if (match[2]) {
      codeBlocks.push({
        type: "code",
        language: match[1] || "javascript",
        content: match[2],
      });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    codeBlocks.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  return codeBlocks;
};

interface MessageContentProps {
  content: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  const blocks = extractCodeBlocks(content);

  // Custom components for ReactMarkdown
  const components: Components = {
    h1: (props) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
    h2: (props) => <h2 className="text-xl font-bold mt-3 mb-2" {...props} />,
    h3: (props) => <h3 className="text-lg font-bold mt-3 mb-1" {...props} />,
    h4: (props) => <h4 className="text-base font-bold mt-2 mb-1" {...props} />,
    p: (props) => <p className="my-2" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 my-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-2" {...props} />,
    li: (props) => <li className="my-1" {...props} />,
    a: (props) => <a className="text-blue-600 hover:underline" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic my-2"
        {...props}
      />
    ),
    strong: (props) => <strong className="font-bold" {...props} />,
    em: (props) => <em className="italic" {...props} />,
    table: (props) => (
      <div className="overflow-x-auto my-4">
        <table
          className="w-full border-collapse table-auto border border-gray-300"
          {...props}
        />
      </div>
    ),
    thead: (props) => <thead className="bg-gray-100" {...props} />,
    tbody: (props) => <tbody {...props} />,
    tr: (props) => <tr className="border-b border-gray-300" {...props} />,
    th: (props) => (
      <th className="border border-gray-300 px-4 py-2 text-left" {...props} />
    ),
    td: (props) => (
      <td className="border border-gray-300 px-4 py-2" {...props} />
    ),
    hr: (props) => <hr className="my-4 border-gray-300" {...props} />,
    img: (props) => (
      <img
        src={props.src}
        alt={props.alt}
        className="max-w-full h-auto my-2 rounded"
        {...props}
      />
    ),
    pre: (props) => <pre className="my-2" {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    code: ({ inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code
            className="px-1 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return <code {...props}>{children}</code>;
    },
  };

  return (
    <div className="flex flex-col gap-2">
      {blocks.map((block, index) => {
        if (block.type === "code") {
          return (
            <div key={index} className="relative rounded-md overflow-hidden">
              <div className="bg-gray-800 text-white text-xs px-2 py-1 flex justify-between items-center">
                <span>{block.language}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  onClick={() => navigator.clipboard.writeText(block.content)}
                >
                  <Code size={14} />
                </Button>
              </div>
              <SyntaxHighlighter
                language={block.language}
                style={vscDarkPlus}
                customStyle={{ margin: 0, borderRadius: "0 0 6px 6px" }}
              >
                {block.content}
              </SyntaxHighlighter>
            </div>
          );
        }
        return (
          <div key={index} className="markdown-content">
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {block.content}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
};

interface OpenAIRequestBody {
  model: string;
  messages: Message[];
  max_tokens: number;
  temperature: number;
}

const ChatbotPopup: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [firstOpen, setFirstOpen] = useState<boolean>(true);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "# Welcome, I'm Forger — your AI Dev Helper!\n\n- 🧠 **Stuck on a bug or can't solve a problem? Just ask me!**\n- 💻 *I can write and explain HTML, CSS, JavaScript, React, Next.js, and more.*\n- 🚫 **No need to Google or switch tabs — I'm already here for that.**\n- 📌 *Ask anything, and I'll break it down with code and simple steps.*",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const id = params.id as string;

  const { data: question } = useGetQuestion(id);

  // Reset chat when question ID changes
  useEffect(() => {
    if (id && id !== currentQuestionId) {
      // Reset the chat state for the new question
      setCurrentQuestionId(id);
      setFirstOpen(true);
      setMessages([
        {
          role: "assistant",
          content:
            "# Welcome, I'm Forger — your AI Dev Helper!\n\n- 🧠 **Stuck on a bug or can't solve a problem? Just ask me!**\n- 💻 *I can write and explain HTML, CSS, JavaScript, React, Next.js, and more.*\n- 🚫 **No need to Google or switch tabs — I'm already here for that.**\n- 📌 *Ask anything, and I'll break it down with code and simple steps.*",
        },
      ]);

      // If dialog is already open with a different question, immediately load the new question
      if (open && question) {
        handleQuestionRequest();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, question]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when popup opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // Handle first open case
      if (firstOpen && question) {
        setFirstOpen(false);
        handleQuestionRequest();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, question, firstOpen]);

  const callOpenAIAPI = async (messages: Message[]): Promise<string> => {
    try {
      const requestBody: OpenAIRequestBody = {
        model: "gpt-4", // or "gpt-3.5-turbo"
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      };

      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data: OpenAIResponse = await response.json();

      if (data.choices && data.choices.length > 0) {
        if (data.choices[0]) {
          return data.choices[0].message.content;
        }

        return "";
      } else if (data.error) {
        throw new Error(data.error.message || "OpenAI API Error");
      } else {
        console.log("Unexpected API response format:", data);
        return "Unexpected response format from OpenAI API.";
      }
    } catch (error) {
      console.error("Error in callOpenAIAPI:", error);
      throw error;
    }
  };

  const handleQuestionRequest = async (): Promise<void> => {
    if (!question || isLoading) return;

    setIsLoading(true);

    // Format the question details into a structured prompt
    const questionPrompt = formatQuestionPrompt(question);

    try {
      // Add the user question as if they asked it
      setMessages((prev) => [
        ...prev,
        { role: "user", content: questionPrompt },
      ]);

      const response = await callOpenAIAPI([
        ...messages,
        { role: "user", content: questionPrompt },
      ]);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatQuestionPrompt = (question: any): string => {
    // Structure the question details into a clear prompt
    let prompt = `Can you help me solve this coding question: "${question.questionDetails.name}"?\n\n`;
    prompt += `Description: ${question.questionDetails.questionDescription}\n\n`;

    if (
      question.questionDetails.requirements &&
      question.questionDetails.requirements.length > 0
    ) {
      prompt += "Requirements:\n";
      question.questionDetails.requirements.forEach(
        (req: string, i: number) => {
          prompt += `${i + 1}. ${req}\n`;
        }
      );
      prompt += "\n";
    }

    prompt += `Difficulty: ${question.questionDetails.difficulty}\n`;
    prompt += `Time Limit: ${question.questionDetails.time} minutes\n`;
    prompt += `Tech Stack: ${question.questionDetails.techStack.join(", ")}\n\n`;

    if (
      question.questionDetails.notes &&
      question.questionDetails.notes.length > 0
    ) {
      prompt += "Additional Notes:\n";
      question.questionDetails.notes.forEach((note: string) => {
        if (note && note.trim()) {
          // Check if note is not empty
          prompt += `- ${note.trim()}\n`;
        }
      });
    }

    prompt += "\nPlease provide a complete solution with explanation.";

    return prompt;
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await callOpenAIAPI([
        ...messages,
        { role: "user", content: userMessage },
      ]);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                className="bg-[#E2FB75] rounded-full flex flex-row gap-[4px] items-center h-[30px] px-2 text-black hover:bg-[#E2FB75]/90"
                onClick={() => setOpen(true)}
              >
                <CodeSquare className="w-3 h-3" />
                <p className="text-[12px]">Forger</p>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white text-xs">
              Your personal AI helper
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] sm:h-[90%] p-0 flex flex-col">
        <Card className="w-full h-full shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col">
          <CardHeader className="p-4 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 mt-1 bg-black">
                  <img src="/images/logo-light.svg" alt="Forger Logo" />
                </Avatar>
                <CardTitle className="text-lg mt-[6px] font-bold">
                  Forger
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-grow overflow-hidden">
            <ScrollArea className="h-full px-4 py-4">
              <div className="flex flex-col gap-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mt-1 bg-black">
                        <img src="/images/logo-light.svg" alt="Forger Logo" />
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[85%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <MessageContent content={message.content} />
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <img src="/images/pratiyank.jpg" alt="User Avatar" />
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 mt-1 bg-black">
                      <img src="/images/logo-light.svg" alt="Forger Logo" />
                    </Avatar>
                    <div className="rounded-lg px-3 py-2 bg-muted flex items-center">
                      <SparklesText className="font-normal text-sm">
                        Thinking
                      </SparklesText>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-3 border-t">
            <form
              className="flex w-full gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                ref={inputRef}
                placeholder="Type your message..."
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotPopup;
