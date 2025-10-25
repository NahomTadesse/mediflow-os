import { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Button } from "../../../mediflow-os/src/components/ui/button";
import { Input } from "../../../mediflow-os/src/components/ui/input";
import { Card, CardContent } from "../../../mediflow-os/src/components/ui/card";
import { Avatar, AvatarFallback } from "../../../mediflow-os/src/components/ui/avatar";
import { Badge } from "../../../mediflow-os/src/components/ui/badge";

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

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Patient
        </Button>
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
