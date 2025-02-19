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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import SplitComponent from "react-split";
import TechLogoComponent from "./TechLogo.js";
import CompanyLogo from "./Companies.js";
import { Question } from "@workspace/editor/data/questions.js";

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

interface EditorProps {
  question: Question;
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

const Editor: React.FC<EditorProps> = ({ question }) => {
  const {
    initialVanillaFiles,
    initialReactFiles,
    solutionReactFiles,
    solutionVanillaFiles,
    questionDetails,
  } = question;

  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [environment, setEnvironment] = useState<Environment>("vanilla");
  const [environmentFiles, setEnvironmentFiles] = useState<EnvironmentFiles>({
    vanilla: showSolution ? solutionVanillaFiles : initialVanillaFiles,
    react: showSolution ? solutionReactFiles : initialReactFiles,
  });
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [showTerminal, setShowTerminal] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Get current files based on environment
  const getCurrentFiles = () => environmentFiles[environment];

  useEffect(() => {
    setEnvironmentFiles({
      vanilla: showSolution ? solutionVanillaFiles : initialVanillaFiles,
      react: showSolution ? solutionReactFiles : initialReactFiles,
    });
  }, [showSolution]);

  useEffect(() => {
    const currentFiles = getCurrentFiles();
    const initialContents = currentFiles.reduce(
      (acc, file) => ({ ...acc, [file.name]: file.content }),
      {} as Record<string, string>
    );
    setFileContents(initialContents);
    // Only set activeFile if it's not already set
    if (!activeFile) {
      currentFiles[0] && setActiveFile(currentFiles[0]);
    }
  }, [environment, environmentFiles, activeFile]); // Added activeFile as a dependency to prevent unnecessary resets

  const handleEnvironmentChange = (value: Environment) => {
    // Save current file contents before switching
    const currentFiles = getCurrentFiles().map((file) => ({
      ...file,
      content: fileContents[file.name] || file.content,
    }));

    setEnvironmentFiles((prev) => ({
      ...prev,
      [environment]: currentFiles,
    }));

    // Switch environment
    setEnvironment(value);
    setLogs([]);

    // Preserve activeFile if it exists in the new environment
    const newFiles = environmentFiles[value];
    if (activeFile && newFiles.some((file) => file.name === activeFile.name)) {
      // Keep the current activeFile if it exists in the new environment
    } else {
      // Otherwise, default to the first file in the new environment
      newFiles[0] && setActiveFile(newFiles[0]);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && activeFile) {
      setFileContents((prev) => ({
        ...prev,
        [activeFile.name]: value,
      }));

      // Update the environment files state
      const currentFiles = getCurrentFiles().map((file) =>
        file.name === activeFile.name ? { ...file, content: value } : file
      );

      setEnvironmentFiles((prev) => ({
        ...prev,
        [environment]: currentFiles,
      }));
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
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      default:
        return "text-white";
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

          {/* Right Panel */}
          <div className="flex flex-col">
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
                      <span className="text-gray-800 mr-2">
                        {log.timestamp}
                      </span>
                      <span className="text-gray-800">button</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Split>
      </div>
    </div>
  );
};

export default Editor;
