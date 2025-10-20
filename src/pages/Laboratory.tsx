import { useState } from "react";
import { Search, Plus, Download, FlaskConical, Send } from "lucide-react";
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
];

const stats = [
  { title: "Tests Today", value: "47", change: "+8 from yesterday" },
  { title: "In Progress", value: "23", change: "4 urgent" },
  { title: "Pending Results", value: "15", change: "2 overdue" },
  { title: "Completed", value: "1,284", change: "This month" },
];

const Laboratory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests = mockTests.filter(
    (test) =>
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchQuery.toLowerCase())
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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Test Request
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
            <CardContent>
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
                  {filteredTests.map((test) => (
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Laboratory;
