"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
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
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg 
                 bg-white dark:bg-gray-800 
                 text-gray-600 dark:text-gray-300 
                 shadow-md hover:shadow-lg 
                 transition-all duration-300 
                 border border-gray-200 dark:border-gray-700"
        aria-label="Toggle dark mode"
      >
        <Sun
          className={`h-5 w-5 transition-all duration-500 ${
            isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute h-5 w-5 transition-all duration-500 ${
            isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
          }`}
        />
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}
