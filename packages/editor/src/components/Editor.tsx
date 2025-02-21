"use client";

import React, { useState, useEffect, useRef } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { cn } from "@workspace/ui/lib/utils";
import {
  RefreshCw,
  Terminal,
  X,
  Trash2,
  FolderOpen,
  Globe,
  Lightbulb,
  FileText,
  TestTube,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import SplitComponent from "react-split";
import TechLogoComponent from "@workspace/editor/components/TechLogo";
import CompanyLogo from "@workspace/editor/components/Companies";
import { Question } from "@workspace/editor/data/questions";
import { Button } from "@workspace/ui/components/button";

const Split = SplitComponent as unknown as React.ComponentType<{
  className?: string;
  sizes?: number[];
  minSize?: number;
  gutterSize?: number;
  snapOffset?: number;
  children: React.ReactNode;
}>;

interface File {
  name: string;
  language: "javascript" | "css" | "html";
  content: string;
}

type CommonInput = number[] | string | number | object;
type CommonOutput = number | boolean | string | number[] | object;
type TestCases = {
  input: CommonInput; // More specific but still flexible input types
  output: CommonOutput; // More specific but still flexible output types
  description: string; // Description of the test case
};

type ResultTest = TestCases & {
  passed: boolean;
  actual: number | boolean | string | number[] | object;
  expected: number | boolean | string | number[] | object;
};

interface EditorProps {
  question: Question;
  setCode: (code: string | undefined) => void;
  testCases: ResultTest[] | undefined;
}

interface ConsoleLog {
  type: "log" | "error" | "warn";
  message: string;
  timestamp: string;
}

type Environment = "vanilla" | "react";

interface EnvironmentFiles {
  vanilla: File[];
  react: File[];
}

const Editor: React.FC<EditorProps> = ({ question, setCode, testCases }) => {
  const {
    initialVanillaFiles,
    initialReactFiles,
    solutionReactFiles,
    solutionVanillaFiles,
    questionDetails,
  } = question;

  // Keep track of user's edited files separately from initial files
  const [editedVanillaFiles, setEditedVanillaFiles] =
    useState<File[]>(initialVanillaFiles);
  const [editedReactFiles, setEditedReactFiles] =
    useState<File[]>(initialReactFiles);

  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [environment, setEnvironment] = useState<Environment>("vanilla");
  const [environmentFiles, setEnvironmentFiles] = useState<EnvironmentFiles>({
    vanilla: showSolution ? solutionVanillaFiles : editedVanillaFiles,
    react: showSolution ? solutionReactFiles : editedReactFiles,
  });
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [showTerminal, setShowTerminal] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Get current files based on environment and solution state
  const getCurrentFiles = () => {
    if (showSolution) {
      return environment === "vanilla"
        ? solutionVanillaFiles
        : solutionReactFiles;
    }
    return environment === "vanilla" ? editedVanillaFiles : editedReactFiles;
  };

  // Update environment files when solution toggle changes
  useEffect(() => {
    setEnvironmentFiles({
      vanilla: showSolution ? solutionVanillaFiles : editedVanillaFiles,
      react: showSolution ? solutionReactFiles : editedReactFiles,
    });
  }, [showSolution, editedVanillaFiles, editedReactFiles]);

  useEffect(() => {
    const currentFiles = getCurrentFiles();
    const initialContents = currentFiles.reduce(
      (acc, file) => ({ ...acc, [file.name]: file.content }),
      {} as Record<string, string>
    );
    setFileContents(initialContents);

    if (!activeFile) {
      currentFiles[0] && setActiveFile(currentFiles[0]);
    }

    setCode(environmentFiles.vanilla[0]?.content);
  }, [environment, environmentFiles, activeFile]);

  const handleEnvironmentChange = (value: Environment) => {
    // Save current file contents before switching
    if (!showSolution) {
      // Only save if not showing solution
      const currentFiles = getCurrentFiles().map((file) => ({
        ...file,
        content: fileContents[file.name] || file.content,
      }));

      if (environment === "vanilla") {
        setEditedVanillaFiles(currentFiles);
      } else {
        setEditedReactFiles(currentFiles);
      }
    }

    setEnvironment(value);
    setLogs([]);

    const newFiles = environmentFiles[value];
    if (activeFile && newFiles.some((file) => file.name === activeFile.name)) {
      // Keep current activeFile if it exists in new environment
    } else {
      newFiles[0] && setActiveFile(newFiles[0]);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && activeFile && !showSolution) {
      // Only update if not showing solution
      setFileContents((prev) => ({
        ...prev,
        [activeFile.name]: value,
      }));

      const currentFiles = getCurrentFiles().map((file) =>
        file.name === activeFile.name ? { ...file, content: value } : file
      );

      if (environment === "vanilla") {
        setEditedVanillaFiles(currentFiles);
      } else {
        setEditedReactFiles(currentFiles);
      }
    }
  };

  function handleSolution() {
    setShowSolution((prev) => !prev);
  }

  const generateReactIframeContent = () => {
    const htmlContent = fileContents["public/index.html"] || "";
    const appContent = fileContents["src/App.js"] || "";
    const indexContent = fileContents["src/index.js"] || "";
    const cssContent = fileContents["src/style.css"] || "";

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="Content-Security-Policy" 
            content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; 
                    connect-src * 'unsafe-inline' 'unsafe-eval' data: blob:;">
          <style>${cssContent}</style>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
          <script>
            // Set up CORS proxy function
            window.fetchWithProxy = (url, options = {}) => {
              const proxyUrl = 'https://api.allorigins.win/raw?url=';
              return fetch(proxyUrl + encodeURIComponent(url), options)
                .then(response => response)
                .catch(error => {
                  console.error('Proxy fetch error:', error);
                  // Fallback to direct fetch if proxy fails
                  return fetch(url, options);
                });
            };
  
            // Console override for logging
            const originalConsole = window.console;
            window.console = {
              log: (...args) => {
                window.parent.postMessage({
                  type: 'console',
                  logType: 'log',
                  message: args.join(' ')
                }, '*');
                originalConsole.log(...args);
              },
              error: (...args) => {
                window.parent.postMessage({
                  type: 'console',
                  logType: 'error',
                  message: args.join(' ')
                }, '*');
                originalConsole.error(...args);
              },
              warn: (...args) => {
                window.parent.postMessage({
                  type: 'console',
                  logType: 'warn',
                  message: args.join(' ')
                }, '*');
                originalConsole.warn(...args);
              }
            };
  
            window.onerror = (message, source, lineno, colno) => {
              window.parent.postMessage({
                type: 'console',
                logType: 'error',
                message: \`Error: \${message} at line \${lineno}:\${colno}\`
              }, '*');
            };
          </script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel" data-presets="react">
            // Make React and ReactDOM available globally
            const { useState, useEffect } = React;
            
            ${appContent}
            ${indexContent}
          </script>
        </body>
      </html>
    `;
  };

  const generateVanillaIframeContent = () => {
    const htmlContent = fileContents["index.html"] || "";
    const cssContent = fileContents["style.css"] || "";
    const jsContent = fileContents["index.js"] || "";

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="Content-Security-Policy" 
            content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; 
                    connect-src * 'unsafe-inline' 'unsafe-eval' data: blob:;">
          <style>${cssContent}</style>
          <script>
            // Set up CORS proxy function
            window.fetchWithProxy = (url, options = {}) => {
              const proxyUrl = 'https://api.allorigins.win/raw?url=';
              return fetch(proxyUrl + encodeURIComponent(url), options)
                .then(response => response)
                .catch(error => {
                  console.error('Proxy fetch error:', error);
                  // Fallback to direct fetch if proxy fails
                  return fetch(url, options);
                });
            };
  
            // Console override for logging
            const originalConsole = window.console;
            window.console = {
              log: (...args) => {
                window.parent.postMessage({
                  type: 'console',
                  logType: 'log',
                  message: args.join(' ')
                }, '*');
                originalConsole.log(...args);
              },
              error: (...args) => {
                window.parent.postMessage({
                  type: 'console',
                  logType: 'error',
                  message: args.join(' ')
                }, '*');
                originalConsole.error(...args);
              },
              warn: (...args) => {
                window.parent.postMessage({
                  type: 'console',
                  logType: 'warn',
                  message: args.join(' ')
                }, '*');
                originalConsole.warn(...args);
              }
            };
  
            window.onerror = (message, source, lineno, colno) => {
              window.parent.postMessage({
                type: 'console',
                logType: 'error',
                message: \`Error: \${message} at line \${lineno}:\${colno}\`
              }, '*');
            };
          </script>
        </head>
        <body>
          ${htmlContent}
          <script>${jsContent}</script>
        </body>
      </html>
    `;
  };

  const updateIframeContent = () => {
    if (iframeRef.current) {
      const content =
        environment === "vanilla"
          ? generateVanillaIframeContent()
          : generateReactIframeContent();
      iframeRef.current.srcdoc = content;
    }
  };

  useEffect(() => {
    updateIframeContent();
  }, [fileContents, environment]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const setupIframeMessageListener = () => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "console") {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [
          ...prev,
          {
            type: event.data.logType || "log",
            message: event.data.message,
            timestamp,
          },
        ]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  };

  useEffect(setupIframeMessageListener, []);

  const handleRefresh = () => {
    updateIframeContent();
    setLogs([]);
  };

  const handleClearConsole = () => {
    setLogs([]);
  };

  const getLogStyle = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-800";
      case "warn":
        return "text-yellow-800";
      default:
        return "text-black";
    }
  };

  return (
    <div className="flex flex-col fixed top-14 bottom-14 bg-white text-black">
      <div className="flex flex-1 min-h-0">
        <Split
          className="flex w-full"
          sizes={[33, 33, 34]}
          minSize={350}
          gutterSize={4}
          snapOffset={30}
        >
          {/* Left Panel */}
          <div className="flex flex-col border-r gap-4 overflow-x-hidden overflow-y-auto scrollbar-hide border-gray-800">
            <div className="flex flex-row gap-3">
              <button className="flex gap-1 mt-4 ml-8 flex-row items-center justify-center">
                <FileText className="h-4 w-4" />
                <p className="text-[15px] text-black">Description</p>
              </button>
              <button
                onClick={handleSolution}
                className="flex gap-2 mt-4 py-2 px-3 flex-row items-center justify-center rounded-lg transition-all duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <Lightbulb
                  className={`h-4 w-4 ${showSolution ? "text-yellow-500" : "text-black-400"}`}
                />
                <p
                  className={`text-[15px] font-medium ${showSolution ? "text-yellow-500" : "text-black-300"}`}
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </p>
              </button>
            </div>

            <div className="ml-8 flex flex-row items-center gap-6">
              <p className="text-2xl font-bold">{questionDetails.name}</p>
              <div className="text-green-500 px-3 border-green-500 border-[2px] h-[22px] rounded-full -py-[10px] text-[12px]   flex justify-center items-center bg-[#EBFFED]">
                Completed
              </div>
            </div>

            <div className="flex items-center ml-8 gap-4 text-black rounded-2xl w-full max-w-md">
              <div className="flex flex-row flex-1 items-center">
                <img
                  src={questionDetails.questionaerInfo.profilePic}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col ml-4 ">
                  <h2 className="text-[18px] font-semibold">
                    {questionDetails.questionaerInfo.name}
                  </h2>
                  <p className="text-[12px] text-gray-600">
                    {questionDetails.questionaerInfo.additionalInfo}
                  </p>
                </div>

                <TechLogoComponent logos={questionDetails.techStack} />
              </div>
            </div>

            <div className="flex flex-row items-center ml-8 gap-1">
              <div className="flex flex-row items-center gap-1">
                🔥
                <p className="text-sm text-gray-700">
                  {questionDetails.difficulty}
                </p>
              </div>
              <p className="ml-1">|</p>
              <div className="flex flex-row items-center gap-1">
                ⏱️
                <p className="text-sm text-gray-700">
                  {questionDetails.time}:00 mins
                </p>
              </div>
            </div>

            <p className="text-sm w-[90%] text-gray-700 ml-8">
              {questionDetails.questionDescription}
            </p>

            {questionDetails.requirements.length !== 0 && (
              <div className="w-[90%] flex flex-col  ml-8 gap-y-2">
                <p className="font-bold text-2xl">Requirements</p>

                {questionDetails.requirements.map((req, i) => (
                  <p key={i} className="text-sm text-gray-700">
                    &bull; {req}
                  </p>
                ))}
              </div>
            )}
            {questionDetails.notes.length !== 0 && (
              <div className="w-[90%] flex flex-col  ml-8 gap-y-2">
                <p className="font-bold text-2xl">Notes</p>
                {questionDetails.notes.map((req, i) => (
                  <p key={i} className="text-sm text-gray-700">
                    &bull; {req}
                  </p>
                ))}
              </div>
            )}
            <div className="w-[90%] mb-2 flex flex-col  ml-8 gap-y-2">
              <p className="font-bold text-2xl">Companies</p>
              <CompanyLogo companiesArray={questionDetails.companies} />
            </div>
          </div>

          {/* Middle Panel (Editor) */}
          <div className="flex flex-col border-r border-gray-800">
            {/* File Explorer */}
            <div className="flex items-center h-10 bg-white border-b border-gray-800">
              <div className="flex items-center px-4 space-x-2">
                <FolderOpen className="w-4 h-4 text-gray-800" />
                <span className="text-sm text-gray-800">File explorer</span>
              </div>

              {initialReactFiles.length !== 0 && (
                <Select
                  value={environment}
                  onValueChange={handleEnvironmentChange}
                >
                  <SelectTrigger className="w-[180px] h-[30px] bg-white border-b border-gray-300">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vanilla">Vanilla JavaScript</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Tab Bar */}
            <div className="flex flex-wrap bg-white border-b border-gray-300">
              {getCurrentFiles().map((file) => (
                <button
                  key={file.name}
                  className={cn(
                    "px-4 py-2 text-sm flex items-center gap-2",
                    activeFile && activeFile.name === file.name
                      ? "bg-[#1e1e1e] text-white"
                      : "text-gray-800 hover:bg-gray-400"
                  )}
                  onClick={() => setActiveFile(file)}
                >
                  <span>{file.name}</span>
                </button>
              ))}
            </div>

            {/* Editor Area */}
            <div className="flex-1 min-h-0">
              <React.Suspense fallback={<div>Loading editor...</div>}>
                {activeFile && (
                  <MonacoEditor
                    language={activeFile.language}
                    value={fileContents[activeFile.name]}
                    onChange={(value) => handleEditorChange(value)}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineHeight: 21,
                      padding: { top: 16 },
                      wordWrap: "on",
                    }}
                    height="100%"
                  />
                )}
              </React.Suspense>
            </div>
          </div>

          {questionDetails.questionType === "logical" && (
            <div
              className={
                "w-full max-w-3xl mx-auto bg-white rounded-lg shadow-sm border min-h-[600px] flex flex-col"
              }
            >
              <div className="flex items-center gap-4 p-2 border-b">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  ▶ Tests
                </Button>
              </div>

              <div className="divide-y flex-1">
                {(!testCases || testCases.length === 0) && (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <TestTube className="w-8 h-8 text-gray-400" />
                    <p className="text-gray-400 font-bold">
                      Test Cases will appear here
                    </p>
                  </div>
                )}
                {testCases &&
                  testCases.map((test, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-3 p-2 hover:bg-gray-50"
                    >
                      <div className="font-mono text-sm">
                        {test.passed ? "✅" : "❌"}
                        <span className="text-gray-600 ml-2">
                          findDuplicates
                        </span>
                        <span className="text-gray-400 ml-2"> › </span>
                        <span>numbers = {JSON.stringify(test.input)}</span>
                      </div>

                      <div
                        className={`flex-row gap-2 ${test.passed ? "hidden" : "flex"}`}
                      >
                        <span>expected: {JSON.stringify(test.expected)}</span>
                        <span>actual: {JSON.stringify(test.actual)}</span>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex items-center justify-between p-2 border-t mt-auto">
                <div className="flex items-center gap-2">
                  {testCases && (
                    <span className="text-gray-600 text-[14px]">
                      <span>{testCases && testCases.length} Total</span>,{" "}
                      <span className="text-green-600">
                        {testCases &&
                          testCases.filter((test) => test.passed === true)
                            .length}{" "}
                        Passed
                      </span>{" "}
                      <span className="text-red-500">
                        {testCases &&
                          testCases.filter((test) => test.passed === false)
                            .length}{" "}
                        Failed
                      </span>
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2V5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 2V5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M3 8H21" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  View test cases
                </Button>
              </div>
            </div>
          )}

          {/* Right Panel */}
          {questionDetails.questionType === "ui" && (
            <div className={`flex flex-col`}>
              {/* Browser Top Bar */}
              <div className="flex items-center h-10 px-4 bg-white border-b border-gray-300 justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-800" />
                  <span className="text-sm text-gray-800">Browser</span>
                </div>
                <input
                  value={"/"}
                  className="w-[40%] pl-2 text-gray-600 bg-gray-200 rounded-full"
                  disabled={true}
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowTerminal(!showTerminal)}
                    className="p-1.5 hover:bg-gray-200 rounded text-gray-800"
                  >
                    <Terminal className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleRefresh}
                    className="p-1.5 hover:bg-gray-200 rounded text-gray-800"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview Area */}
              <div className="flex-1 bg-white">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-modals"
                  allow="cross-origin-isolated"
                />
              </div>

              {/* Console */}
              {showTerminal && (
                <div className="h-[30%] bg-white border-t border-gray-300">
                  <div className="flex justify-between items-center px-4 border-b border-gray-300">
                    <span className="text-sm text-gray-800">Console</span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleClearConsole}
                        className="p-1 hover:bg-gray-200 rounded text-gray-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowTerminal(false)}
                        className="p-1 hover:bg-gray-200 rounded text-gray-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div
                    ref={consoleRef}
                    className="p-4 text-sm h-[calc(100%-40px)] overflow-auto font-mono"
                  >
                    {logs.map((log, index) => (
                      <div key={index} className={getLogStyle(log.type)}>
                        <span className="text-gray-500 mr-2">
                          {log.timestamp}
                        </span>
                        {log.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Split>
      </div>
    </div>
  );
};

export default Editor;
