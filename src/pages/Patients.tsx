// import { useState } from "react";
// import { Search, Plus, Filter } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

// const patients = [
//   {
//     id: "P001",
//     name: "Sarah Johnson",
//     age: 32,
//     gender: "Female",
//     bloodType: "A+",
//     lastVisit: "2024-01-15",
//     status: "Active",
//     phone: "+1 (555) 123-4567",
//   },
//   {
//     id: "P002",
//     name: "Michael Chen",
//     age: 45,
//     gender: "Male",
//     bloodType: "O+",
//     lastVisit: "2024-01-18",
//     status: "Active",
//     phone: "+1 (555) 234-5678",
//   },
//   {
//     id: "P003",
//     name: "Emma Davis",
//     age: 28,
//     gender: "Female",
//     bloodType: "B+",
//     lastVisit: "2024-01-10",
//     status: "Active",
//     phone: "+1 (555) 345-6789",
//   },
//   {
//     id: "P004",
//     name: "James Wilson",
//     age: 56,
//     gender: "Male",
//     bloodType: "AB+",
//     lastVisit: "2024-01-12",
//     status: "Follow-up",
//     phone: "+1 (555) 456-7890",
//   },
//   {
//     id: "P005",
//     name: "Lisa Anderson",
//     age: 41,
//     gender: "Female",
//     bloodType: "A-",
//     lastVisit: "2024-01-20",
//     status: "Active",
//     phone: "+1 (555) 567-8901",
//   },
// ];

// const statusColors: Record<string, string> = {
//   Active: "bg-success/10 text-success",
//   "Follow-up": "bg-warning/10 text-warning",
//   Inactive: "bg-muted text-muted-foreground",
// };

// const Patients = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredPatients = patients.filter(
//     (patient) =>
//       patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       patient.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-8 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Patient Management</h1>
//           <p className="text-muted-foreground mt-1">
//             Manage and view all patient records
//           </p>
//         </div>
//         <Button className="gap-2">
//           <Plus className="h-4 w-4" />
//           Add Patient
//         </Button>
//       </div>

//       {/* Search and Filter */}
//       <Card className="shadow-soft">
//         <CardContent className="p-4">
//           <div className="flex gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search by name or patient ID..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Button variant="outline" className="gap-2">
//               <Filter className="h-4 w-4" />
//               Filters
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Patient List */}
//       <div className="grid gap-4">
//         {filteredPatients.map((patient) => (
//           <Card key={patient.id} className="shadow-soft hover:shadow-lg transition-shadow">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-6">
//                 <Avatar className="h-14 w-14">
//                   <AvatarFallback className="bg-primary/10 text-primary text-lg">
//                     {patient.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>

//                 <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
//                   <div>
//                     <p className="font-semibold">{patient.name}</p>
//                     <p className="text-sm text-muted-foreground">{patient.id}</p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-muted-foreground">Age / Gender</p>
//                     <p className="font-medium">
//                       {patient.age} / {patient.gender}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-muted-foreground">Blood Type</p>
//                     <p className="font-medium">{patient.bloodType}</p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-muted-foreground">Last Visit</p>
//                     <p className="font-medium">{patient.lastVisit}</p>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <Badge className={statusColors[patient.status]}>
//                       {patient.status}
//                     </Badge>
//                     <Button variant="ghost" size="sm">
//                       View Details
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Patients;


import { useState } from "react";
import { Search, Plus, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const patients = [
  {
    id: "P001",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    bloodType: "A+",
    lastVisit: "2024-01-15",
    status: "Active",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "P002",
    name: "Michael Chen",
    age: 45,
    gender: "Male",
    bloodType: "O+",
    lastVisit: "2024-01-18",
    status: "Active",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "P003",
    name: "Emma Davis",
    age: 28,
    gender: "Female",
    bloodType: "B+",
    lastVisit: "2024-01-10",
    status: "Active",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "P004",
    name: "James Wilson",
    age: 56,
    gender: "Male",
    bloodType: "AB+",
    lastVisit: "2024-01-12",
    status: "Follow-up",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "P005",
    name: "Lisa Anderson",
    age: 41,
    gender: "Female",
    bloodType: "A-",
    lastVisit: "2024-01-20",
    status: "Active",
    phone: "+1 (555) 567-8901",
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success",
  "Follow-up": "bg-warning/10 text-warning",
  Inactive: "bg-muted text-muted-foreground",
};

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodType: "",
    phone: "",
    status: "Active",
  });

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Patient:", {
      id: `P${String(patients.length + 1).padStart(3, "0")}`,
      lastVisit: new Date().toISOString().split("T")[0],
      ...formData,
      age: parseInt(formData.age),
    });
    setIsModalOpen(false);
    setFormData({
      name: "",
      age: "",
      gender: "",
      bloodType: "",
      phone: "",
      status: "Active",
    });
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patient Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all patient records
          </p>
        </div>

        {/* Add Patient Modal Trigger */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Add New Patient</DialogTitle>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none sm:max-w-5xl"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="32"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="120"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                     
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) => handleSelectChange("bloodType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Initial Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Patient</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or patient ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="shadow-soft hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Age / Gender</p>
                    <p className="font-medium">
                      {patient.age} / {patient.gender}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Blood Type</p>
                    <p className="font-medium">{patient.bloodType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Last Visit</p>
                    <p className="font-medium">{patient.lastVisit}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={statusColors[patient.status]}>
                      {patient.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Patients;