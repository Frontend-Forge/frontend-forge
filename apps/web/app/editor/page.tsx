"use client";

import Editor from "@workspace/editor/components/Editor";
import { question } from "@workspace/editor/data/questions";

export default function Page() {
  return <Editor question={question} />;
}
