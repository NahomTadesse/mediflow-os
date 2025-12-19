"use client";

import React, { useState, useEffect } from "react";
import {
  Bed,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Plus,
  Edit,
  MoreVertical,
  BarChart3,
  Download,
  RefreshCw,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  admissionDate: string;
  diagnosis: string;
  doctor: string;
  priority: "Critical" | "High" | "Medium" | "Low";
}

interface Bed {
  id: string;
  number: string;
  ward: string;
  status: "Occupied" | "Available" | "Reserved" | "Maintenance";
  patient?: Patient;
  type: "ICU" | "General" | "Private" | "Isolation";
  equipment: string[];
  lastCleaned: string;
  notes?: string;
}

interface Ward {
  id: string;
  name: string;
  type: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  headNurse: string;
}

const HospitalBedManagement: React.FC = () => {
  const [beds, setBeds] = useState<Bed[]>([
    {
      id: "1",
      number: "ICU-01",
      ward: "ICU-A",
      status: "Occupied",
      type: "ICU",
      equipment: ["Ventilator", "Monitor", "Oxygen"],
      lastCleaned: "2024-01-15",
      patient: {
        id: "p001",
        name: "John Smith",
        age: 65,
        gender: "Male",
        admissionDate: "2024-01-10",
        diagnosis: "Pneumonia",
        doctor: "Dr. Williams",
        priority: "Critical",
      },
    },
    {
      id: "2",
      number: "ICU-02",
      ward: "ICU-A",
      status: "Available",
      type: "ICU",
      equipment: ["Ventilator", "Monitor"],
      lastCleaned: "2024-01-15",
    },
    {
      id: "3",
      number: "GEN-101",
      ward: "General Ward A",
      status: "Occupied",
      type: "General",
      equipment: ["Monitor", "Oxygen"],
      lastCleaned: "2024-01-14",
      patient: {
        id: "p002",
        name: "Sarah Johnson",
        age: 45,
        gender: "Female",
        admissionDate: "2024-01-12",
        diagnosis: "Appendicitis",
        doctor: "Dr. Miller",
        priority: "High",
      },
    },
    {
      id: "4",
      number: "GEN-102",
      ward: "General Ward A",
      status: "Available",
      type: "General",
      equipment: ["Monitor"],
      lastCleaned: "2024-01-15",
    },
    {
      id: "5",
      number: "PRV-201",
      ward: "Private Wing",
      status: "Reserved",
      type: "Private",
      equipment: ["TV", "Fridge", "Monitor"],
      lastCleaned: "2024-01-13",
      patient: {
        id: "p003",
        name: "Robert Chen",
        age: 58,
        gender: "Male",
        admissionDate: "2024-01-16",
        diagnosis: "Cardiac Surgery",
        doctor: "Dr. Rodriguez",
        priority: "High",
      },
    },
    {
      id: "6",
      number: "ISO-301",
      ward: "Isolation Ward",
      status: "Maintenance",
      type: "Isolation",
      equipment: ["Special Ventilation", "Monitor"],
      lastCleaned: "2024-01-10",
      notes: "UV sterilization in progress",
    },
  ]);

  const [wards, setWards] = useState<Ward[]>([
    {
      id: "1",
      name: "ICU-A",
      type: "ICU",
      totalBeds: 20,
      occupiedBeds: 15,
      availableBeds: 5,
      headNurse: "Nurse Abebe",
    },
    {
      id: "2",
      name: "General Ward A",
      type: "General",
      totalBeds: 50,
      occupiedBeds: 42,
      availableBeds: 8,
      headNurse: "Nurse Adane",
    },
    {
      id: "3",
      name: "Private Wing",
      type: "Private",
      totalBeds: 15,
      occupiedBeds: 12,
      availableBeds: 3,
      headNurse: "Nurse Dawit",
    },
    {
      id: "4",
      name: "Isolation Ward",
      type: "Isolation",
      totalBeds: 10,
      occupiedBeds: 6,
      availableBeds: 4,
      headNurse: "Nurse Sisay",
    },
    {
      id: "5",
      name: "Pediatric Ward",
      type: "Specialty",
      totalBeds: 30,
      occupiedBeds: 22,
      availableBeds: 8,
      headNurse: "Nurse Nahom",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [wardFilter, setWardFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [isAddBedDialogOpen, setIsAddBedDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(
    (bed) => bed.status === "Occupied" || bed.status === "Reserved"
  ).length;
  const availableBeds = beds.filter((bed) => bed.status === "Available").length;
  const maintenanceBeds = beds.filter(
    (bed) => bed.status === "Maintenance"
  ).length;

  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.patient?.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || bed.status === statusFilter;
    const matchesWard = wardFilter === "All" || bed.ward === wardFilter;
    const matchesType = typeFilter === "All" || bed.type === typeFilter;

    return matchesSearch && matchesStatus && matchesWard && matchesType;
  });

  const handleAssignBed = (bed: Bed) => {
    setSelectedBed(bed);
    setIsAssignDialogOpen(true);
  };

  const handleDischarge = (bedId: string) => {
    setBeds(
      beds.map((bed) =>
        bed.id === bedId
          ? { ...bed, status: "Available", patient: undefined }
          : bed
      )
    );
  };

  const handleMarkAvailable = (bedId: string) => {
    setBeds(
      beds.map((bed) =>
        bed.id === bedId ? { ...bed, status: "Available" } : bed
      )
    );
  };

  const handleMarkMaintenance = (bedId: string) => {
    setBeds(
      beds.map((bed) =>
        bed.id === bedId ? { ...bed, status: "Maintenance" } : bed
      )
    );
  };

  const handleAddNewBed = () => {
    // In real app, this would make an API call
    const newBed: Bed = {
      id: (beds.length + 1).toString(),
      number: `GEN-${100 + beds.length}`,
      ward: "General Ward A",
      status: "Available",
      type: "General",
      equipment: ["Monitor"],
      lastCleaned: new Date().toISOString().split("T")[0],
    };
    setBeds([...beds, newBed]);
    setIsAddBedDialogOpen(false);
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200";
      case "Occupied":
        return "bg-red-100 text-red-800 border-red-200";
      case "Reserved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Bed type icon color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "ICU":
        return "text-red-500";
      case "General":
        return "text-blue-500";
      case "Private":
        return "text-purple-500";
      case "Isolation":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hospital Bed Management
              </h1>
              <p className="text-gray-600 mt-2">
                Monitor and manage bed occupancy in real-time
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button onClick={() => setIsAddBedDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Bed
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Beds
                    </p>
                    <p className="text-2xl font-bold mt-1">{totalBeds}</p>
                  </div>
                  <Bed className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Occupied Beds
                    </p>
                    <p className="text-2xl font-bold mt-1 text-red-600">
                      {occupiedBeds}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Available Beds
                    </p>
                    <p className="text-2xl font-bold mt-1 text-green-600">
                      {availableBeds}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Under Maintenance
                    </p>
                    <p className="text-2xl font-bold mt-1 text-yellow-600">
                      {maintenanceBeds}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Bed Management Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Bed Inventory</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search beds, patients..."
                        className="pl-9 w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Occupied">Occupied</SelectItem>
                      <SelectItem value="Reserved">Reserved</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={wardFilter} onValueChange={setWardFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Ward" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Wards</SelectItem>
                      {Array.from(new Set(beds.map((bed) => bed.ward))).map(
                        (ward) => (
                          <SelectItem key={ward} value={ward}>
                            {ward}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Bed Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Isolation">Isolation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBeds.map((bed) => (
                    <div
                      key={bed.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              getStatusColor(bed.status).split(" ")[0]
                            } bg-opacity-20`}
                          >
                            <Bed
                              className={`h-6 w-6 ${getTypeColor(bed.type)}`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">
                                {bed.number}
                              </h3>
                              <Badge className={getStatusColor(bed.status)}>
                                {bed.status}
                              </Badge>
                              <span
                                className={`text-sm font-medium px-2 py-1 rounded-full ${getTypeColor(
                                  bed.type
                                )} bg-opacity-20`}
                              >
                                {bed.type}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-1">
                              <span className="font-medium">Ward:</span>{" "}
                              {bed.ward}
                            </p>
                            <p className="text-gray-600 mb-1">
                              <span className="font-medium">Equipment:</span>{" "}
                              {bed.equipment.join(", ")}
                            </p>
                            <p className="text-gray-600 text-sm">
                              <Clock className="inline h-3 w-3 mr-1" />
                              Last cleaned: {bed.lastCleaned}
                            </p>

                            {/* Patient Info if occupied */}
                            {bed.patient && (
                              <div className="mt-3 pt-3 border-t">
                                <div className="flex items-center gap-2 mb-2">
                                  <User className="h-4 w-4 text-gray-500" />
                                  <h4 className="font-semibold">
                                    Patient Details
                                  </h4>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-gray-500">Name:</span>{" "}
                                    {bed.patient.name}
                                  </div>
                                  <div>
                                    <span className="text-gray-500">
                                      Age/Gender:
                                    </span>{" "}
                                    {bed.patient.age} / {bed.patient.gender}
                                  </div>
                                  <div>
                                    <span className="text-gray-500">
                                      Diagnosis:
                                    </span>{" "}
                                    {bed.patient.diagnosis}
                                  </div>
                                  <div>
                                    <span className="text-gray-500">
                                      Doctor:
                                    </span>{" "}
                                    {bed.patient.doctor}
                                  </div>
                                  <div className="col-span-2">
                                    <span className="text-gray-500">
                                      Priority:
                                    </span>{" "}
                                    <Badge
                                      variant="outline"
                                      className={`
                                      ${
                                        bed.patient.priority === "Critical"
                                          ? "bg-red-50 text-red-700 border-red-200"
                                          : ""
                                      }
                                      ${
                                        bed.patient.priority === "High"
                                          ? "bg-orange-50 text-orange-700 border-orange-200"
                                          : ""
                                      }
                                      ${
                                        bed.patient.priority === "Medium"
                                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                          : ""
                                      }
                                      ${
                                        bed.patient.priority === "Low"
                                          ? "bg-green-50 text-green-700 border-green-200"
                                          : ""
                                      }
                                    `}
                                    >
                                      {bed.patient.priority}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {bed.status === "Available" && (
                              <DropdownMenuItem
                                onClick={() => handleAssignBed(bed)}
                              >
                                <Users className="h-4 w-4 mr-2" />
                                Assign Patient
                              </DropdownMenuItem>
                            )}
                            {bed.status === "Occupied" && (
                              <DropdownMenuItem
                                onClick={() => handleDischarge(bed.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Discharge Patient
                              </DropdownMenuItem>
                            )}
                            {bed.status === "Maintenance" && (
                              <DropdownMenuItem
                                onClick={() => handleMarkAvailable(bed.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as Available
                              </DropdownMenuItem>
                            )}
                            {bed.status !== "Maintenance" && (
                              <DropdownMenuItem
                                onClick={() => handleMarkMaintenance(bed.id)}
                              >
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Mark for Maintenance
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Remove Bed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel - Ward Overview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ward Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wards.map((ward) => (
                    <div key={ward.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{ward.name}</h3>
                        <Badge variant="outline">{ward.type}</Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Occupancy</span>
                          <span>
                            {ward.occupiedBeds}/{ward.totalBeds} beds
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (ward.occupiedBeds / ward.totalBeds) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div>
                          <div className="text-green-600 font-medium">
                            {ward.availableBeds} available
                          </div>
                          <div className="text-gray-500">
                            Head Nurse: {ward.headNurse}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Patient Admission
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Transfer Patient
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bed className="h-4 w-4 mr-2" />
                    Bed Cleaning Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Emergency Bed Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add New Bed Dialog */}
      <Dialog open={isAddBedDialogOpen} onOpenChange={setIsAddBedDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Bed</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedNumber">Bed Number</Label>
                <Input id="bedNumber" placeholder="e.g., ICU-21" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ward">Ward</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards.map((ward) => (
                      <SelectItem key={ward.id} value={ward.name}>
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bedType">Bed Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ICU">ICU</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Isolation">Isolation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="equipment">Equipment</Label>
              <Input id="equipment" placeholder="Ventilator, Monitor, Oxygen" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea id="notes" placeholder="Additional information..." />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddBedDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNewBed}>Add Bed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Patient Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Assign Patient to Bed {selectedBed?.number}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input id="patientName" placeholder="Enter patient name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Age" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Input id="diagnosis" placeholder="Enter diagnosis" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Attending Doctor</Label>
              <Input id="doctor" placeholder="Doctor's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle patient assignment here
                setIsAssignDialogOpen(false);
              }}
            >
              Assign Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalBedManagement;
