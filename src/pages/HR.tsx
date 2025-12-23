"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  Clock,
  TrendingUp,
  Users,
  UserPlus,
  Briefcase,
  GraduationCap,
  FileText,
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  Eye,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockStaff = [
  {
    id: "EMP-001",
    name: "Dr. Sarah Wilson",
    avatar: "SW",
    role: "Chief Medical Officer",
    department: "Administration",
    email: "sarah.w@medcare.com",
    phone: "+1 (555) 123-4567",
    hireDate: "2020-03-15",
    status: "Active",
    performance: 95,
    leavesUsed: 12,
    leavesTotal: 30,
    salary: "$180,000",
    skills: ["Leadership", "Cardiology", "Management"],
  },
  {
    id: "EMP-002",
    name: "Dr. Michael Chen",
    avatar: "MC",
    role: "Senior Surgeon",
    department: "Surgery",
    email: "michael.c@medcare.com",
    phone: "+1 (555) 234-5678",
    hireDate: "2021-06-22",
    status: "Active",
    performance: 88,
    leavesUsed: 8,
    leavesTotal: 30,
    salary: "$145,000",
    skills: ["Surgery", "Trauma Care", "Teaching"],
  },
  {
    id: "EMP-003",
    name: "Nurse Emily Brown",
    avatar: "EB",
    role: "Head Nurse",
    department: "Nursing",
    email: "emily.b@medcare.com",
    phone: "+1 (555) 345-6789",
    hireDate: "2019-11-05",
    status: "Active",
    performance: 92,
    leavesUsed: 15,
    leavesTotal: 30,
    salary: "$85,000",
    skills: ["Critical Care", "Training", "Patient Safety"],
  },
  {
    id: "EMP-004",
    name: "Robert Johnson",
    avatar: "RJ",
    role: "Lab Technician",
    department: "Laboratory",
    email: "robert.j@medcare.com",
    phone: "+1 (555) 456-7890",
    hireDate: "2022-02-14",
    status: "Active",
    performance: 79,
    leavesUsed: 5,
    leavesTotal: 30,
    salary: "$65,000",
    skills: ["Lab Analysis", "Equipment", "Quality Control"],
  },
  {
    id: "EMP-005",
    name: "Lisa Anderson",
    avatar: "LA",
    role: "HR Manager",
    department: "Human Resources",
    email: "lisa.a@medcare.com",
    phone: "+1 (555) 567-8901",
    hireDate: "2020-08-30",
    status: "On Leave",
    performance: 85,
    leavesUsed: 25,
    leavesTotal: 30,
    salary: "$95,000",
    skills: ["Recruitment", "Compliance", "Employee Relations"],
  },
  {
    id: "EMP-006",
    name: "David Miller",
    avatar: "DM",
    role: "IT Specialist",
    department: "Information Technology",
    email: "david.m@medcare.com",
    phone: "+1 (555) 678-9012",
    hireDate: "2023-01-10",
    status: "Active",
    performance: 91,
    leavesUsed: 3,
    leavesTotal: 30,
    salary: "$75,000",
    skills: ["System Admin", "Security", "Networking"],
  },
];

