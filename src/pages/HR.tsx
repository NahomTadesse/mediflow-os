// import { useState } from "react";
// import { Search, Plus, Download, UserCircle, Calendar } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const mockStaff = [
//   {
//     id: "STF-001",
//     name: "Dr. Sarah Wilson",
//     role: "Senior Physician",
//     department: "Cardiology",
//     email: "sarah.wilson@medcare.com",
//     phone: "+1 (555) 123-4567",
//     status: "Active",
//     shift: "Morning",
//     attendance: "98.5%",
//   },
//   {
//     id: "STF-002",
//     name: "Dr. Michael Chen",
//     role: "Physician",
//     department: "Internal Medicine",
//     email: "michael.chen@medcare.com",
//     phone: "+1 (555) 234-5678",
//     status: "Active",
//     shift: "Evening",
//     attendance: "96.2%",
//   },
//   {
//     id: "STF-003",
//     name: "Nurse Emily Brown",
//     role: "Head Nurse",
//     department: "Emergency",
//     email: "emily.brown@medcare.com",
//     phone: "+1 (555) 345-6789",
//     status: "Active",
//     shift: "Night",
//     attendance: "99.1%",
//   },
//   {
//     id: "STF-004",
//     name: "James Anderson",
//     role: "Lab Technician",
//     department: "Laboratory",
//     email: "james.anderson@medcare.com",
//     phone: "+1 (555) 456-7890",
//     status: "On Leave",
//     shift: "Morning",
//     attendance: "94.8%",
//   },
// ];

// const stats = [
//   { title: "Total Staff", value: "284", change: "+12 this month" },
//   { title: "Active Today", value: "247", change: "87% attendance" },
//   { title: "On Leave", value: "18", change: "6 medical" },
//   { title: "Open Positions", value: "7", change: "3 urgent" },
// ];

// const HR = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredStaff = mockStaff.filter(
//     (staff) =>
//       staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.department.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Human Resources</h1>
//           <p className="text-muted-foreground">
//             Staff management, scheduling, and payroll
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">
//             <Calendar className="mr-2 h-4 w-4" />
//             Schedule
//           </Button>
//           <Button variant="outline">
//             <Download className="mr-2 h-4 w-4" />
//             Export
//           </Button>
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Staff
//           </Button>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-4">
//         {stats.map((stat) => (
//           <Card key={stat.title}>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">
//                 {stat.title}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground mt-1">
//                 {stat.change}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Tabs defaultValue="all" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="all">All Staff</TabsTrigger>
//           <TabsTrigger value="doctors">Doctors</TabsTrigger>
//           <TabsTrigger value="nurses">Nurses</TabsTrigger>
//           <TabsTrigger value="technicians">Technicians</TabsTrigger>
//           <TabsTrigger value="admin">Admin</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center gap-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search by name, ID, or department..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Staff ID</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Role</TableHead>
//                     <TableHead>Department</TableHead>
//                     <TableHead>Contact</TableHead>
//                     <TableHead>Shift</TableHead>
//                     <TableHead>Attendance</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredStaff.map((staff) => (
//                     <TableRow key={staff.id}>
//                       <TableCell className="font-medium">{staff.id}</TableCell>
//                       <TableCell>
//                         <div className="font-medium">{staff.name}</div>
//                       </TableCell>
//                       <TableCell>{staff.role}</TableCell>
//                       <TableCell>
//                         <Badge variant="outline">{staff.department}</Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="text-sm">
//                           <div>{staff.email}</div>
//                           <div className="text-muted-foreground">{staff.phone}</div>
//                         </div>
//                       </TableCell>
//                       <TableCell>{staff.shift}</TableCell>
//                       <TableCell>
//                         <div className="text-sm font-medium">{staff.attendance}</div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             staff.status === "Active" ? "default" : "secondary"
//                           }
//                         >
//                           {staff.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex gap-2">
//                           <Button size="sm" variant="outline">
//                             <UserCircle className="h-4 w-4 mr-1" />
//                             View
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default HR;



