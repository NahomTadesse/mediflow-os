// pages/HospitalBedManagement.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Bed, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockBeds = [
  {
    id: "ICU-01",
    bedNumber: "ICU-01",
    patientName: "Ahmed Kebede",
    patientId: "P-1001",
    ward: "ICU",
    status: "occupied",
    admissionDate: "2025-04-01",
  },
  {
    id: "ICU-02",
    bedNumber: "ICU-02",
    patientName: "",
    patientId: "",
    ward: "ICU",
    status: "available",
    admissionDate: "",
  },
  {
    id: "GW-101",
    bedNumber: "GW-101",
    patientName: "Fatima Mohammed",
    patientId: "P-1002",
    ward: "General",
    status: "occupied",
    admissionDate: "2025-04-03",
  },
  {
    id: "GW-102",
    bedNumber: "GW-102",
    patientName: "",
    patientId: "",
    ward: "General",
    status: "available",
    admissionDate: "",
  },
  {
    id: "PED-01",
    bedNumber: "PED-01",
    patientName: "Eden Tesfaye",
    patientId: "P-1003",
    ward: "Pediatric",
    status: "occupied",
    admissionDate: "2025-10-20",
  },
  {
    id: "PED-02",
    bedNumber: "PED-02",
    patientName: "",
    patientId: "",
    ward: "Pediatric",
    status: "cleaning",
    admissionDate: "",
  },
  {
    id: "MAT-01",
    bedNumber: "MAT-01",
    patientName: "",
    patientId: "",
    ward: "Maternity",
    status: "available",
    admissionDate: "",
  },
  {
    id: "EMR-01",
    bedNumber: "EMR-01",
    patientName: "John Smith",
    patientId: "P-1004",
    ward: "Emergency",
    status: "occupied",
    admissionDate: "2025-10-19",
  },
];

const stats = [
  { title: "Total Beds", value: "156", change: "12 beds added" },
  { title: "Occupied", value: "124", change: "79% occupancy" },
  { title: "Available", value: "24", change: "8 cleaned today" },
  { title: "Cleaning", value: "8", change: "Will be ready soon" },
];

const recentAlerts = [
  { title: "New Patient Admitted", time: "5 min ago", type: "info" },
  { title: "Bed Needs Cleaning", time: "30 min ago", type: "warning" },
  { title: "Patient Discharged", time: "1 hour ago", type: "success" },
  { title: "Bed Reserved", time: "2 hours ago", type: "info" },
];

export default function HospitalBedManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBeds = mockBeds.filter(
    (bed) =>
      bed.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.ward.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cleaning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
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
                  Hospital Bed Management
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  Real-time ward occupancy & patient allocation
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-2xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Bed Management
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Ward occupancy tracking
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

              {/* Search & Bed List */}
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <CardTitle className="text-base sm:text-lg dark:text-white">
                      Bed Allocation
                    </CardTitle>
                    <div className="flex w-full sm:w-auto gap-3">
                      <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search by patient, bed, or ward..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-full sm:w-64 dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Bed
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredBeds.map((bed) => (
                      <Card
                        key={bed.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-base sm:text-lg dark:text-white">
                                {bed.bedNumber}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {bed.ward} Ward
                              </p>
                            </div>
                            <Badge
                              className={`text-xs ${getStatusColor(
                                bed.status
                              )}`}
                            >
                              {bed.status.charAt(0).toUpperCase() +
                                bed.status.slice(1)}
                            </Badge>
                          </div>

                          {bed.patientName ? (
                            <>
                              <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <div>
                                  <p className="font-medium text-sm sm:text-base dark:text-white">
                                    {bed.patientName}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    ID: {bed.patientId}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <div>Admission Date</div>
                                <div>{bed.admissionDate}</div>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <Bed className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <div>
                                <p className="font-medium text-sm sm:text-base dark:text-white">
                                  Bed Available
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Ready for patient assignment
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 dark:border-gray-700"
                            >
                              View Details
                            </Button>
                            <Button size="sm" className="flex-1">
                              {bed.patientName ? "Transfer" : "Assign"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
