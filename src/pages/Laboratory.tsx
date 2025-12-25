// pages/Laboratory.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  FlaskConical,
  Send,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockTests = [
  {
    id: "LAB-2025-001",
    patientName: "John Doe",
    patientId: "P-12345",
    testType: "Complete Blood Count",
    requestedBy: "Dr. Sarah Wilson",
    requestDate: "2025-10-18",
    status: "Completed",
    priority: "Normal",
    results: "Available",
  },
  {
    id: "LAB-2025-002",
    patientName: "Jane Smith",
    patientId: "P-12346",
    testType: "Lipid Panel",
    requestedBy: "Dr. Michael Chen",
    requestDate: "2025-10-18",
    status: "In Progress",
    priority: "Normal",
    results: "Pending",
  },
  {
    id: "LAB-2025-003",
    patientName: "Robert Johnson",
    patientId: "P-12347",
    testType: "Chest X-Ray",
    requestedBy: "Dr. Emily Brown",
    requestDate: "2025-10-17",
    status: "Completed",
    priority: "Urgent",
    results: "Available",
  },
  {
    id: "LAB-2025-004",
    patientName: "Mary Davis",
    patientId: "P-12348",
    testType: "Urinalysis",
    requestedBy: "Dr. Sarah Wilson",
    requestDate: "2025-10-17",
    status: "Scheduled",
    priority: "Normal",
    results: "Not Started",
  },
  {
    id: "LAB-2025-005",
    patientName: "Tom Clark",
    patientId: "P-12349",
    testType: "MRI Brain",
    requestedBy: "Dr. Raj Patel",
    requestDate: "2025-10-16",
    status: "Scheduled",
    priority: "Urgent",
    results: "Not Started",
  },
  {
    id: "LAB-2025-006",
    patientName: "Lisa Anderson",
    patientId: "P-12350",
    testType: "Thyroid Function",
    requestedBy: "Dr. Michael Chen",
    requestDate: "2025-10-15",
    status: "In Progress",
    priority: "Normal",
    results: "Pending",
  },
];

const stats = [
  { title: "Tests Today", value: "47", change: "+8 from yesterday" },
  { title: "In Progress", value: "23", change: "4 urgent" },
  { title: "Pending Results", value: "15", change: "2 overdue" },
  { title: "Completed", value: "1,284", change: "This month" },
];

const recentAlerts = [
  { title: "New Lab Report Ready", time: "10 min ago", type: "info" },
  { title: "Test Completed", time: "30 min ago", type: "success" },
  { title: "Urgent Test Scheduled", time: "1 hour ago", type: "warning" },
];

export default function Laboratory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests = mockTests.filter(
    (test) =>
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <header className="hidden lg:block mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Laboratory Information System
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  Manage lab tests, samples, and results
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-2xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Laboratory
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Manage lab tests & results
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
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                        {stat.title}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search & Tests Table */}
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <CardTitle className="text-base sm:text-lg dark:text-white">
                      Lab Tests
                    </CardTitle>
                    <div className="flex w-full sm:w-auto gap-3">
                      <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search by patient, test ID, or type..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-full sm:w-64 dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          New Test
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            Test ID
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            Patient
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">
                            Test Type
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                            Doctor
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                            Priority
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTests.map((test) => (
                          <tr
                            key={test.id}
                            className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <td className="py-3 px-4 text-xs sm:text-sm font-medium dark:text-white">
                              {test.id}
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium text-xs sm:text-sm dark:text-white">
                                  {test.patientName}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {test.patientId}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-xs sm:text-sm dark:text-white hidden md:table-cell">
                              {test.testType}
                            </td>
                            <td className="py-3 px-4 text-xs sm:text-sm dark:text-white hidden lg:table-cell">
                              {test.requestedBy}
                            </td>
                            <td className="py-3 px-4 text-xs sm:text-sm dark:text-white">
                              {test.requestDate}
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <Badge
                                className={`text-xs ${
                                  test.priority === "Urgent"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                }`}
                              >
                                {test.priority}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                className={`text-xs ${
                                  test.status === "Completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : test.status === "In Progress"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                }`}
                              >
                                {test.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs dark:border-gray-700"
                                >
                                  <FlaskConical className="h-3 w-3 mr-1" />
                                  <span className="hidden sm:inline">View</span>
                                </Button>
                                {test.results === "Available" && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 dark:hover:bg-gray-700"
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Recent Alerts */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 dark:text-white">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
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
                          className={`text-xs ${
                            alert.type === "success"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : alert.type === "warning"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
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
