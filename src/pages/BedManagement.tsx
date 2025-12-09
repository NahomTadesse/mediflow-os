"use client";

import React, { useState } from "react";
import {
  Search,
  Bed,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";

interface Bed {
  id: string;
  number: string;
  patientName?: string;
  patientId?: string;
  admissionDate?: Date;
  status: "available" | "occupied" | "cleaning" | "reserved";
  ward: string;
}

const initialBeds: Bed[] = [
  // ICU
  {
    id: "1",
    number: "ICU-01",
    patientName: "Ahmed Kebede",
    patientId: "P-1001",
    admissionDate: new Date("2025-04-01"),
    status: "occupied",
    ward: "ICU",
  },
  { id: "2", number: "ICU-02", status: "available", ward: "ICU" },

  { id: "3", number: "ICU-03", status: "cleaning", ward: "ICU" },
  { id: "4", number: "ICU-04", status: "reserved", ward: "ICU" },

  // General Ward
  {
    id: "5",
    number: "GW-101",
    patientName: "Fatima Mohammed",
    admissionDate: new Date("2025-04-03"),
    status: "occupied",
    ward: "General",
  },
  { id: "6", number: "GW-102", status: "available", ward: "General" },
  { id: "7", number: "GW-103", status: "available", ward: "General" },
  { id: "8", number: "GW-104", status: "occupied", ward: "General" },

  // Pediatric
  {
    id: "9",
    number: "PED-01",
    patientName: "Eden Tesfaye (6y)",
    admissionDate: new Date(),
    status: "occupied",
    ward: "Pediatric",
  },
  { id: "10", number: "PED-02", status: "available", ward: "Pediatric" },
];

export default function BedManagement() {
  const [beds] = useState<Bed[]>(initialBeds);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const wards = ["ICU", "General", "Pediatric", "Maternity", "Emergency"];

  const getStatusColor = (status: Bed["status"]) => {
    switch (status) {
      case "occupied":
        return "bg-red-500 border-red-600";
      case "available":
        return "bg-green-500 border-green-600";
      case "cleaning":
        return "bg-yellow-500 border-yellow-600";
      case "reserved":
        return "bg-blue-500 border-blue-600";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: Bed["status"]) => {
    switch (status) {
      case "occupied":
        return <User className="w-5 h-5" />;
      case "available":
        return <CheckCircle2 className="w-5 h-5" />;
      case "cleaning":
        return <AlertCircle className="w-5 h-5" />;
      case "reserved":
        return <Clock className="w-5 h-5" />;
    }
  };

  const filteredBeds = beds.filter(
    (bed) =>
      bed.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.patientId?.includes(searchTerm)
  );

  const stats = {
    total: beds.length,
    occupied: beds.filter((b) => b.status === "occupied").length,
    available: beds.filter((b) => b.status === "available").length,
    cleaning: beds.filter((b) => b.status === "cleaning").length,
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Bed Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time ward occupancy & patient allocation
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Beds
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 shadow-sm border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  Occupied
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stats.occupied}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 shadow-sm border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Available
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.available}
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 shadow-sm border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Cleaning
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.cleaning}
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patient name, ID, or bed number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Wards */}
          <div className="space-y-8">
            {wards.map((ward) => {
              const wardBeds = filteredBeds.filter((b) => b.ward === ward);
              if (wardBeds.length === 0 && searchTerm) return null;

              return (
                <div
                  key={ward}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Bed className="w-7 h-7 text-blue-600" />
                    {ward} Ward
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                      ({wardBeds.length} beds)
                    </span>
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {wardBeds.map((bed) => (
                      <button
                        key={bed.id}
                        onClick={() => setSelectedBed(bed)}
                        className={`relative p-4 rounded-xl border-2 transition-all transform hover:scale-105 hover:shadow-xl ${getStatusColor(
                          bed.status
                        )} text-white font-medium`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {getStatusIcon(bed.status)}
                          <span className="text-lg font-bold">
                            {bed.number}
                          </span>
                          {bed.patientName ? (
                            <span className="text-xs text-center line-clamp-2">
                              {bed.patientName}
                            </span>
                          ) : (
                            <span className="text-xs opacity-80">
                              {bed.status.charAt(0).toUpperCase() +
                                bed.status.slice(1)}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Patient Details Modal */}
          {selectedBed && selectedBed.patientName && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedBed(null)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Patient Details
                  </h3>
                  <button
                    onClick={() => setSelectedBed(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Bed Number
                    </p>
                    <p className="text-xl font-semibold">
                      {selectedBed.number}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Patient Name
                    </p>
                    <p className="text-xl font-semibold">
                      {selectedBed.patientName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Patient ID
                    </p>
                    <p className="text-xl font-semibold">
                      {selectedBed.patientId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Admission Date
                    </p>
                    <p className="text-xl font-semibold">
                      {selectedBed.admissionDate
                        ? format(selectedBed.admissionDate, "dd MMM yyyy")
                        : "N/A"}
                    </p>
                  </div>
                  <div className="pt-4">
                    <span
                      className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
                        selectedBed.status === "occupied"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {selectedBed.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
