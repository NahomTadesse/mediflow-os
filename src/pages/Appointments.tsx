// import { useState } from "react";
// import { Calendar as CalendarIcon, Clock, Plus, Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const appointments = [
//   {
//     id: "A001",
//     patientName: "Sarah Johnson",
//     doctorName: "Dr. Robert Smith",
//     department: "Cardiology",
//     time: "09:00 AM",
//     date: "2024-01-22",
//     status: "Confirmed",
//     type: "Consultation",
//   },
//   {
//     id: "A002",
//     patientName: "Michael Chen",
//     doctorName: "Dr. Emily Brown",
//     department: "Orthopedics",
//     time: "10:30 AM",
//     date: "2024-01-22",
//     status: "Confirmed",
//     type: "Follow-up",
//   },
//   {
//     id: "A003",
//     patientName: "Emma Davis",
//     doctorName: "Dr. James Wilson",
//     department: "Pediatrics",
//     time: "11:00 AM",
//     date: "2024-01-22",
//     status: "Pending",
//     type: "Check-up",
//   },
//   {
//     id: "A004",
//     patientName: "James Wilson",
//     doctorName: "Dr. Sarah Anderson",
//     department: "Surgery",
//     time: "02:00 PM",
//     date: "2024-01-22",
//     status: "Confirmed",
//     type: "Pre-op",
//   },
//   {
//     id: "A005",
//     patientName: "Lisa Anderson",
//     doctorName: "Dr. Michael Davis",
//     department: "Emergency",
//     time: "03:30 PM",
//     date: "2024-01-22",
//     status: "In Progress",
//     type: "Emergency",
//   },
// ];

// const statusColors: Record<string, string> = {
//   Confirmed: "bg-success/10 text-success",
//   Pending: "bg-warning/10 text-warning",
//   "In Progress": "bg-info/10 text-info",
//   Completed: "bg-muted text-muted-foreground",
//   Cancelled: "bg-error/10 text-error",
// };

// const Appointments = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredAppointments = appointments.filter(
//     (apt) =>
//       apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       apt.department.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-8 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Appointments</h1>
//           <p className="text-muted-foreground mt-1">
//             Schedule and manage patient appointments
//           </p>
//         </div>
//         <Button className="gap-2">
//           <Plus className="h-4 w-4" />
//           New Appointment
//         </Button>
//       </div>

//       {/* Search Bar */}
//       <Card className="shadow-soft">
//         <CardContent className="p-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by patient, doctor, or department..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tabs */}
//       <Tabs defaultValue="today" className="space-y-6">
//         <TabsList>
//           <TabsTrigger value="today">Today</TabsTrigger>
//           <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//           <TabsTrigger value="past">Past</TabsTrigger>
//         </TabsList>

//         <TabsContent value="today" className="space-y-4">
//           {filteredAppointments.map((appointment) => (
//             <Card
//               key={appointment.id}
//               className="shadow-soft hover:shadow-lg transition-shadow"
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1 space-y-3">
//                     <div className="flex items-center gap-4">
//                       <Badge className={statusColors[appointment.status]}>
//                         {appointment.status}
//                       </Badge>
//                       <Badge variant="outline">{appointment.type}</Badge>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                       <div>
//                         <p className="text-sm text-muted-foreground">Patient</p>
//                         <p className="font-semibold">{appointment.patientName}</p>
//                         <p className="text-sm text-muted-foreground">{appointment.id}</p>
//                       </div>

//                       <div>
//                         <p className="text-sm text-muted-foreground">Doctor</p>
//                         <p className="font-medium">{appointment.doctorName}</p>
//                         <p className="text-sm text-muted-foreground">
//                           {appointment.department}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-sm text-muted-foreground">Date & Time</p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <CalendarIcon className="h-4 w-4 text-muted-foreground" />
//                           <span className="font-medium">{appointment.date}</span>
//                         </div>
//                         <div className="flex items-center gap-2 mt-1">
//                           <Clock className="h-4 w-4 text-muted-foreground" />
//                           <span className="font-medium">{appointment.time}</span>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-end gap-2">
//                         <Button variant="outline" size="sm">
//                           Reschedule
//                         </Button>
//                         <Button size="sm">View Details</Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </TabsContent>

