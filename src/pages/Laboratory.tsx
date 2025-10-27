// import { useState } from "react";
// import { Search, Plus, Download, FlaskConical, Send } from "lucide-react";
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

// const mockTests = [
//   {
//     id: "LAB-2025-001",
//     patientName: "John Doe",
//     patientId: "P-12345",
//     testType: "Complete Blood Count",
//     requestedBy: "Dr. Sarah Wilson",
//     requestDate: "2025-10-18",
//     status: "Completed",
//     priority: "Normal",
//     results: "Available",
//   },
//   {
//     id: "LAB-2025-002",
//     patientName: "Jane Smith",
//     patientId: "P-12346",
//     testType: "Lipid Panel",
//     requestedBy: "Dr. Michael Chen",
//     requestDate: "2025-10-18",
//     status: "In Progress",
//     priority: "Normal",
//     results: "Pending",
//   },
//   {
//     id: "LAB-2025-003",
//     patientName: "Robert Johnson",
//     patientId: "P-12347",
//     testType: "Chest X-Ray",
//     requestedBy: "Dr. Emily Brown",
//     requestDate: "2025-10-17",
//     status: "Completed",
//     priority: "Urgent",
//     results: "Available",
//   },
//   {
//     id: "LAB-2025-004",
//     patientName: "Mary Davis",
//     patientId: "P-12348",
//     testType: "Urinalysis",
//     requestedBy: "Dr. Sarah Wilson",
//     requestDate: "2025-10-17",
//     status: "Scheduled",
//     priority: "Normal",
//     results: "Not Started",
//   },
// ];

// const stats = [
//   { title: "Tests Today", value: "47", change: "+8 from yesterday" },
//   { title: "In Progress", value: "23", change: "4 urgent" },
//   { title: "Pending Results", value: "15", change: "2 overdue" },
//   { title: "Completed", value: "1,284", change: "This month" },
// ];

// const Laboratory = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredTests = mockTests.filter(
//     (test) =>
//       test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       test.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       test.testType.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Laboratory Information System</h1>
//           <p className="text-muted-foreground">
//             Manage lab tests, samples, and results
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">
//             <Download className="mr-2 h-4 w-4" />
//             Export Report
//           </Button>
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             New Test Request
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
//           <TabsTrigger value="all">All Tests</TabsTrigger>
//           <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
//           <TabsTrigger value="in-progress">In Progress</TabsTrigger>
//           <TabsTrigger value="completed">Completed</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center gap-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search by patient, test ID, or test type..."
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
//                     <TableHead>Test ID</TableHead>
//                     <TableHead>Patient</TableHead>
//                     <TableHead>Test Type</TableHead>
//                     <TableHead>Requested By</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Priority</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredTests.map((test) => (
//                     <TableRow key={test.id}>
//                       <TableCell className="font-medium">{test.id}</TableCell>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium">{test.patientName}</div>
//                           <div className="text-sm text-muted-foreground">
//                             {test.patientId}
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>{test.testType}</TableCell>
//                       <TableCell className="text-sm">{test.requestedBy}</TableCell>
//                       <TableCell>{test.requestDate}</TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             test.priority === "Urgent" ? "destructive" : "secondary"
//                           }
//                         >
//                           {test.priority}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             test.status === "Completed"
//                               ? "default"
//                               : test.status === "In Progress"
//                               ? "secondary"
//                               : "outline"
//                           }
//                         >
//                           {test.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex gap-2">
//                           <Button size="sm" variant="outline">
//                             <FlaskConical className="h-4 w-4 mr-1" />
//                             View
//                           </Button>
//                           {test.results === "Available" && (
//                             <Button size="sm" variant="ghost">
//                               <Send className="h-4 w-4" />
//                             </Button>
//                           )}
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

// export default Laboratory;


import { useState } from "react";
import { Search, Plus, Download, FlaskConical, Send, X } from "lucide-react";
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

