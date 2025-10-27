// import { useState } from "react";
// import { Search, Plus, Download, Eye, Edit, FileText } from "lucide-react";
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

// const mockRecords = [
//   {
//     id: "MR-001",
//     patientId: "P-12345",
//     patientName: "John Doe",
//     type: "Consultation",
//     doctor: "Dr. Sarah Wilson",
//     date: "2025-10-18",
//     diagnosis: "Seasonal Allergies",
//     status: "Complete",
//   },
//   {
//     id: "MR-002",
//     patientId: "P-12346",
//     patientName: "Jane Smith",
//     type: "Lab Report",
//     doctor: "Dr. Michael Chen",
//     date: "2025-10-17",
//     diagnosis: "Blood Work - Normal",
//     status: "Complete",
//   },
//   {
//     id: "MR-003",
//     patientId: "P-12347",
//     patientName: "Robert Johnson",
//     type: "X-Ray",
//     doctor: "Dr. Emily Brown",
//     date: "2025-10-16",
//     diagnosis: "Chest X-Ray - Clear",
//     status: "Complete",
//   },
//   {
//     id: "MR-004",
//     patientId: "P-12348",
//     patientName: "Mary Davis",
//     type: "Prescription",
//     doctor: "Dr. Sarah Wilson",
//     date: "2025-10-15",
//     diagnosis: "Hypertension Management",
//     status: "Active",
//   },
// ];

// const stats = [
//   { title: "Total Records", value: "12,847", change: "+284 this month" },
//   { title: "Active Cases", value: "342", change: "15 critical" },
//   { title: "Records Today", value: "28", change: "+5 from yesterday" },
//   { title: "Pending Review", value: "56", change: "8 urgent" },
// ];

// const MedicalRecords = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredRecords = mockRecords.filter(
//     (record) =>
//       record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       record.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Medical Records</h1>
//           <p className="text-muted-foreground">
//             Centralized electronic health records management
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">
//             <Download className="mr-2 h-4 w-4" />
//             Export
//           </Button>
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             New Record
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
//           <TabsTrigger value="all">All Records</TabsTrigger>
//           <TabsTrigger value="consultations">Consultations</TabsTrigger>
//           <TabsTrigger value="lab">Lab Reports</TabsTrigger>
//           <TabsTrigger value="imaging">Imaging</TabsTrigger>
//           <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center gap-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search by patient name, ID, or record number..."
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
//                     <TableHead>Record ID</TableHead>
//                     <TableHead>Patient</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Doctor</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Diagnosis</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredRecords.map((record) => (
//                     <TableRow key={record.id}>
//                       <TableCell className="font-medium">{record.id}</TableCell>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium">{record.patientName}</div>
//                           <div className="text-sm text-muted-foreground">
//                             {record.patientId}
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="outline">{record.type}</Badge>
//                       </TableCell>
//                       <TableCell>{record.doctor}</TableCell>
//                       <TableCell>{record.date}</TableCell>
//                       <TableCell>{record.diagnosis}</TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             record.status === "Active" ? "default" : "secondary"
//                           }
//                         >
//                           {record.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex gap-2">
//                           <Button size="icon" variant="ghost">
//                             <Eye className="h-4 w-4" />
//                           </Button>
//                           <Button size="icon" variant="ghost">
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button size="icon" variant="ghost">
//                             <FileText className="h-4 w-4" />
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

// export default MedicalRecords;


import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  FileText,
  X,
  User,
  Stethoscope,
  Calendar,
  FileCheck,
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockRecords = [
  {
    id: "MR-001",
    patientId: "P-12345",
    patientName: "John Doe",
    type: "Consultation",
    doctor: "Dr. Sarah Wilson",
    date: "2025-10-18",
    diagnosis: "Seasonal Allergies",
    status: "Complete",
  },
  {
    id: "MR-002",
    patientId: "P-12346",
    patientName: "Jane Smith",
    type: "Lab Report",
    doctor: "Dr. Michael Chen",
    date: "2025-10-17",
    diagnosis: "Blood Work - Normal",
    status: "Complete",
  },
  {
    id: "MR-003",
    patientId: "P-12347",
    patientName: "Robert Johnson",
    type: "X-Ray",
    doctor: "Dr. Emily Brown",
    date: "2025-10-16",
    diagnosis: "Chest X-Ray - Clear",
    status: "Complete",
  },
  {
    id: "MR-004",
    patientId: "P-12348",
    patientName: "Mary Davis",
    type: "Prescription",
    doctor: "Dr. Sarah Wilson",
    date: "2025-10-15",
    diagnosis: "Hypertension Management",
    status: "Active",
  },
];

const stats = [
  { title: "Total Records", value: "12,847", change: "+284 this month" },
  { title: "Active Cases", value: "342", change: "15 critical" },
  { title: "Records Today", value: "28", change: "+5 from yesterday" },
  { title: "Pending Review", value: "56", change: "8 urgent" },
];

const MedicalRecords = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    type: "Consultation",
    doctor: "",
    date: "",
    diagnosis: "",
    status: "Complete",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      id: `MR-${String(mockRecords.length + 1).padStart(3, "0")}`,
      ...formData,
    };
    console.log("New Medical Record:", newRecord);
    setIsModalOpen(false);
    setFormData({
      patientName: "",
      patientId: "",
      type: "Consultation",
      doctor: "",
      date: "",
      diagnosis: "",
      status: "Complete",
      notes: "",
    });
  };

  const filteredRecords = mockRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Medical Records</h1>
          <p className="text-muted-foreground">
            Centralized electronic health records management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          {/* New Record Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Record
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl">New Medical Record</DialogTitle>
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
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="patientName"
                        name="patientName"
                        placeholder="John Doe"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                        autoFocus
                      />
                    </div>
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
                    <Label htmlFor="type">Record Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(v) => handleSelectChange("type", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consultation">Consultation</SelectItem>
                        <SelectItem value="Lab Report">Lab Report</SelectItem>
                        <SelectItem value="X-Ray">X-Ray</SelectItem>
                        <SelectItem value="MRI">MRI</SelectItem>
                        <SelectItem value="Prescription">Prescription</SelectItem>
                        <SelectItem value="Discharge Summary">Discharge Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="doctor"
                        name="doctor"
                        placeholder="Dr. Sarah Wilson"
                        value={formData.doctor}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
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
                        <SelectItem value="Complete">Complete</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis / Summary</Label>
                  <Input
                    id="diagnosis"
                    name="diagnosis"
                    placeholder="Seasonal Allergies, Blood Work - Normal..."
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Additional observations, treatment plan, follow-up instructions..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Record</Button>
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

      {/* Tabs - Original Behavior Preserved */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="lab">Lab Reports</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by patient name, ID, or record number..."
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
                    <TableHead>Record ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.patientName}</div>
                          <div className="text-sm text-muted-foreground">
                            {record.patientId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.type}</Badge>
                      </TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.diagnosis}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs unchanged - show placeholder */}
        <TabsContent value="consultations">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <FileCheck className="h-12 w-12 mx-auto mb-4" />
              <p>No consultation records</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <FileCheck className="h-12 w-12 mx-auto mb-4" />
              <p>No lab reports</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <FileCheck className="h-12 w-12 mx-auto mb-4" />
              <p>No imaging records</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <FileCheck className="h-12 w-12 mx-auto mb-4" />
              <p>No prescriptions</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecords;