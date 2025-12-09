import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main Content - Takes remaining space */}
      <main className="flex-1 min-h-screen bg-background">
        <div className="p-6 md:p-8 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