const mockTests = [
  {
    id: "LAB-2025-001",
    patientName: "John Doe",
    patientId: "P-12345",
    testType: "Complete Blood Count",
    requestedBy: "Dr. Sarah Wilson",
    requestDate: "2025-10-18",
    status: "Completed",
    priority: "Normal",
    results: "Available",
  },
  {
    id: "LAB-2025-002",
    patientName: "Jane Smith",
    patientId: "P-12346",
    testType: "Lipid Panel",
    requestedBy: "Dr. Michael Chen",
    requestDate: "2025-10-18",
    status: "In Progress",
    priority: "Normal",
    results: "Pending",
  },
  {
    id: "LAB-2025-003",
    patientName: "Robert Johnson",
    patientId: "P-12347",
    testType: "Chest X-Ray",
    requestedBy: "Dr. Emily Brown",
    requestDate: "2025-10-17",
    status: "Completed",
    priority: "Urgent",
    results: "Available",
  },
  {
    id: "LAB-2025-004",
    patientName: "Mary Davis",
    patientId: "P-12348",
    testType: "Urinalysis",
    requestedBy: "Dr. Sarah Wilson",
    requestDate: "2025-10-17",
    status: "Scheduled",
    priority: "Normal",
    results: "Not Started",
  },
  {
    id: "LAB-2025-005",
    patientName: "Tom Clark",
    patientId: "P-12349",
    testType: "MRI Brain",
    requestedBy: "Dr. Raj Patel",
    requestDate: "2025-10-16",
    status: "Scheduled",
    priority: "Urgent",
    results: "Not Started",
  },
  {
    id: "LAB-2025-006",
    patientName: "Lisa Anderson",
    patientId: "P-12350",
    testType: "Thyroid Function",
    requestedBy: "Dr. Michael Chen",
    requestDate: "2025-10-15",
    status: "In Progress",
    priority: "Normal",
    results: "Pending",
  },
];

const stats = [
  { title: "Tests Today", value: "47", change: "+8 from yesterday" },
  { title: "In Progress", value: "23", change: "4 urgent" },
  { title: "Pending Results", value: "15", change: "2 overdue" },
  { title: "Completed", value: "1,284", change: "This month" },
];

const Laboratory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    testType: "",
    requestedBy: "",
    priority: "Normal",
    status: "Scheduled",
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
    const newTest = {
      id: `LAB-2025-${String(mockTests.length + 1).padStart(3, "0")}`,
      requestDate: new Date().toISOString().split("T")[0],
      results: "Not Started",
      ...formData,
    };
    console.log("New Test Request:", newTest);
    setIsModalOpen(false);
    setFormData({
      patientName: "",
      patientId: "",
      testType: "",
      requestedBy: "",
      priority: "Normal",
      status: "Scheduled",
    });
  };

  const getFilteredTests = (statusFilter?: string) => {
    return mockTests
      .filter((test) => !statusFilter || test.status === statusFilter)
      .filter(
        (test) =>
          test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.testType.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const renderTable = (data: typeof mockTests) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Test ID</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Test Type</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((test) => (
          <TableRow key={test.id}>
            <TableCell className="font-medium">{test.id}</TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{test.patientName}</div>
                <div className="text-sm text-muted-foreground">
                  {test.patientId}
                </div>
              </div>
            </TableCell>
            <TableCell>{test.testType}</TableCell>
            <TableCell className="text-sm">{test.requestedBy}</TableCell>
            <TableCell>{test.requestDate}</TableCell>
            <TableCell>
              <Badge
                variant={
                  test.priority === "Urgent" ? "destructive" : "secondary"
                }
              >
                {test.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  test.status === "Completed"
                    ? "default"
                    : test.status === "In Progress"
                    ? "secondary"
                    : "outline"
                }
              >
                {test.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <FlaskConical className="h-4 w-4 mr-1" />
                  View
                </Button>
                {test.results === "Available" && (
                  <Button size="sm" variant="ghost">
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
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
          <h1 className="text-3xl font-bold">Laboratory Information System</h1>
          <p className="text-muted-foreground">
            Manage lab tests, samples, and results
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>

          {/* New Test Request Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Test Request
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl">New Test Request</DialogTitle>
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
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      name="patientName"
                      placeholder="John Doe"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patientId">Patient ID</Label>
                    <Input
                      id="patientId"
                      name="patientId"
                      placeholder="P-12345"
                      value={formData.patientId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="testType">Test Type</Label>
                    <Input
                      id="testType"
                      name="testType"
                      placeholder="Complete Blood Count"
                      value={formData.testType}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requestedBy">Requested By</Label>
                    <Input
                      id="requestedBy"
                      name="requestedBy"
                      placeholder="Dr. Sarah Wilson"
                      value={formData.requestedBy}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(v) => handleSelectChange("priority", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Initial Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(v) => handleSelectChange("status", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
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
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
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

      {/* Tabs with Filtered Data */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by patient, test ID, or test type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>{renderTable(getFilteredTests())}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Scheduled Tests</h3>
            </CardHeader>
            <CardContent>{renderTable(getFilteredTests("Scheduled"))}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">In Progress</h3>
            </CardHeader>
            <CardContent>{renderTable(getFilteredTests("In Progress"))}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Completed</h3>
            </CardHeader>
            <CardContent>{renderTable(getFilteredTests("Completed"))}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Laboratory;