// pages/NotFound.tsx
"use client";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon + 404 */}
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-6xl sm:text-8xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            Oops! Page not found
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action */}
        <Button asChild size="lg" className="mt-6">
          <a href="/">
            <Home className="mr-2 h-5 w-5" />
            Return to Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
