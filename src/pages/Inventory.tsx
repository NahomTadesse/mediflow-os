// import { useState } from "react";
// import { Search, Plus, Download, AlertTriangle, Package } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const mockInventory = [
//   {
//     id: "MED-001",
//     name: "Paracetamol 500mg",
//     category: "Medication",
//     quantity: 850,
//     unit: "tablets",
//     reorderLevel: 500,
//     supplier: "PharmaCorp",
//     lastRestocked: "2025-10-10",
//     expiryDate: "2026-12-31",
//   },
//   {
//     id: "MED-002",
//     name: "Amoxicillin 250mg",
//     category: "Medication",
//     quantity: 320,
//     unit: "capsules",
//     reorderLevel: 400,
//     supplier: "MediSupply",
//     lastRestocked: "2025-10-08",
//     expiryDate: "2026-08-15",
//   },
//   {
//     id: "SUP-001",
//     name: "Surgical Gloves",
//     category: "Supplies",
//     quantity: 2400,
//     unit: "pairs",
//     reorderLevel: 1000,
//     supplier: "MedEquip Inc",
//     lastRestocked: "2025-10-15",
//     expiryDate: "2027-06-30",
//   },
//   {
//     id: "EQP-001",
//     name: "Digital Thermometer",
//     category: "Equipment",
//     quantity: 45,
//     unit: "units",
//     reorderLevel: 20,
//     supplier: "HealthTech",
//     lastRestocked: "2025-09-20",
//     expiryDate: "N/A",
//   },
// ];

// const stats = [
//   { title: "Total Items", value: "1,847", change: "34 categories" },
//   { title: "Low Stock Alerts", value: "12", change: "Needs reorder" },
//   { title: "Expiring Soon", value: "8", change: "Within 30 days" },
//   { title: "Total Value", value: "$284,500", change: "+5.2% this month" },
// ];

// const Inventory = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredInventory = mockInventory.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getStockStatus = (quantity: number, reorderLevel: number) => {
//     const percentage = (quantity / reorderLevel) * 100;
//     if (percentage <= 80) return "low";
//     return "good";
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Inventory Management</h1>
//           <p className="text-muted-foreground">
//             Track medical supplies, drugs, and equipment
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">
//             <Download className="mr-2 h-4 w-4" />
//             Export Report
//           </Button>
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Item
//           </Button>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-4">
//         {stats.map((stat) => (
//           <Card key={stat.title}>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">
//                 {stat.title}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground mt-1">
//                 {stat.change}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Tabs defaultValue="all" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="all">All Items</TabsTrigger>
//           <TabsTrigger value="medication">Medication</TabsTrigger>
//           <TabsTrigger value="supplies">Supplies</TabsTrigger>
//           <TabsTrigger value="equipment">Equipment</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center gap-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search by item name, ID, or category..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Item ID</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Quantity</TableHead>
//                     <TableHead>Stock Level</TableHead>
//                     <TableHead>Supplier</TableHead>
//                     <TableHead>Expiry Date</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredInventory.map((item) => {
//                     const status = getStockStatus(item.quantity, item.reorderLevel);
//                     return (
//                       <TableRow key={item.id}>
//                         <TableCell className="font-medium">{item.id}</TableCell>
//                         <TableCell>
//                           <div className="font-medium">{item.name}</div>
//                         </TableCell>
//                         <TableCell>
//                           <Badge variant="outline">{item.category}</Badge>
//                         </TableCell>
//                         <TableCell>
//                           {item.quantity} {item.unit}
//                         </TableCell>
//                         <TableCell>
//                           <div className="space-y-1">
//                             <Progress
//                               value={(item.quantity / item.reorderLevel) * 100}
//                               className="h-2"
//                             />
//                             {status === "low" && (
//                               <div className="flex items-center gap-1 text-xs text-destructive">
//                                 <AlertTriangle className="h-3 w-3" />
//                                 Low Stock
//                               </div>
//                             )}
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-sm">{item.supplier}</TableCell>
//                         <TableCell className="text-sm">{item.expiryDate}</TableCell>
//                         <TableCell>
//                           <div className="flex gap-2">
//                             <Button size="sm" variant="outline">
//                               <Package className="h-4 w-4 mr-1" />
//                               Restock
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Inventory;

