import { useState } from "react";
import { Search, Plus, Download, AlertTriangle, Package } from "lucide-react";
import { Button } from "../../../mediflow-os/src/components/ui/button";
import { Input } from "../../../mediflow-os/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../mediflow-os/src/components/ui/card";
import { Badge } from "../../../mediflow-os/src/components/ui/badge";
import { Progress } from "../../../mediflow-os/src/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../mediflow-os/src/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../mediflow-os/src/components/ui/table";

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

const Inventory = () => {
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track medical supplies, drugs, and equipment
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
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
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="medication">Medication</TabsTrigger>
          <TabsTrigger value="supplies">Supplies</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by item name, ID, or category..."
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
                    <TableHead>Item ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => {
                    const status = getStockStatus(item.quantity, item.reorderLevel);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{item.name}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress
                              value={(item.quantity / item.reorderLevel) * 100}
                              className="h-2"
                            />
                            {status === "low" && (
                              <div className="flex items-center gap-1 text-xs text-destructive">
                                <AlertTriangle className="h-3 w-3" />
                                Low Stock
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{item.supplier}</TableCell>
                        <TableCell className="text-sm">{item.expiryDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Package className="h-4 w-4 mr-1" />
                              Restock
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