const departments = [
  { name: "All Departments", count: 142 },
  { name: "Administration", count: 12 },
  { name: "Medical", count: 58 },
  { name: "Nursing", count: 42 },
  { name: "Laboratory", count: 15 },
  { name: "Support Staff", count: 10 },
  { name: "IT", count: 5 },
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

const upcomingEvents = [
  {
    title: "Annual Health Check",
    date: "Tomorrow",
    participants: 142,
    type: "medical",
  },
  {
    title: "Team Building Workshop",
    date: "Nov 25",
    participants: 45,
    type: "training",
  },
  {
    title: "Quarterly Review",
    date: "Dec 5",
    participants: 12,
    type: "meeting",
  },
  {
    title: "Safety Training",
    date: "Dec 12",
    participants: 85,
    type: "training",
  },
];

const HR = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    salary: "",
    hireDate: "",
    emergencyContact: "",
    qualifications: "",
    experience: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = {
      id: `EMP-${String(mockStaff.length + 1).padStart(3, "0")}`,
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      status: "Active",
      performance: 85,
      leavesUsed: 0,
      leavesTotal: 30,
      skills: formData.qualifications.split(",").map((s) => s.trim()),
      ...formData,
    };
    console.log("New Employee:", newEmployee);
    setIsAddModalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      salary: "",
      hireDate: "",
      emergencyContact: "",
      qualifications: "",
      experience: "",
    });
  };

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept =
      selectedDepartment === "All Departments" ||
      staff.department === selectedDepartment;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && staff.status === "Active") ||
      (activeTab === "leave" && staff.status === "On Leave");

    return matchesSearch && matchesDept && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Terminated":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const viewEmployeeDetails = (employee: any) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 sm:mb-6 md:mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Staff & HR Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage employees, track performance, and handle HR operations
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Export Data
              </Button>
              <Button size="sm" className="text-xs sm:text-sm">
                <UserPlus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Quick Hire
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="overflow-hidden">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {stat.change}
                        </p>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Left Column - Departments & Quick Actions */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Departments */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">
                    Departments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {departments.map((dept) => (
                      <button
                        key={dept.name}
                        onClick={() => setSelectedDepartment(dept.name)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedDepartment === dept.name
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-sm font-medium">{dept.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {dept.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Add Attendance
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Performance Review
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Shift
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Payslips
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Compliance Check
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-sm">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-600">
                                {event.date}
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {event.participants} staff
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Tabs and Search */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <Tabs
                    defaultValue="all"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <TabsList className="w-full sm:w-auto">
                        <TabsTrigger value="all" className="text-xs sm:text-sm">
                          All Staff
                        </TabsTrigger>
                        <TabsTrigger
                          value="active"
                          className="text-xs sm:text-sm"
                        >
                          Active
                        </TabsTrigger>
                        <TabsTrigger
                          value="leave"
                          className="text-xs sm:text-sm"
                        >
                          On Leave
                        </TabsTrigger>
                        <TabsTrigger value="new" className="text-xs sm:text-sm">
                          New Hires
                        </TabsTrigger>
                      </TabsList>

                      <div className="flex gap-2">
                        <Dialog
                          open={isAddModalOpen}
                          onOpenChange={setIsAddModalOpen}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" className="text-xs sm:text-sm">
                              <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              Add Employee
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-3xl p-4 sm:p-6 md:p-8">
                            <DialogHeader>
                              <DialogTitle className="text-lg sm:text-xl md:text-2xl">
                                Add New Employee
                              </DialogTitle>
                            </DialogHeader>
                            <form
                              onSubmit={handleSubmit}
                              className="mt-4 sm:mt-6 space-y-4 sm:space-y-6"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                  <Label htmlFor="name" className="text-sm">
                                    Full Name
                                  </Label>
                                  <Input
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="text-sm sm:text-base"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email" className="text-sm">
                                    Email Address
                                  </Label>
                                  <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john.doe@medcare.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="text-sm sm:text-base"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="phone" className="text-sm">
                                    Phone Number
                                  </Label>
                                  <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="text-sm sm:text-base"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="role" className="text-sm">
                                    Job Role
                                  </Label>
                                  <Select
                                    value={formData.role}
                                    onValueChange={(v) =>
                                      handleSelectChange("role", v)
                                    }
                                  >
                                    <SelectTrigger className="text-sm sm:text-base">
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Doctor">
                                        Doctor
                                      </SelectItem>
                                      <SelectItem value="Nurse">
                                        Nurse
                                      </SelectItem>
                                      <SelectItem value="Technician">
                                        Technician
                                      </SelectItem>
                                      <SelectItem value="Administrative">
                                        Administrative
                                      </SelectItem>
                                      <SelectItem value="IT">
                                        IT Staff
                                      </SelectItem>
                                      <SelectItem value="Support">
                                        Support Staff
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="department"
                                    className="text-sm"
                                  >
                                    Department
                                  </Label>
                                  <Select
                                    value={formData.department}
                                    onValueChange={(v) =>
                                      handleSelectChange("department", v)
                                    }
                                  >
                                    <SelectTrigger className="text-sm sm:text-base">
                                      <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Administration">
                                        Administration
                                      </SelectItem>
                                      <SelectItem value="Medical">
                                        Medical
                                      </SelectItem>
                                      <SelectItem value="Nursing">
                                        Nursing
                                      </SelectItem>
                                      <SelectItem value="Laboratory">
                                        Laboratory
                                      </SelectItem>
                                      <SelectItem value="IT">
                                        Information Technology
                                      </SelectItem>
                                      <SelectItem value="Support">
                                        Support Staff
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="salary" className="text-sm">
                                    Annual Salary ($)
                                  </Label>
                                  <Input
                                    id="salary"
                                    name="salary"
                                    type="number"
                                    placeholder="75000"
                                    value={formData.salary}
                                    onChange={handleInputChange}
                                    className="text-sm sm:text-base"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="hireDate" className="text-sm">
                                    Hire Date
                                  </Label>
                                  <Input
                                    id="hireDate"
                                    name="hireDate"
                                    type="date"
                                    value={formData.hireDate}
                                    onChange={handleInputChange}
                                    className="text-sm sm:text-base"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="emergencyContact"
                                    className="text-sm"
                                  >
                                    Emergency Contact
                                  </Label>
                                  <Input
                                    id="emergencyContact"
                                    name="emergencyContact"
                                    placeholder="+1 (555) 987-6543"
                                    value={formData.emergencyContact}
                                    onChange={handleInputChange}
                                    className="text-sm sm:text-base"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor="qualifications"
                                  className="text-sm"
                                >
                                  Qualifications/Certifications
                                </Label>
                                <Input
                                  id="qualifications"
                                  name="qualifications"
                                  placeholder="MD, Board Certified, ACLS, etc."
                                  value={formData.qualifications}
                                  onChange={handleInputChange}
                                  className="text-sm sm:text-base"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="experience" className="text-sm">
                                  Previous Experience (Years)
                                </Label>
                                <Input
                                  id="experience"
                                  name="experience"
                                  type="number"
                                  placeholder="5"
                                  value={formData.experience}
                                  onChange={handleInputChange}
                                  className="text-sm sm:text-base"
                                />
                              </div>
                              <DialogFooter className="pt-4">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setIsAddModalOpen(false)}
                                  className="text-sm"
                                >
                                  Cancel
                                </Button>
                                <Button type="submit" className="text-sm">
                                  Add Employee
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search by name, role, or department..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 text-sm sm:text-base"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Filter className="mr-2 h-3 w-3" />
                        Filters
                      </Button>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Staff Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm">
                            Employee
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm hidden md:table-cell">
                            Role
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm hidden lg:table-cell">
                            Department
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm hidden sm:table-cell">
                            Performance
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Status
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStaff.map((staff) => (
                          <TableRow key={staff.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                                  <AvatarFallback className="bg-blue-100 text-blue-600">
                                    {staff.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-sm sm:text-base">
                                    {staff.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {staff.id}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="text-sm">{staff.role}</div>
                              <div className="text-xs text-gray-500">
                                {staff.salary}/year
                              </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <Badge variant="outline" className="text-xs">
                                {staff.department}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
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
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`text-xs ${getStatusColor(
                                  staff.status
                                )}`}
                              >
                                {staff.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7"
                                  onClick={() => viewEmployeeDetails(staff)}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7"
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7"
                                    >
                                      <MoreVertical className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                  >
                                    <DropdownMenuItem>
                                      <Mail className="h-3 w-3 mr-2" />
                                      Send Email
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Calendar className="h-3 w-3 mr-2" />
                                      Schedule Review
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-3 w-3 mr-2" />
                                      Terminate
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">
                    Department Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Medical",
                      "Nursing",
                      "Administration",
                      "Laboratory",
                      "IT",
                    ].map((dept) => {
                      const deptStaff = mockStaff.filter(
                        (s) => s.department === dept
                      );
                      const avgPerformance =
                        deptStaff.length > 0
                          ? Math.round(
                              deptStaff.reduce(
                                (acc, s) => acc + s.performance,
                                0
                              ) / deptStaff.length
                            )
                          : 0;

                      return (
                        <div key={dept} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{dept}</span>
                            <span className="text-sm font-semibold">
                              {avgPerformance}%
                            </span>
                          </div>
                          <Progress value={avgPerformance} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{deptStaff.length} staff members</span>
                            <span>Avg: {avgPerformance}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* View Employee Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="w-[95vw] max-w-4xl p-4 sm:p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl">
              Employee Details
            </DialogTitle>
          </DialogHeader>

          {selectedEmployee && (
            <div className="mt-4 sm:mt-6 space-y-6">
              {/* Employee Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg sm:text-xl">
                    {selectedEmployee.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold">
                    {selectedEmployee.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedEmployee.role} • {selectedEmployee.department}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={getStatusColor(selectedEmployee.status)}>
                      {selectedEmployee.status}
                    </Badge>
                    <Badge variant="outline">ID: {selectedEmployee.id}</Badge>
                    <Badge variant="outline">
                      Hired: {selectedEmployee.hireDate}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-gray-600">
                          {selectedEmployee.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-gray-600">
                          {selectedEmployee.phone}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Performance & Leaves
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Performance Score
                        </span>
                        <span
                          className={`font-bold ${getPerformanceColor(
                            selectedEmployee.performance
                          )}`}
                        >
                          {selectedEmployee.performance}%
                        </span>
                      </div>
                      <Progress
                        value={selectedEmployee.performance}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Leave Balance
                        </span>
                        <span className="text-sm font-medium">
                          {selectedEmployee.leavesTotal -
                            selectedEmployee.leavesUsed}{" "}
                          days left
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Used {selectedEmployee.leavesUsed} of{" "}
                        {selectedEmployee.leavesTotal} days
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Skills & Qualifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills.map(
                        (skill: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Compensation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Annual Salary</span>
                        <span className="font-semibold">
                          {selectedEmployee.salary}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly</span>
                        <span className="text-gray-600">
                          $
                          {(
                            parseFloat(
                              selectedEmployee.salary
                                .replace("$", "")
                                .replace(",", "")
                            ) / 12
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HR;
