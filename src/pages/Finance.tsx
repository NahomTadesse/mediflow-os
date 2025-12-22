"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Bell,
  Download,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockTransactions = [
  {
    id: "TXN-2025-001",
    date: "2025-10-18",
    description: "Patient Services Revenue",
    category: "Revenue",
    amount: 12450.0,
    type: "Income",
  },
  {
    id: "TXN-2025-002",
    date: "2025-10-18",
    description: "Medical Supplies Purchase",
    category: "Operating Expense",
    amount: -3200.0,
    type: "Expense",
  },
  {
    id: "TXN-2025-003",
    date: "2025-10-17",
    description: "Insurance Reimbursement",
    category: "Revenue",
    amount: 8750.0,
    type: "Income",
  },
  {
    id: "TXN-2025-004",
    date: "2025-10-17",
    description: "Staff Payroll",
    category: "Payroll",
    amount: -45600.0,
    type: "Expense",
  },
];

const stats = [
  { title: "Total Revenue", value: "$1,284,500", change: "+18.2% this month" },
  {
    title: "Total Expenses",
    value: "$847,300",
    change: "+4.5% from last month",
  },
  { title: "Net Profit", value: "$437,200", change: "+32.1% growth" },
  { title: "Cash Flow", value: "$156,800", change: "-2.4% from last week" },
];

const recentAlerts = [
  { title: "Payment Received", time: "5 min ago", type: "success" },
  { title: "Invoice Overdue", time: "30 min ago", type: "warning" },
  { title: "New Invoice Created", time: "1 hour ago", type: "info" },
];

const revenueBreakdown = [
  {
    name: "Patient Services",
    amount: "$784,200",
    percentage: "61%",
    description: "Direct revenue",
  },
  {
    name: "Insurance Claims",
    amount: "$385,600",
    percentage: "30%",
    description: "Reimbursements",
  },
  {
    name: "Other Income",
    amount: "$114,700",
    percentage: "9%",
    description: "Miscellaneous",
  },
];

const expenseBreakdown = [
  {
    name: "Staff Payroll",
    amount: "$456,800",
    percentage: "54%",
    description: "Salaries & benefits",
  },
  {
    name: "Medical Supplies",
    amount: "$254,200",
    percentage: "30%",
    description: "Drugs & equipment",
  },
  {
    name: "Operations",
    amount: "$136,300",
    percentage: "16%",
    description: "Utilities & overhead",
  },
];

export default function Finance() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = mockTransactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
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
                  Finance & Accounting
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Track revenue, expenses, and financial health
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-2xl sm:text-2xl font-bold text-gray-900">
                  Finance
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Track revenue & expenses
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
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <div className="p-1.5 bg-primary/10 rounded-md">
                          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        </div>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.change.includes("+") ? (
                          <TrendingUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-600" />
                        )}
                        <p
                          className={`text-xs ${
                            stat.change.includes("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search & Transaction Cards */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search transactions by description or ID..."
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
                        New Entry
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTransactions.map((transaction) => (
                      <Card
                        key={transaction.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-base sm:text-lg">
                                {transaction.description}
                              </h3>
                              <p className="text-sm text-gray-600">
                                ID: {transaction.id}
                              </p>
                            </div>
                            <Badge
                              className={`${
                                transaction.type === "Income"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.type}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                            <div>Date: {transaction.date}</div>
                            <div>Category: {transaction.category}</div>
                            <div className="col-span-2">
                              Amount:
                              <span
                                className={`ml-2 font-semibold ${
                                  transaction.amount > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                ${Math.abs(transaction.amount).toLocaleString()}
                              </span>
                            </div>
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
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue & Expense Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base sm:text-lg">
                      Revenue Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {revenueBreakdown.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm sm:text-base">
                              {item.amount}
                            </p>
                            <p className="text-xs text-primary">
                              {item.percentage}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base sm:text-lg">
                      Expense Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {expenseBreakdown.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm sm:text-base">
                              {item.amount}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.percentage}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
