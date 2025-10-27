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
    const prefix = category === "Medication" ? "MED" : category === "Supplies" ? "SUP" : "EQP";
    const count = mockInventory.filter((i) => i.id.startsWith(prefix)).length + 1;
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

          {/* Add Item Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl">Add New Inventory Item</DialogTitle>
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
                    <Label htmlFor="name">Item Name</Label>
                    <div className="relative">
                      <Package2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="Paracetamol 500mg"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(v) => handleSelectChange("category", v)}
                    >
                      <SelectTrigger>
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
                    <Label htmlFor="quantity">Initial Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="0"
                      placeholder="850"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      name="unit"
                      placeholder="tablets"
                      value={formData.unit}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reorderLevel">Reorder Level</Label>
                    <Input
                      id="reorderLevel"
                      name="reorderLevel"
                      type="number"
                      min="1"
                      placeholder="500"
                      value={formData.reorderLevel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      name="supplier"
                      placeholder="PharmaCorp"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="pl-10"
                        required={formData.category !== "Equipment"}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Item</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
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

      {/* Tabs - Original Behavior Preserved */}
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

        {/* Other tabs unchanged - show placeholder */}
        <TabsContent value="medication">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <Pill className="h-12 w-12 mx-auto mb-4" />
              <p>No medication items</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplies">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <Box className="h-12 w-12 mx-auto mb-4" />
              <p>No supplies</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <Wrench className="h-12 w-12 mx-auto mb-4" />
              <p>No equipment</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;