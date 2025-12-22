// pages/Patients.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    condition: "Stable",
    lastVisit: "2025-10-18",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    condition: "Recovering",
    lastVisit: "2025-10-17",
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 58,
    gender: "Male",
    condition: "Critical",
    lastVisit: "2025-10-16",
  },
  {
    id: 4,
    name: "Sarah Williams",
    age: 29,
    gender: "Female",
    condition: "Stable",
    lastVisit: "2025-10-15",
  },
];

const stats = [
  { title: "Total Patients", value: "8,542", change: "+124 this month" },
  { title: "Active Cases", value: "342", change: "15 critical" },
  { title: "New Today", value: "28", change: "+5 from yesterday" },
  { title: "Discharged", value: "56", change: "+8 this week" },
];

const recentAlerts = [
  { title: "New Patient Registered", time: "5 min ago", type: "info" },
  { title: "Critical Patient Update", time: "20 min ago", type: "warning" },
  { title: "Patient Discharged", time: "1 hour ago", type: "success" },
];

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="hidden lg:block mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Patients
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Manage patient records and information
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-2xl sm:text-2xl font-bold text-gray-900">
                  Patients
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage patient information
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Bell className="w-3 h-3 mr-1" />
                  Alerts
                </Button>
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
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search & Patient Cards */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search patients by name or condition..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Patient
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPatients.map((patient) => (
                      <Card
                        key={patient.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-base sm:text-lg">
                                {patient.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                ID: PAT-{patient.id.toString().padStart(4, "0")}
                              </p>
                            </div>
                            <Badge
                              className={`${
                                patient.condition === "Critical"
                                  ? "bg-red-100 text-red-800"
                                  : patient.condition === "Recovering"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {patient.condition}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                            <div>Age: {patient.age}</div>
                            <div>Gender: {patient.gender}</div>
                            <div className="col-span-2">
                              Last Visit: {patient.lastVisit}
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              View Details
                            </Button>
                            <Button size="sm" className="flex-1">
                              Schedule
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Only Recent Alerts */}
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
}
