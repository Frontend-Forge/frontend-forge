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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

interface File {
  name: string;
  language: "javascript" | "css" | "html";
  content: string;
}

interface EditorProps {
  initialFiles?: File[];
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

const defaultVanillaFiles: File[] = [
  {
    name: "index.html",
    language: "html",
    content:
      '<!DOCTYPE html>\n<html>\n<head>\n  <title>Vanilla JS App</title>\n</head>\n<body>\n  <div id="app"></div>\n</body>\n</html>',
  },
  { name: "style.css", language: "css", content: "" },
  { name: "index.js", language: "javascript", content: "" },
];

const defaultReactFiles: File[] = [
  {
    name: "public/index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html>
<head>
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  },
  {
    name: "src/App.js",
    language: "javascript",
    content: `function App() {
  return (
    <div>
      <h1>Hello from React!</h1>
    </div>
  );
}`,
  },
  {
    name: "src/index.js",
    language: "javascript",
    content: `const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  { name: "src/style.css", language: "css", content: "" },
];

const Editor: React.FC<EditorProps> = ({ initialFiles }) => {
  const [environment, setEnvironment] = useState<Environment>("vanilla");
  const [environmentFiles, setEnvironmentFiles] = useState<EnvironmentFiles>({
    vanilla: initialFiles || defaultVanillaFiles,
    react: defaultReactFiles,
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
    const currentFiles = getCurrentFiles();
    const initialContents = currentFiles.reduce(
      (acc, file) => ({ ...acc, [file.name]: file.content }),
      {} as Record<string, string>
    );
    setFileContents(initialContents);
    currentFiles[0] && setActiveFile(currentFiles[0]);
  }, [environment]);

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
    <div className="flex flex-col w-full h-screen bg-[#1e1e1e] text-gray-300">
      <div className="flex flex-1 min-h-0">
        {/* Left Panel */}
        <div className="flex flex-col w-1/2 border-r border-gray-800">
          {/* File Explorer */}
          <div className="flex items-center h-10 bg-[#1e1e1e] border-b border-gray-800">
            <div className="flex items-center px-4 space-x-2">
              <FolderOpen className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">File explorer</span>
            </div>

            <Select value={environment} onValueChange={handleEnvironmentChange}>
              <SelectTrigger className="w-[180px] h-[30px] bg-[#1e1e1e] border-b border-gray-800">
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vanilla">Vanilla JavaScript</SelectItem>
                <SelectItem value="react">React</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tab Bar */}
          <div className="flex flex-wrap bg-[#252526] border-b border-gray-800">
            {getCurrentFiles().map((file) => (
              <button
                key={file.name}
                className={cn(
                  "px-4 py-2 text-sm flex items-center gap-2",
                  activeFile && activeFile.name === file.name
                    ? "bg-[#1e1e1e] text-white"
                    : "text-gray-400 hover:bg-[#2d2d2d]"
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
                  theme="vs-dark"
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
        <div className="flex flex-col w-1/2">
          {/* Browser Top Bar */}
          <div className="flex items-center h-10 px-4 bg-[#1e1e1e] border-b border-gray-800 justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Browser</span>
            </div>
            <input
              value={"/"}
              className="w-[70%] pl-6 bg-[#252525] rounded-full"
              disabled={true}
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowTerminal(!showTerminal)}
                className="p-1.5 hover:bg-[#2d2d2d] rounded text-gray-400"
              >
                <Terminal className="w-4 h-4" />
              </button>
              <button
                onClick={handleRefresh}
                className="p-1.5 hover:bg-[#2d2d2d] rounded text-gray-400"
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
            <div className="h-[30%] bg-[#1e1e1e] border-t border-gray-800">
              <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
                <span className="text-sm text-gray-300">Console</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearConsole}
                    className="p-1 hover:bg-[#2d2d2d] rounded text-gray-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowTerminal(false)}
                    className="p-1 hover:bg-[#2d2d2d] rounded text-gray-400"
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
                    <span className="text-gray-500 mr-2">{log.timestamp}</span>
                    {log.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
