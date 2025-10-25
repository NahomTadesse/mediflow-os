import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "../../mediflow-os/src/components/ui/sonner";
import { TooltipProvider } from "../../mediflow-os/src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import Laboratory from "./pages/Laboratory";
import HR from "./pages/HR";
import Finance from "./pages/Finance";
import Analytics from "./pages/Analytics";
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
            <Route path="/records" element={<MedicalRecords />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/laboratory" element={<Laboratory />} />
            <Route path="/hr" element={<HR />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/analytics" element={<Analytics />} />
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
