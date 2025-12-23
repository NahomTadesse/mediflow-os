// pages/MedicalRecords.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  FileText,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockRecords = [
  {
    id: "MR-001",
    patientName: "John Doe",
    patientId: "P-12345",
    type: "Consultation",
    doctor: "Dr. Sarah Wilson",
    date: "2025-10-18",
    status: "Complete",
  },
  {
    id: "MR-002",
    patientName: "Jane Smith",
    patientId: "P-12346",
    type: "Lab Report",
    doctor: "Dr. Michael Chen",
    date: "2025-10-17",
    status: "Complete",
  },
  {
    id: "MR-003",
    patientName: "Robert Johnson",
    patientId: "P-12347",
    type: "X-Ray",
    doctor: "Dr. Emily Brown",
    date: "2025-10-16",
    status: "Complete",
  },
  {
    id: "MR-004",
    patientName: "Mary Davis",
    patientId: "P-12348",
    type: "Prescription",
    doctor: "Dr. Sarah Wilson",
    date: "2025-10-15",
    status: "Active",
  },
];

const stats = [
  { title: "Total Records", value: "12,847", change: "+284 this month" },
  { title: "Active Cases", value: "342", change: "15 critical" },
  { title: "Records Today", value: "28", change: "+5 from yesterday" },
  { title: "Pending Review", value: "56", change: "8 urgent" },
];

const recentAlerts = [
  { title: "New Lab Report Ready", time: "10 min ago", type: "info" },
  { title: "Prescription Approved", time: "30 min ago", type: "success" },
  { title: "Record Update Required", time: "1 hour ago", type: "warning" },
];

export default function MedicalRecords() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = mockRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase())
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
                  Medical Records
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Centralized electronic health records management
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Medical Records
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Centralized EHR management
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

              {/* Search & Table */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by patient name, ID, or record number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Record
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Record ID</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Doctor
                          </TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="hidden lg:table-cell">
                            Diagnosis
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">
                              {record.id}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {record.patientName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {record.patientId}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{record.type}</Badge>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {record.doctor}
                            </TableCell>
                            <TableCell>{record.date}</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              N/A
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  record.status === "Active"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {record.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button size="icon" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Only Recent Alerts */}
            <div className="space-y-4 sm:space-y-6">
              {/* Recent Alerts */}
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
