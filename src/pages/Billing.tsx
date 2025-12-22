// pages/Billing.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Download, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  {
    title: "Total Revenue",
    value: "$428,650",
    change: "+12.5% from last month",
  },
  { title: "Outstanding", value: "$52,340", change: "28 invoices" },
  { title: "Collected Today", value: "$8,450", change: "15 payments" },
  { title: "Overdue", value: "$12,890", change: "9 invoices" },
];

const recentAlerts = [
  { title: "Payment Received", time: "5 min ago", type: "success" },
  { title: "Invoice Overdue", time: "30 min ago", type: "warning" },
  { title: "New Invoice Created", time: "1 hour ago", type: "info" },
];

export default function Billing() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="hidden lg:block mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Billing & Invoicing
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Manage invoices, payments, and insurance claims
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-2xl sm:text-2xl font-bold text-gray-900">
                  Billing
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage invoices & payments
                </p>
              </div>
            </div>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat) => (
                  <Card key={stat.title}>
                    <CardContent className="p-4 sm:p-6">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search & Invoices */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by patient, invoice ID, or patient ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Invoice
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredInvoices.map((invoice) => (
                      <Card
                        key={invoice.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-base sm:text-lg">
                                {invoice.patientName}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {invoice.id}
                              </p>
                            </div>
                            <Badge
                              className={`${
                                invoice.status === "Overdue"
                                  ? "bg-red-100 text-red-800"
                                  : invoice.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {invoice.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                            <div>Patient ID: {invoice.patientId}</div>
                            <div>Date: {invoice.date}</div>
                            <div>Amount: ${invoice.amount.toFixed(2)}</div>
                            <div>Method: {invoice.paymentMethod}</div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              View Details
                            </Button>
                            <Button size="sm" className="flex-1">
                              Process Payment
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Only Recent Alerts */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-medium">
                            {alert.title}
                          </p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                        <Badge variant={alert.type as any} className="text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