"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  AlertTriangle,
  Package,
  X,
  Pill,
  Box,
  Wrench,
  Calendar,
  Package2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Medication",
    quantity: "",
    unit: "tablets",
    reorderLevel: "",
    supplier: "",
    expiryDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getNextId = (category: string) => {
    const prefix =
      category === "Medication"
        ? "MED"
        : category === "Supplies"
        ? "SUP"
        : "EQP";
    const count =
      mockInventory.filter((i) => i.id.startsWith(prefix)).length + 1;
    return `${prefix}-${String(count).padStart(3, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: getNextId(formData.category),
      lastRestocked: new Date().toISOString().split("T")[0],
      quantity: parseInt(formData.quantity),
      reorderLevel: parseInt(formData.reorderLevel),
      ...formData,
    };
    console.log("New Inventory Item:", newItem);
    setIsModalOpen(false);
    setFormData({
      name: "",
      category: "Medication",
      quantity: "",
      unit: "tablets",
      reorderLevel: "",
      supplier: "",
      expiryDate: "",
    });
  };

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
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 sm:mb-6 md:mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Inventory Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Track medical supplies, drugs, and equipment
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Export Report
              </Button>

              {/* Add Item Modal */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="text-xs sm:text-sm">
                    <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-3xl p-4 sm:p-6 md:p-8">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl md:text-2xl">
                      Add New Inventory Item
                    </DialogTitle>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </button>
                  </DialogHeader>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 sm:mt-6 space-y-4 sm:space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm">
                          Item Name
                        </Label>
                        <div className="relative">
                          <Package2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            placeholder="Paracetamol 500mg"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10 text-sm sm:text-base"
                            required
                            autoFocus
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm">
                          Category
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(v) =>
                            handleSelectChange("category", v)
                          }
                        >
                          <SelectTrigger className="text-sm sm:text-base">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Medication">
                              <div className="flex items-center gap-2">
                                <Pill className="h-4 w-4" />
                                Medication
                              </div>
                            </SelectItem>
                            <SelectItem value="Supplies">
                              <div className="flex items-center gap-2">
                                <Box className="h-4 w-4" />
                                Supplies
                              </div>
                            </SelectItem>
                            <SelectItem value="Equipment">
                              <div className="flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Equipment
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity" className="text-sm">
                          Initial Quantity
                        </Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="0"
                          placeholder="850"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          className="text-sm sm:text-base"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="unit" className="text-sm">
                          Unit
                        </Label>
                        <Input
                          id="unit"
                          name="unit"
                          placeholder="tablets"
                          value={formData.unit}
                          onChange={handleInputChange}
                          className="text-sm sm:text-base"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reorderLevel" className="text-sm">
                          Reorder Level
                        </Label>
                        <Input
                          id="reorderLevel"
                          name="reorderLevel"
                          type="number"
                          min="1"
                          placeholder="500"
                          value={formData.reorderLevel}
                          onChange={handleInputChange}
                          className="text-sm sm:text-base"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="supplier" className="text-sm">
                          Supplier
                        </Label>
                        <Input
                          id="supplier"
                          name="supplier"
                          placeholder="PharmaCorp"
                          value={formData.supplier}
                          onChange={handleInputChange}
                          className="text-sm sm:text-base"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-sm">
                          Expiry Date
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            type="date"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="pl-10 text-sm sm:text-base"
                            required={formData.category !== "Equipment"}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                        className="text-sm"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="text-sm">
                        Add Item
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-4 sm:p-6">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <div className="overflow-x-auto">
              <TabsList className="w-full lg:w-auto flex flex-nowrap lg:flex-wrap">
                <TabsTrigger
                  value="all"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  All Items
                </TabsTrigger>
                <TabsTrigger
                  value="medication"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  Medication
                </TabsTrigger>
                <TabsTrigger
                  value="supplies"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  Supplies
                </TabsTrigger>
                <TabsTrigger
                  value="equipment"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  Equipment
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by item name, ID, or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 text-sm sm:text-base"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Sort
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm">
                            Item ID
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Name
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm hidden sm:table-cell">
                            Category
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Quantity
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm hidden md:table-cell">
                            Stock Level
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm hidden lg:table-cell">
                            Supplier
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm hidden lg:table-cell">
                            Expiry Date
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInventory.map((item) => {
                          const status = getStockStatus(
                            item.quantity,
                            item.reorderLevel
                          );
                          return (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium text-xs sm:text-sm">
                                {item.id}
                              </TableCell>
                              <TableCell>
                                <div className="font-medium text-xs sm:text-sm">
                                  {item.name}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge variant="outline" className="text-xs">
                                  {item.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs sm:text-sm">
                                {item.quantity} {item.unit}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="space-y-1">
                                  <Progress
                                    value={
                                      (item.quantity / item.reorderLevel) * 100
                                    }
                                    className="h-2"
                                  />
                                  {status === "low" && (
                                    <div className="flex items-center gap-1 text-xs text-red-600">
                                      <AlertTriangle className="h-3 w-3" />
                                      Low Stock
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                                {item.supplier}
                              </TableCell>
                              <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                                {item.expiryDate}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs"
                                  >
                                    <Package className="h-3 w-3 mr-1" />
                                    Restock
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs */}
            {[
              { value: "medication", icon: Pill, label: "medication items" },
              { value: "supplies", icon: Box, label: "supplies" },
              { value: "equipment", icon: Wrench, label: "equipment" },
            ].map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <Card>
                  <CardContent className="p-8 sm:p-12 text-center text-gray-500">
                    <tab.icon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4" />
                    <p className="text-sm sm:text-base">No {tab.label}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
