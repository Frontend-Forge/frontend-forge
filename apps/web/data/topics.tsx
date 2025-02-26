import {
  Accessibility,
  FileCode,
  FormInput,
  GitBranch,
  LayoutGrid,
  MonitorSmartphone,
  Network,
  RefreshCcw,
} from "lucide-react";

export interface TopicCard {
  icon: JSX.Element;
  title: string;
  questions: number;
  href: string;
}

export const topics: TopicCard[] = [
  {
    icon: <Accessibility className="h-6 w-6 text-black" />,
    title: "Accessibility",
    questions: 12,
    href: "/accessibility",
  },
  {
    icon: <RefreshCcw className="h-6 w-6 text-black" />,
    title: "Async Operations",
    questions: 33,
    href: "/async",
  },
  {
    icon: <Network className="h-6 w-6 text-black" />,
    title: "Data Structures & Algorithms",
    questions: 22,
    href: "/dsa",
  },
  {
    icon: <LayoutGrid className="h-6 w-6 text-black" />,
    title: "Design System Components",
    questions: 15,
    href: "/design-system",
  },
  {
    icon: <MonitorSmartphone className="h-6 w-6 text-black" />,
    title: "DOM Manipulation",
    questions: 10,
    href: "/dom",
  },
  {
    icon: <FormInput className="h-6 w-6 text-black" />,
    title: "Forms",
    questions: 10,
    href: "/forms",
  },
  {
    icon: <GitBranch className="h-6 w-6 text-black" />,
    title: "State Management",
    questions: 17,
    href: "/state",
  },
];
