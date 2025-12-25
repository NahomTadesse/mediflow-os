// pages/Inventory.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  AlertTriangle,
  Package,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockInventory = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    category: "Medication",
    quantity: 850,
    unit: "tablets",
    reorderLevel: 500,
    supplier: "PharmaCorp",
    lastRestocked: "2025-10-10",
    expiryDate: "2026-12-31",
  },
  {
    id: "MED-002",
    name: "Amoxicillin 250mg",
    category: "Medication",
    quantity: 320,
    unit: "capsules",
    reorderLevel: 400,
    supplier: "MediSupply",
    lastRestocked: "2025-10-08",
    expiryDate: "2026-08-15",
  },
  {
    id: "SUP-001",
    name: "Surgical Gloves",
    category: "Supplies",
    quantity: 2400,
    unit: "pairs",
    reorderLevel: 1000,
    supplier: "MedEquip Inc",
    lastRestocked: "2025-10-15",
    expiryDate: "2027-06-30",
  },
  {
    id: "EQP-001",
    name: "Digital Thermometer",
    category: "Equipment",
    quantity: 45,
    unit: "units",
    reorderLevel: 20,
    supplier: "HealthTech",
    lastRestocked: "2025-09-20",
    expiryDate: "N/A",
  },
];

const stats = [
  { title: "Total Items", value: "1,847", change: "34 categories" },
  { title: "Low Stock Alerts", value: "12", change: "Needs reorder" },
  { title: "Expiring Soon", value: "8", change: "Within 30 days" },
  { title: "Total Value", value: "$284,500", change: "+5.2% this month" },
];

const recentAlerts = [
  { title: "Low Stock Alert", time: "10 min ago", type: "warning" },
  { title: "Item Restocked", time: "30 min ago", type: "success" },
  { title: "Expiry Warning", time: "1 hour ago", type: "info" },
];

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInventory = mockInventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (quantity: number, reorderLevel: number) => {
    const percentage = (quantity / reorderLevel) * 100;
    if (percentage <= 80) return "low";
    return "good";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <header className="hidden lg:block mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Inventory Management
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  Track medical supplies, drugs, and equipment
                </p>
              </div>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="lg:hidden mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="pl-12 -mt-12">
                <h1 className="text-2xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Inventory
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Track supplies & equipment
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
                  <Card
                    key={stat.title}
                    className="dark:bg-gray-900 dark:border-gray-800"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                        {stat.title}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search & Inventory List */}
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <CardTitle className="text-base sm:text-lg dark:text-white">
                      Inventory Items
                    </CardTitle>
                    <div className="flex w-full sm:w-auto gap-3">
                      <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search by name, ID, or category..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-full sm:w-64 dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            Item ID
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                            Category
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            Quantity
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">
                            Stock Level
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                            Supplier
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                            Expiry
                          </th>
                          <th className="text-left py-3 px-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInventory.map((item) => {
                          const status = getStockStatus(
                            item.quantity,
                            item.reorderLevel
                          );
                          return (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <td className="py-3 px-4 text-xs sm:text-sm font-medium dark:text-white">
                                {item.id}
                              </td>
                              <td className="py-3 px-4 text-xs sm:text-sm font-medium dark:text-white">
                                {item.name}
                              </td>
                              <td className="py-3 px-4 hidden sm:table-cell">
                                <Badge
                                  variant="outline"
                                  className="text-xs dark:border-gray-700"
                                >
                                  {item.category}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-xs sm:text-sm dark:text-white">
                                {item.quantity} {item.unit}
                              </td>
                              <td className="py-3 px-4 hidden md:table-cell">
                                <div className="space-y-1">
                                  <Progress
                                    value={
                                      (item.quantity / item.reorderLevel) * 100
                                    }
                                    className="h-2"
                                  />
                                  {status === "low" && (
                                    <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                                      <AlertTriangle className="h-3 w-3" />
                                      Low Stock
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-xs sm:text-sm dark:text-white hidden lg:table-cell">
                                {item.supplier}
                              </td>
                              <td className="py-3 px-4 text-xs sm:text-sm dark:text-white hidden lg:table-cell">
                                {item.expiryDate}
                              </td>
                              <td className="py-3 px-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs dark:border-gray-700"
                                >
                                  <Package className="h-3 w-3 mr-1" />
                                  Restock
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Recent Alerts */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 dark:text-white">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-medium dark:text-white">
                            {alert.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {alert.time}
                          </p>
                        </div>
                        <Badge
                          className={`text-xs ${
                            alert.type === "success"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : alert.type === "warning"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
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
