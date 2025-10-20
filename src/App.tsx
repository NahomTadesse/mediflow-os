import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/records"
              element={
                <ComingSoon
                  title="Medical Records"
                  description="Centralized electronic health records management"
                />
              }
            />
            <Route
              path="/billing"
              element={
                <ComingSoon
                  title="Billing & Invoicing"
                  description="Manage invoices, payments, and insurance claims"
                />
              }
            />
            <Route
              path="/inventory"
              element={
                <ComingSoon
                  title="Inventory Management"
                  description="Track medical supplies, drugs, and equipment"
                />
              }
            />
            <Route
              path="/laboratory"
              element={
                <ComingSoon
                  title="Laboratory Information System"
                  description="Manage lab tests, samples, and results"
                />
              }
            />
            <Route
              path="/hr"
              element={
                <ComingSoon
                  title="Human Resources"
                  description="Staff management, scheduling, and payroll"
                />
              }
            />
            <Route
              path="/finance"
              element={
                <ComingSoon
                  title="Finance & Accounting"
                  description="Financial tracking, budgeting, and reports"
                />
              }
            />
            <Route
              path="/analytics"
              element={
                <ComingSoon
                  title="Analytics & Reports"
                  description="Data insights and performance metrics"
                />
              }
            />
            <Route
              path="/notifications"
              element={
                <ComingSoon
                  title="Notifications"
                  description="System alerts and communications"
                />
              }
            />
            <Route
              path="/settings"
              element={
                <ComingSoon title="Settings" description="System configuration and preferences" />
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
