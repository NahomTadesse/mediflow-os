// pages/Appointments.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Bell,
  Calendar,
  Clock,
  User,
  Video,
  Phone,
  MoreVertical,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Appointment = {
  id: number;
  time: string;
  patient: string;
  type: string;
  doctor: string;
  status?: "confirmed" | "pending";
  date?: string; // optional for upcoming/past
};

const appointments: Record<"today" | "upcoming" | "past", Appointment[]> = {
  today: [
    {
      id: 1,
      time: "09:00 AM",
      patient: "John Doe",
      type: "Consultation",
      doctor: "Dr. Smith",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Jane Smith",
      type: "Follow-up",
      doctor: "Dr. Johnson",
      status: "confirmed",
    },
    {
      id: 3,
      time: "02:00 PM",
      patient: "Robert Chen",
      type: "Check-up",
      doctor: "Dr. Williams",
      status: "pending",
    },
  ],
  upcoming: [
    {
      id: 4,
      date: "Tomorrow",
      time: "11:00 AM",
      patient: "Sarah Wilson",
      type: "Consultation",
      doctor: "Dr. Brown",
    },
    {
      id: 5,
      date: "Jan 20",
      time: "03:30 PM",
      patient: "Mike Taylor",
      type: "Surgery",
      doctor: "Dr. Davis",
    },
  ],
  past: [
    {
      id: 6,
      date: "Jan 12",
      time: "10:00 AM",
      patient: "Emma Johnson",
      type: "Check-up",
      doctor: "Dr. Miller",
    },
  ],
};

const stats = [
  { title: "Today's Appointments", value: "42", change: "+12% vs yesterday" },
  { title: "This Week", value: "284", change: "+8% vs last week" },
  { title: "Attendance Rate", value: "92%", change: "+3% this month" },
  { title: "Pending Confirmation", value: "12", change: "-5 from yesterday" },
];

const recentAlerts = [
  { title: "New Appointment Scheduled", time: "5 min ago", type: "info" },
  { title: "Patient No-Show Alert", time: "20 min ago", type: "warning" },
  { title: "Appointment Rescheduled", time: "1 hour ago", type: "success" },
];

export default function Appointments() {
  const [searchQuery, setSearchQuery] = useState("");

  // Currently showing only today — you can add tabs later
  const currentAppointments = appointments.today;

  const filteredAppointments = currentAppointments.filter(
    (appt) =>
      appt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header - No buttons */}
          <header className="hidden lg:block mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Appointments
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  Manage and schedule patient appointments
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header - Only Alerts button */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Appointments
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage patient appointments
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

              {/* Search & Appointments List */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search appointments by patient or doctor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Appointment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAppointments.map((appt) => (
                      <Card
                        key={appt.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-base sm:text-lg">
                                    {appt.patient}
                                  </h3>
                                  <Badge variant="outline">{appt.type}</Badge>
                                  {appt.status && (
                                    <Badge
                                      className={`${
                                        appt.status === "confirmed"
                                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                      }`}
                                    >
                                      {appt.status}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {appt.time}
                                    {appt.date && (
                                      <span className="ml-1">
                                        • {appt.date}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {appt.doctor}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-center">
                              <Button size="sm" variant="outline">
                                <Video className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">Video</span>
                              </Button>
                              <Button size="sm" variant="outline">
                                <Phone className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">Call</span>
                              </Button>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Recent Alerts Only */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
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
                        <Badge
                          variant={
                            alert.type === "success"
                              ? "default"
                              : alert.type === "warning"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
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
