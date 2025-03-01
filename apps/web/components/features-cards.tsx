"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { motion } from "framer-motion";

export default function FeatureCards() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row gap-8 p-4 max-w-6xl mx-auto relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Foggy cursor effect with multiple layers - yellow in light mode, white in dark mode */}
      {isHovering && (
        <>
          {/* Base layer - largest and most blurred */}
          <motion.div
            className="pointer-events-none absolute bg-yellow-100/30 dark:bg-white/5 rounded-full blur-3xl z-50"
            animate={{
              x: mousePosition.x - 100,
              y: mousePosition.y - 100,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 200,
              mass: 0.5,
            }}
            style={{
              width: "200px",
              height: "200px",
              filter: "blur(40px)",
            }}
          />
          {/* Middle layer - medium blur */}
          <motion.div
            className="pointer-events-none absolute bg-yellow-100/20 z-50 dark:bg-white/4 rounded-full blur-2xl"
            animate={{
              x: mousePosition.x - 75,
              y: mousePosition.y - 75,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 250,
              mass: 0.4,
            }}
            style={{
              width: "150px",
              height: "150px",
              filter: "blur(25px)",
            }}
          />
          {/* Top layer - smallest and sharpest */}
          <motion.div
            className="pointer-events-none absolute z-50 bg-yellow-50/10 dark:bg-white/3 rounded-full blur-xl"
            animate={{
              x: mousePosition.x - 50,
              y: mousePosition.y - 50,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              mass: 0.3,
            }}
            style={{
              width: "100px",
              height: "100px",
              filter: "blur(15px)",
            }}
          />
        </>
      )}

      {/* Card 1 - Run your code */}
      <Card className="flex-1 bg-gray-50 dark:bg-transparent border-0 rounded-lg overflow-hidden dark:before:content-[''] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-br dark:before:from-[#232327] dark:before:to-[#28282D] dark:before:rounded-lg dark:before:z-0 relative">
        <CardContent className="p-6 flex flex-col h-full relative z-10">
          <div className="flex-1 mb-6">
            <div className="bg-white dark:bg-[#25252A]/90 rounded-lg p-4 relative">
              {/* Header dots */}
              <div className="flex gap-1 mb-3">
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="ml-4 w-32 h-2 bg-gray-200 dark:bg-[#36363D] rounded-full"></div>
              </div>

              {/* Code illustration */}
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-[#36363D] rounded"></div>
                  <div className="w-4 h-4 bg-gray-200 dark:bg-[#36363D] rounded"></div>
                  <div className="w-4 h-4 bg-gray-200 dark:bg-[#36363D] rounded"></div>
                  <div className="w-4 h-4 bg-gray-200 dark:bg-[#36363D] rounded"></div>
                  <div className="w-4 h-4 bg-gray-200 dark:bg-[#36363D] rounded"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-[#36363D] rounded-full"></div>
                  <div className="w-24 h-2 bg-gray-200 dark:bg-[#36363D] rounded-full"></div>
                  <div className="w-20 h-2 bg-gray-200 dark:bg-[#36363D] rounded-full"></div>
                  <div className="w-28 h-2 bg-gray-200 dark:bg-[#36363D] rounded-full"></div>
                  <div className="w-12 h-2 bg-gray-200 dark:bg-[#36363D] rounded-full"></div>
                </div>
                <div className="border border-gray-200 dark:border-[#3A3A42] rounded p-2 w-16">
                  <div className="w-10 h-2 bg-gray-300 dark:bg-[#45454D] rounded-full mb-2"></div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-[#45454D]"></div>
                    <div className="w-6 h-1 bg-gray-200 dark:bg-[#36363D] rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-[#45454D]"></div>
                    <div className="w-6 h-1 bg-gray-200 dark:bg-[#36363D] rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-[#45454D]"></div>
                    <div className="w-6 h-1 bg-gray-200 dark:bg-[#36363D] rounded-full"></div>
                  </div>
                  <div className="w-8 h-2 bg-gray-200 dark:bg-[#36363D] rounded-full mt-2"></div>
                </div>
              </div>

              {/* Yellow button */}
              <div className="absolute bottom-2 right-2 bg-yellow-300 dark:bg-yellow-500/90 rounded px-2 py-0.5 flex items-center">
                <div className="w-2 h-2 bg-black dark:bg-gray-900 rounded-full mr-1"></div>
                <div className="w-4 h-1 bg-black dark:bg-gray-900 rounded-full"></div>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Run your code against tests and instantly preview your output
          </h3>
        </CardContent>
      </Card>

      {/* Card 2 - Resize workspace */}
      <Card className="flex-1 bg-gray-50 dark:bg-transparent border-0 rounded-lg overflow-hidden dark:before:content-[''] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-br dark:before:from-[#232327] dark:before:to-[#28282D] dark:before:rounded-lg dark:before:z-0 relative">
        <CardContent className="p-6 flex flex-col h-full relative z-10">
          <div className="flex-1 mb-6">
            <div className="bg-white dark:bg-[#27272C]/90 rounded-lg p-4 relative">
              {/* Header dots */}
              <div className="flex gap-1 mb-3">
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="ml-4 w-32 h-2 bg-gray-200 dark:bg-[#38383F] rounded-full"></div>
              </div>

              {/* Workspace illustration */}
              <div className="flex mt-8 relative">
                <div className="flex flex-col gap-2 ml-8">
                  <div className="w-16 h-2 bg-gray-400 dark:bg-[#45454D] rounded-full"></div>
                  <div className="w-24 h-2 bg-gray-300 dark:bg-[#38383F] rounded-full"></div>
                  <div className="w-20 h-2 bg-gray-300 dark:bg-[#38383F] rounded-full"></div>
                </div>

                {/* Draggable panel */}
                <div className="absolute right-12 top-0 bottom-0 flex items-center">
                  <div className="h-16 w-px bg-gray-300 dark:bg-[#3A3A42] relative">
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-400 dark:bg-[#45454D] border border-gray-300 dark:border-[#3A3A42]"></div>
                  </div>
                </div>

                {/* Resizable panel */}
                <div className="absolute right-0 top-0 w-32 h-24 bg-gray-200 dark:bg-[#36363D] rounded-lg shadow-sm">
                  <div className="border-2 border-dashed border-gray-300 dark:border-[#3A3A42] absolute -right-4 -bottom-4 w-full h-full rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Resize and customize the workspace as you like
          </h3>
        </CardContent>
      </Card>

      {/* Card 3 - Syntax highlighting - Improved */}
      <Card className="flex-1 bg-gray-50 dark:bg-transparent border-0 rounded-lg overflow-hidden dark:before:content-[''] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-br dark:before:from-[#28282D] dark:before:to-[#2E2E32] dark:before:rounded-lg dark:before:z-0 relative">
        <CardContent className="p-6 flex flex-col h-full relative z-10">
          <div className="flex-1 mb-6">
            <div className="bg-white dark:bg-[#29292E]/90 rounded-lg p-4">
              {/* Keyboard illustration - Improved to match design */}
              <div className="flex flex-col gap-1">
                {/* First row of keys */}
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md bg-gray-100 dark:bg-[#313136] flex items-center justify-center"
                    >
                      <div className="w-1 h-1 bg-gray-300 dark:bg-[#45454D] rounded-full"></div>
                    </div>
                  ))}
                </div>

                {/* Second row of keys */}
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-md flex items-center justify-center ${
                        i === 2
                          ? "bg-white dark:bg-[#38383F] text-black dark:text-white font-semibold border border-gray-200 dark:border-[#45454D]"
                          : "bg-gray-100 dark:bg-[#313136]"
                      }`}
                    >
                      {i === 2 ? (
                        "D"
                      ) : (
                        <div className="w-1 h-1 bg-gray-300 dark:bg-[#45454D] rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Third row of keys */}
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md bg-gray-100 dark:bg-[#313136] flex items-center justify-center"
                    >
                      <div className="w-1 h-1 bg-gray-300 dark:bg-[#45454D] rounded-full"></div>
                    </div>
                  ))}
                </div>

                {/* Space bar row */}
                <div className="grid grid-cols-7 gap-1 mt-1">
                  <div className="aspect-square rounded-md bg-gray-100 dark:bg-[#313136] flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-300 dark:bg-[#45454D] rounded-full"></div>
                  </div>
                  <div className="col-span-5 rounded-md bg-gray-100 dark:bg-[#313136] flex items-center justify-center h-8">
                    <div className="w-1 h-1 bg-gray-300 dark:bg-[#45454D] rounded-full"></div>
                  </div>
                  <div className="aspect-square rounded-md bg-gray-100 dark:bg-[#313136] flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-300 dark:bg-[#45454D] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Syntax highlighting, theming and shortcuts
          </h3>
        </CardContent>
      </Card>
    </div>
  );
}
