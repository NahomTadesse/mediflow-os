// pages/HR.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Users,
  Clock,
  UserPlus,
  TrendingUp,
  AlertCircle,
  Eye,
  Pencil,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockStaff = [
  {
    id: "EMP-001",
    name: "Dr. Sarah Wilson",
    avatar: "SW",
    role: "Chief Medical Officer",
    department: "Administration",
    hireDate: "2020-03-15",
    status: "Active",
    performance: 95,
    salary: "$180,000",
  },
  {
    id: "EMP-002",
    name: "Dr. Michael Chen",
    avatar: "MC",
    role: "Senior Surgeon",
    department: "Surgery",
    hireDate: "2021-06-22",
    status: "Active",
    performance: 88,
    salary: "$145,000",
  },
  {
    id: "EMP-003",
    name: "Nurse Emily Brown",
    avatar: "EB",
    role: "Head Nurse",
    department: "Nursing",
    hireDate: "2019-11-05",
    status: "Active",
    performance: 92,
    salary: "$85,000",
  },
  {
    id: "EMP-004",
    name: "Robert Johnson",
    avatar: "RJ",
    role: "Lab Technician",
    department: "Laboratory",
    hireDate: "2022-02-14",
    status: "Active",
    performance: 79,
    salary: "$65,000",
  },
  {
    id: "EMP-005",
    name: "Lisa Anderson",
    avatar: "LA",
    role: "HR Manager",
    department: "Human Resources",
    hireDate: "2020-08-30",
    status: "On Leave",
    performance: 85,
    salary: "$95,000",
  },
  {
    id: "EMP-006",
    name: "David Miller",
    avatar: "DM",
    role: "IT Specialist",
    department: "Information Technology",
    hireDate: "2023-01-10",
    status: "Active",
    performance: 91,
    salary: "$75,000",
  },
];

const stats = [
  { title: "Total Staff", value: "142", change: "+8 this month", icon: Users },
  { title: "Active Now", value: "128", change: "14 on leave", icon: Clock },
  {
    title: "New Hires",
    value: "8",
    change: "+2 from last month",
    icon: UserPlus,
  },
  {
    title: "Avg Performance",
    value: "89%",
    change: "+5% from last quarter",
    icon: TrendingUp,
  },
];

const recentAlerts = [
  { title: "New Employee Onboarded", time: "5 min ago", type: "success" },
  { title: "Leave Request Approved", time: "20 min ago", type: "info" },
  { title: "Performance Review Due", time: "1 hour ago", type: "warning" },
];

export default function HR() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = mockStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 80) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <header className="hidden lg:block mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Staff & HR Management
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  Manage employees, track performance, and handle HR operations
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-2xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Staff & HR
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Manage team & performance
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
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card
                      key={stat.title}
                      className="dark:bg-gray-900 dark:border-gray-800"
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                              {stat.title}
                            </p>
                            <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 dark:text-white">
                              {stat.value}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {stat.change}
                            </p>
                          </div>
                          <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-md">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Search & Staff Table */}
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <CardTitle className="text-base sm:text-lg dark:text-white">
                      Employees
                    </CardTitle>
                    <div className="flex w-full sm:w-auto gap-3">
                      <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search by name, role, or department..."
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
                          Add Employee
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
                            Employee
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">
                            Role
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                            Department
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                            Performance
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
                        {filteredStaff.map((staff) => (
                          <tr
                            key={staff.id}
                            className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                    {staff.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-sm sm:text-base dark:text-white">
                                    {staff.name}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {staff.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell dark:text-white">
                              <div className="text-sm">{staff.role}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {staff.salary}/year
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden lg:table-cell">
                              <Badge
                                variant="outline"
                                className="text-xs dark:border-gray-700"
                              >
                                {staff.department}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <div className="flex items-center gap-2">
                                <div className="w-16 sm:w-24">
                                  <Progress
                                    value={staff.performance}
                                    className="h-2"
                                  />
                                </div>
                                <span
                                  className={`font-medium text-xs sm:text-sm ${getPerformanceColor(
                                    staff.performance
                                  )}`}
                                >
                                  {staff.performance}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                className={`text-xs ${getStatusColor(
                                  staff.status
                                )}`}
                              >
                                {staff.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 dark:hover:bg-gray-700"
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 dark:hover:bg-gray-700"
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 dark:hover:bg-gray-700"
                                >
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
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
