import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main
        className={cn(
          "flex-1 p-3 sm:p-4 md:p-6 transition-all duration-300",
          isMobile ? "ml-0" : "-ml-24"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};
