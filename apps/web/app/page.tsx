"use client";

import Editor from "@workspace/editor/components/Editor";

interface File {
  name: string;
  language: "javascript" | "css" | "html";
  content: string;
}
const files: File[] = [
  {
    name: "index.html",
    language: "html",
    content: "<div id='app'>Hello World</div>",
  },
  {
    name: "style.css",
    language: "css",
    content: "#app { color: blue; }",
  },
  {
    name: "index.js",
    language: "javascript",
    content:
      "console.log('Hello from JS!'); document.getElementById('app').style.fontSize = '24px';",
  },
];

export default function Page() {
  return (
    <div className="h-screen">
      <Editor initialFiles={files} />
    </div>
  );
}
