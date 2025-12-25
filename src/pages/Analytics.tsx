"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Download,
  Bell,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Activity,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stats = [
  {
    title: "Total Patients",
    value: "8,547",
    change: "+12.5% from last month",
    icon: Users,
  },
  {
    title: "Appointments",
    value: "2,847",
    change: "+8.2% growth",
    icon: Calendar,
  },
  {
    title: "Revenue",
    value: "$1.28M",
    change: "+18.4% increase",
    icon: DollarSign,
  },
  {
    title: "Growth Rate",
    value: "23.1%",
    change: "+4.3% points",
    icon: TrendingUp,
  },
];

const recentAlerts = [
  { title: "New Analytics Report", time: "5 min ago", type: "info" },
  { title: "Revenue Peak Detected", time: "30 min ago", type: "success" },
  { title: "Patient Flow Alert", time: "1 hour ago", type: "warning" },
];

const kpiMetrics = [
  {
    name: "Patient Satisfaction",
    value: "94.5%",
    description: "Based on 2,847 surveys",
    trend: "up",
  },
  {
    name: "Average Wait Time",
    value: "18 min",
    description: "For appointments",
    trend: "down",
  },
  {
    name: "Bed Occupancy Rate",
    value: "82%",
    description: "Current utilization",
    trend: "stable",
  },
  {
    name: "Staff Efficiency",
    value: "8.4",
    description: "Patients per staff",
    trend: "up",
  },
];

const departmentPerformance = [
  { name: "Cardiology", patients: 1240, growth: "+12%", efficiency: "92%" },
  { name: "Emergency", patients: 980, growth: "+18%", efficiency: "88%" },
  { name: "Pediatrics", patients: 1560, growth: "+8%", efficiency: "94%" },
  { name: "Orthopedics", patients: 890, growth: "+15%", efficiency: "85%" },
  { name: "Dermatology", patients: 670, growth: "+5%", efficiency: "78%" },
];

const revenueTrends = [
  { month: "May", revenue: 184500, patients: 324 },
  { month: "Jun", revenue: 225800, patients: 398 },
  { month: "Jul", revenue: 198400, patients: 445 },
  { month: "Aug", revenue: 267300, patients: 512 },
  { month: "Sep", revenue: 245600, patients: 478 },
  { month: "Oct", revenue: 284500, patients: 589 },
];

export default function Analytics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system dark mode preference
  useEffect(() => {
    // Check if dark mode is stored in localStorage
    const savedTheme = localStorage.getItem("theme");

    // Check system preference
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Set initial theme
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const filteredDepartments = departmentPerformance.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="hidden lg:block mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Analytics & Reports
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  Data insights and performance metrics
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-2xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Analytics
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Data insights & metrics
                </p>
              </div>
            </div>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat) => (
                  <Card
                    key={stat.title}
                    className="dark:bg-gray-900 dark:border-gray-800"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                          {stat.title}
                        </p>
                        <div className="p-1.5 bg-primary/10 dark:bg-primary/20 rounded-md">
                          <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary dark:text-primary-400" />
                        </div>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 dark:text-white">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {stat.change}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search & Analytics Tabs */}
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search departments or metrics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList className="grid grid-cols-2 sm:grid-cols-4 dark:bg-gray-800">
                      <TabsTrigger
                        value="overview"
                        className="dark:data-[state=active]:bg-gray-700"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="departments"
                        className="dark:data-[state=active]:bg-gray-700"
                      >
                        Departments
                      </TabsTrigger>
                      <TabsTrigger
                        value="financial"
                        className="dark:data-[state=active]:bg-gray-700"
                      >
                        Financial
                      </TabsTrigger>
                      <TabsTrigger
                        value="performance"
                        className="dark:data-[state=active]:bg-gray-700"
                      >
                        Performance
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      {/* KPI Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {kpiMetrics.map((kpi) => (
                          <Card
                            key={kpi.name}
                            className="dark:bg-gray-900 dark:border-gray-800"
                          >
                            <CardContent className="p-4 sm:p-6">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-sm sm:text-base dark:text-white">
                                    {kpi.name}
                                  </h3>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">
                                    {kpi.description}
                                  </p>
                                </div>
                                <Badge
                                  className={
                                    kpi.trend === "up"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : kpi.trend === "down"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  }
                                >
                                  {kpi.trend}
                                </Badge>
                              </div>
                              <p className="text-xl sm:text-2xl font-bold mt-2 dark:text-white">
                                {kpi.value}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Revenue Trends */}
                      <Card className="dark:bg-gray-900 dark:border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-base sm:text-lg dark:text-white">
                            Revenue Trends (Last 6 Months)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {revenueTrends.map((month, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <div>
                                  <h3 className="font-semibold text-sm sm:text-base dark:text-white">
                                    {month.month}
                                  </h3>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">
                                    {month.patients} patients
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-sm sm:text-base dark:text-white">
                                    ${(month.revenue / 1000).toFixed(0)}K
                                  </p>
                                  <p className="text-xs text-primary dark:text-primary-300">
                                    Revenue
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="departments" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredDepartments.map((dept) => (
                          <Card
                            key={dept.name}
                            className="dark:bg-gray-900 dark:border-gray-800"
                          >
                            <CardContent className="p-4 sm:p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="font-semibold text-base sm:text-lg dark:text-white">
                                    {dept.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Department Performance
                                  </p>
                                </div>
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  {dept.growth}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <div>Total Patients</div>
                                <div className="text-right dark:text-white">
                                  {dept.patients}
                                </div>
                                <div>Efficiency</div>
                                <div className="text-right dark:text-white">
                                  {dept.efficiency}
                                </div>
                              </div>

                              <div className="flex gap-2 mt-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                                >
                                  View Details
                                </Button>
                                <Button size="sm" className="flex-1">
                                  Generate Report
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Only Recent Alerts */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 dark:text-white">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-medium dark:text-white">
                            {alert.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {alert.time}
                          </p>
                        </div>
                        <Badge
                          variant={alert.type as any}
                          className="text-xs dark:bg-opacity-30"
                        >
                          {alert.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
