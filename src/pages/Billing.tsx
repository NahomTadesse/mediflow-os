import { useState } from "react";
import { Search, Plus, Download, Send, DollarSign } from "lucide-react";
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

const mockInvoices = [
  {
    id: "INV-2025-001",
    patientName: "John Doe",
    patientId: "P-12345",
    date: "2025-10-18",
    amount: 850.0,
    status: "Paid",
    paymentMethod: "Insurance",
  },
  {
    id: "INV-2025-002",
    patientName: "Jane Smith",
    patientId: "P-12346",
    date: "2025-10-17",
    amount: 1250.0,
    status: "Pending",
    paymentMethod: "Cash",
  },
  {
    id: "INV-2025-003",
    patientName: "Robert Johnson",
    patientId: "P-12347",
    date: "2025-10-16",
    amount: 450.0,
    status: "Overdue",
    paymentMethod: "Card",
  },
  {
    id: "INV-2025-004",
    patientName: "Mary Davis",
    patientId: "P-12348",
    date: "2025-10-15",
    amount: 2100.0,
    status: "Paid",
    paymentMethod: "Insurance",
  },
];

const stats = [
  { title: "Total Revenue", value: "$428,650", change: "+12.5% from last month" },
  { title: "Outstanding", value: "$52,340", change: "28 invoices" },
  { title: "Collected Today", value: "$8,450", change: "15 payments" },
  { title: "Overdue", value: "$12,890", change: "9 invoices" },
];

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Billing & Invoicing</h1>
          <p className="text-muted-foreground">
            Manage invoices, payments, and insurance claims
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
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
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by patient name, invoice ID, or patient ID..."
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
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{invoice.patientName}</div>
                          <div className="text-sm text-muted-foreground">
                            {invoice.patientId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell className="font-semibold">
                        ${invoice.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{invoice.paymentMethod}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === "Paid"
                              ? "default"
                              : invoice.status === "Pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Pay
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Send className="h-4 w-4" />
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

export default Billing;
