// pages/Dashboard.tsx
"use client";

import { Users, Calendar, DollarSign, Activity, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Total Patients",
    value: "2,847",
    change: "+12% from last month",
    icon: Users,
    variant: "info",
  },
  {
    title: "Today's Appointments",
    value: "52",
    change: "+8 from yesterday",
    icon: Calendar,
    variant: "success",
  },
  {
    title: "Revenue (MTD)",
    value: "$284,567",
    change: "+23% growth",
    icon: DollarSign,
    variant: "default",
  },
  {
    title: "Active Staff",
    value: "142",
    change: "-3 since last week",
    icon: Activity,
    variant: "warning",
  },
];

const recentAlerts = [
  { title: "New Patient Registered", time: "5 min ago", type: "info" },
  { title: "Appointment Reminder", time: "30 min ago", type: "warning" },
  { title: "Payment Received", time: "1 hour ago", type: "success" },
  { title: "System Update", time: "2 hours ago", type: "info" },
];

const todayAppointments = [
  {
    id: 1,
    patient: "John Doe",
    time: "09:00 AM",
    department: "Cardiology",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Jane Smith",
    time: "10:30 AM",
    department: "Pediatrics",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    time: "11:15 AM",
    department: "Orthopedics",
    status: "Confirmed",
  },
  {
    id: 4,
    patient: "Mary Davis",
    time: "02:00 PM",
    department: "Dermatology",
    status: "Cancelled",
  },
];

const departmentStats = [
  { name: "Cardiology", patients: 320, occupancy: "85%", trend: "up" },
  { name: "Pediatrics", patients: 280, occupancy: "92%", trend: "up" },
  { name: "Orthopedics", patients: 190, occupancy: "78%", trend: "stable" },
  { name: "Dermatology", patients: 150, occupancy: "65%", trend: "down" },
  { name: "Neurology", patients: 210, occupancy: "88%", trend: "up" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="hidden lg:block mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Welcome back! Here's what's happening today.
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-2xl sm:text-2xl font-bold text-gray-900">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Welcome back! Here's what's happening today.
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
                  <Card key={stat.title}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <div
                          className={`p-1.5 rounded-md ${
                            stat.variant === "info"
                              ? "bg-blue-100"
                              : stat.variant === "success"
                              ? "bg-green-100"
                              : stat.variant === "warning"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <stat.icon
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              stat.variant === "info"
                                ? "text-blue-600"
                                : stat.variant === "success"
                                ? "text-green-600"
                                : stat.variant === "warning"
                                ? "text-yellow-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                        {stat.value}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          stat.change.includes("+")
                            ? "text-green-600"
                            : stat.change.includes("-")
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Today's Appointments */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">
                    Today's Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm sm:text-base">
                              {appointment.patient}
                            </h3>
                            <Badge
                              className={`text-xs ${
                                appointment.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">
                            {appointment.time} • {appointment.department}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Department Overview */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">
                    Department Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {departmentStats.map((dept) => (
                      <div
                        key={dept.name}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">
                            {dept.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {dept.patients} patients
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm sm:text-base">
                            {dept.occupancy}
                          </p>
                          <p className="text-xs text-gray-500">Occupancy</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Recent Alerts */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-medium">
                            {alert.title}
                          </p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                        <Badge variant={alert.type as any} className="text-xs">
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
};

export default Dashboard;
