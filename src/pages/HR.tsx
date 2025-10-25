import { useState } from "react";
import { Search, Plus, Download, UserCircle, Calendar } from "lucide-react";
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

  const filteredStaff = mockStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase())
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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

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
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
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
            <CardContent>
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
                  {filteredStaff.map((staff) => (
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
                          variant={
                            staff.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {staff.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <UserCircle className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HR;
