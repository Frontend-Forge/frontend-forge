import React from "react";
import { SparklesCore } from "@workspace/ui/components/ui/sparkles";

export default function Footer() {
  return (
    <footer className="py-12 mt-14 w-full px-6 bg-white dark:bg-[#18181B] border-t border-gray-200 dark:border-[#27272A]">
      <div className="max-w-7xl mx-auto">
        <div className="h-[18rem] w-full bg-white dark:bg-[#18181B] flex flex-col items-center justify-center overflow-hidden rounded-md relative">
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-black dark:text-white relative z-20 animate-pulse">
            Frontend Forge
          </h1>
          <div className="w-[40rem] h-40 relative">
            {/* Enhanced Gradients with animation */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm animate-pulse" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div
              className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Additional moving gradient lines */}
            <div
              className="absolute inset-x-10 top-5 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[1px] w-2/3 blur-sm opacity-60 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute inset-x-32 top-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[1px] w-1/3 blur-sm opacity-40 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#6B7280"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-white dark:bg-[#18181B] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>

        {/* Bottom area with social links and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/pratiyank"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                width="25"
                height="25"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Frontend-Forge/frontend-forge"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mt-[2px]"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/pratiyank"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mt-[2px]"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22,4.9c-0.8,0.3-1.6,0.6-2.5,0.7c0.9-0.5,1.6-1.4,1.9-2.4c-0.8,0.5-1.8,0.9-2.7,1.1C17.8,3.5,16.6,3,15.3,3 c-2.5,0-4.5,2-4.5,4.5c0,0.4,0,0.7,0.1,1c-3.7-0.2-7-2-9.2-4.7C1.2,4.5,1,5.2,1,6c0,1.6,0.8,2.9,2,3.7C2.2,9.7,1.5,9.5,0.9,9.1 c0,0,0,0,0,0.1c0,2.2,1.6,4,3.6,4.4c-0.4,0.1-0.8,0.2-1.2,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,1.8,2.2,3.1,4.1,3.1 c-1.5,1.2-3.4,1.9-5.5,1.9c-0.4,0-0.7,0-1.1-0.1c2,1.3,4.3,2,6.8,2c8.1,0,12.6-6.7,12.6-12.6c0-0.2,0-0.4,0-0.6 C20.6,6.5,21.4,5.7,22,4.9z" />
              </svg>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 Pratiyank. All rights reserved.
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Privacy Policy
            </a>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
