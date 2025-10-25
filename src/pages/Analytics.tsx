import { Download, TrendingUp, Users, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const patientFlowData = [
  { month: "May", patients: 324 },
  { month: "Jun", patients: 398 },
  { month: "Jul", patients: 445 },
  { month: "Aug", patients: 512 },
  { month: "Sep", patients: 478 },
  { month: "Oct", patients: 589 },
];

const revenueData = [
  { month: "May", revenue: 184500 },
  { month: "Jun", revenue: 225800 },
  { month: "Jul", revenue: 198400 },
  { month: "Aug", revenue: 267300 },
  { month: "Sep", revenue: 245600 },
  { month: "Oct", revenue: 284500 },
];

const departmentData = [
  { name: "Cardiology", value: 28, color: "hsl(var(--primary))" },
  { name: "Emergency", value: 22, color: "hsl(var(--secondary))" },
  { name: "Pediatrics", value: 18, color: "hsl(var(--accent))" },
  { name: "Orthopedics", value: 15, color: "hsl(var(--muted))" },
  { name: "Other", value: 17, color: "hsl(var(--border))" },
];

const stats = [
  { title: "Total Patients", value: "8,547", change: "+12.5%", icon: Users },
  { title: "Appointments", value: "2,847", change: "+8.2%", icon: Calendar },
  { title: "Revenue", value: "$1.28M", change: "+18.4%", icon: DollarSign },
  { title: "Growth Rate", value: "23.1%", change: "+4.3%", icon: TrendingUp },
];

const Analytics = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Data insights and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Analytics Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                {stat.title}
                <stat.icon className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-xs text-primary">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patient Analytics</TabsTrigger>
          <TabsTrigger value="financial">Financial Analytics</TabsTrigger>
          <TabsTrigger value="operations">Operational Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Flow Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={patientFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="patients"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Patient Satisfaction</div>
                      <div className="text-sm text-muted-foreground">
                        Based on 2,847 surveys
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary">94.5%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Average Wait Time</div>
                      <div className="text-sm text-muted-foreground">
                        For appointments
                      </div>
                    </div>
                    <div className="text-2xl font-bold">18 min</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Bed Occupancy Rate</div>
                      <div className="text-sm text-muted-foreground">
                        Current utilization
                      </div>
                    </div>
                    <div className="text-2xl font-bold">82%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Staff Efficiency</div>
                      <div className="text-sm text-muted-foreground">
                        Patients per staff
                      </div>
                    </div>
                    <div className="text-2xl font-bold">8.4</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
