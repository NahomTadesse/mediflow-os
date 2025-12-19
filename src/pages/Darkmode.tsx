"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="fixed top-2 right-12 z-50">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
        aria-label="Toggle theme"
      >
        <div
          className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 
                       dark:from-blue-500 dark:to-purple-600 
                       rounded-full blur opacity-30 
                       transition-all duration-500"
        ></div>

        <div className="relative w-5 h-5 md:w-5 md:h-5">
          {" "}
          <div
            className={`absolute inset-0 rounded-full border-2 
                         ${
                           isDark ? "border-blue-400/50" : "border-amber-300/50"
                         }
                         transition-all duration-500
                         ${isHovered ? "scale-110" : "scale-100"}`}
          ></div>
          <div
            className={`absolute inset-1 rounded-full 
                         ${
                           isDark
                             ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                             : "bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100"
                         }
                         shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]
                         flex items-center justify-center
                         transition-all duration-500
                         ${isHovered ? "scale-95" : "scale-100"}`}
          >
            <div
              className={`absolute inset-3 rounded-full 
                           ${
                             isDark
                               ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20"
                               : "bg-gradient-to-br from-amber-300/20 to-orange-300/20"
                           } blur-sm`}
            ></div>

            <div className="relative w-6 h-6 md:w-7 md:h-7">
              <div
                className={`absolute inset-0 transition-all duration-700
                             ${
                               isDark
                                 ? "opacity-0 rotate-180 scale-0"
                                 : "opacity-100 rotate-0 scale-100"
                             }`}
              >
                <Sun className="w-full h-full text-amber-600" />
                <div className="absolute inset-0 animate-pulse">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-amber-400/50 rounded-full"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${
                          i * 90
                        }deg) translateY(-10px)`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              <div
                className={`absolute inset-0 transition-all duration-700
                             ${
                               isDark
                                 ? "opacity-100 rotate-0 scale-100"
                                 : "opacity-0 -rotate-180 scale-0"
                             }`}
              >
                <Moon className="w-full h-full text-blue-300" />
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-blue-200 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-blue-200 rounded-full animate-ping delay-300"></div>
              </div>
            </div>

            <div
              className="absolute top-1 right-3 w-3 h-1 rounded-full 
                           bg-white/30 dark:bg-gray-300/30 
                           blur-sm"
            ></div>
          </div>
        </div>
      </button>
    </div>
  );
}