import { useState } from "react";
import { Search, Plus, Download, UserCircle, Calendar, X } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockStaff = [
  {
    id: "STF-001",
    name: "Dr. Sarah Wilson",
    role: "Senior Physician",
    department: "Cardiology",
    email: "sarah.wilson@medcare.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    shift: "Morning",
    attendance: "98.5%",
    type: "doctor",
  },
  {
    id: "STF-002",
    name: "Dr. Michael Chen",
    role: "Physician",
    department: "Internal Medicine",
    email: "michael.chen@medcare.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    shift: "Evening",
    attendance: "96.2%",
    type: "doctor",
  },
  {
    id: "STF-003",
    name: "Nurse Emily Brown",
    role: "Head Nurse",
    department: "Emergency",
    email: "emily.brown@medcare.com",
    phone: "+1 (555) 345-6789",
    status: "Active",
    shift: "Night",
    attendance: "99.1%",
    type: "nurse",
  },
  {
    id: "STF-004",
    name: "James Anderson",
    role: "Lab Technician",
    department: "Laboratory",
    email: "james.anderson@medcare.com",
    phone: "+1 (555) 456-7890",
    status: "On Leave",
    shift: "Morning",
    attendance: "94.8%",
    type: "technician",
  },
  {
    id: "STF-005",
    name: "Lisa Roberts",
    role: "HR Manager",
    department: "Administration",
    email: "lisa.roberts@medcare.com",
    phone: "+1 (555) 567-8901",
    status: "Active",
    shift: "Morning",
    attendance: "97.3%",
    type: "admin",
  },
  {
    id: "STF-006",
    name: "Dr. Raj Patel",
    role: "Pediatrician",
    department: "Pediatrics",
    email: "raj.patel@medcare.com",
    phone: "+1 (555) 678-9012",
    status: "Active",
    shift: "Morning",
    attendance: "95.6%",
    type: "doctor",
  },
  {
    id: "STF-007",
    name: "Nurse Tom Clark",
    role: "ICU Nurse",
    department: "ICU",
    email: "tom.clark@medcare.com",
    phone: "+1 (555) 789-0123",
    status: "Active",
    shift: "Night",
    attendance: "98.0%",
    type: "nurse",
  },
];

const stats = [
  { title: "Total Staff", value: "284", change: "+12 this month" },
  { title: "Active Today", value: "247", change: "87% attendance" },
  { title: "On Leave", value: "18", change: "6 medical" },
  { title: "Open Positions", value: "7", change: "3 urgent" },
];

const HR = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    shift: "Morning",
    status: "Active",
    type: "doctor",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff = {
      id: `STF-${String(mockStaff.length + 1).padStart(3, "0")}`,
      attendance: "0%",
      ...formData,
    };
    console.log("New Staff Added:", newStaff);
    // In real app: push to state or send to API
    setIsModalOpen(false);
    setFormData({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      shift: "Morning",
      status: "Active",
      type: "doctor",
    });
  };

  const getFilteredStaff = (type?: string) => {
    return mockStaff
      .filter((staff) => !type || staff.type === type)
      .filter(
        (staff) =>
          staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          staff.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const renderTable = (data: typeof mockStaff) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Staff ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Shift</TableHead>
          <TableHead>Attendance</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((staff) => (
          <TableRow key={staff.id}>
            <TableCell className="font-medium">{staff.id}</TableCell>
            <TableCell>
              <div className="font-medium">{staff.name}</div>
            </TableCell>
            <TableCell>{staff.role}</TableCell>
            <TableCell>
              <Badge variant="outline">{staff.department}</Badge>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{staff.email}</div>
                <div className="text-muted-foreground">{staff.phone}</div>
              </div>
            </TableCell>
            <TableCell>{staff.shift}</TableCell>
            <TableCell>
              <div className="text-sm font-medium">{staff.attendance}</div>
            </TableCell>
            <TableCell>
              <Badge
                variant={staff.status === "Active" ? "default" : "secondary"}
              >
                {staff.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline">
                <UserCircle className="h-4 w-4 mr-1" />
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Human Resources</h1>
          <p className="text-muted-foreground">
            Staff management, scheduling, and payroll
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          {/* Add Staff Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl">Add New Staff Member</DialogTitle>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Dr. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="Senior Physician"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="Cardiology"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Staff Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(v) => handleSelectChange("type", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="technician">Technician</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@medcare.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shift">Shift</Label>
                    <Select
                      value={formData.shift}
                      onValueChange={(v) => handleSelectChange("shift", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning">Morning</SelectItem>
                        <SelectItem value="Evening">Evening</SelectItem>
                        <SelectItem value="Night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(v) => handleSelectChange("status", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Staff Member</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs with Filtered Data */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="nurses">Nurses</TabsTrigger>
          <TabsTrigger value="technicians">Technicians</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>{renderTable(getFilteredStaff())}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doctors">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Doctors</h3>
            </CardHeader>
            <CardContent>{renderTable(getFilteredStaff("doctor"))}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nurses">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Nurses</h3>
            </CardHeader>
            <CardContent>{renderTable(getFilteredStaff("nurse"))}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technicians">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Technicians</h3>
            </CardHeader>
            <CardContent>{renderTable(getFilteredStaff("technician"))}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Admin Staff</h3>
            </CardHeader>
            <CardContent>{renderTable(getFilteredStaff("admin"))}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HR;