//         <TabsContent value="upcoming">
//           <Card className="shadow-soft">
//             <CardContent className="p-12 text-center">
//               <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//               <p className="text-muted-foreground">No upcoming appointments</p>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="past">
//           <Card className="shadow-soft">
//             <CardContent className="p-12 text-center">
//               <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//               <p className="text-muted-foreground">No past appointments</p>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Appointments;


import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Search,
  X,
  User,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const appointments = [
  {
    id: "A001",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Robert Smith",
    department: "Cardiology",
    time: "09:00 AM",
    date: "2024-01-22",
    status: "Confirmed",
    type: "Consultation",
  },
  {
    id: "A002",
    patientName: "Michael Chen",
    doctorName: "Dr. Emily Brown",
    department: "Orthopedics",
    time: "10:30 AM",
    date: "2024-01-22",
    status: "Confirmed",
    type: "Follow-up",
  },
  {
    id: "A003",
    patientName: "Emma Davis",
    doctorName: "Dr. James Wilson",
    department: "Pediatrics",
    time: "11:00 AM",
    date: "2024-01-22",
    status: "Pending",
    type: "Check-up",
  },
  {
    id: "A004",
    patientName: "James Wilson",
    doctorName: "Dr. Sarah Anderson",
    department: "Surgery",
    time: "02:00 PM",
    date: "2024-01-22",
    status: "Confirmed",
    type: "Pre-op",
  },
  {
    id: "A005",
    patientName: "Lisa Anderson",
    doctorName: "Dr. Michael Davis",
    department: "Emergency",
    time: "03:30 PM",
    date: "2024-01-22",
    status: "In Progress",
    type: "Emergency",
  },
];

const statusColors: Record<string, string> = {
  Confirmed: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  "In Progress": "bg-info/10 text-info",
  Completed: "bg-muted text-muted-foreground",
  Cancelled: "bg-error/10 text-error",
};

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    department: "",
    date: "",
    time: "",
    type: "Consultation",
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
    const newAppointment = {
      id: `A${String(appointments.length + 1).padStart(3, "0")}`,
      status: "Pending",
      ...formData,
    };
    console.log("New Appointment:", newAppointment);
    setIsModalOpen(false);
    setFormData({
      patientName: "",
      doctorName: "",
      department: "",
      date: "",
      time: "",
      type: "Consultation",
      notes: "",
    });
  };

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-1">
            Schedule and manage patient appointments
          </p>
        </div>

        {/* New Appointment Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-3xl p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl">New Appointment</DialogTitle>
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
                      placeholder="Sarah Johnson"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctorName">Doctor</Label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="doctorName"
                      name="doctorName"
                      placeholder="Dr. Robert Smith"
                      value={formData.doctorName}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(v) => handleSelectChange("department", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(v) => handleSelectChange("type", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Check-up">Check-up</SelectItem>
                      <SelectItem value="Pre-op">Pre-op</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Any special instructions or symptoms..."
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
                <Button type="submit">Schedule Appointment</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient, doctor, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs - Original Behavior Preserved */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="shadow-soft hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                      <Badge className={statusColors[appointment.status]}>
                        {appointment.status}
                      </Badge>
                      <Badge variant="outline">{appointment.type}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Patient</p>
                        <p className="font-semibold">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.id}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Doctor</p>
                        <p className="font-medium">{appointment.doctorName}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.department}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <div className="flex items-center gap-2 mt-1">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

            </Card>
          ))}
        </TabsContent>

        <TabsContent value="upcoming">
          <Card className="shadow-soft">
            <CardContent className="p-12 text-center">
              <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No upcoming appointments</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card className="shadow-soft">
            <CardContent className="p-12 text-center">
              <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No past appointments</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;