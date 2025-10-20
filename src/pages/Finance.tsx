import { useState } from "react";
import { Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  { title: "Total Revenue", value: "$1,284,500", change: "+18.2%", trend: "up" },
  { title: "Total Expenses", value: "$847,300", change: "+4.5%", trend: "up" },
  { title: "Net Profit", value: "$437,200", change: "+32.1%", trend: "up" },
  { title: "Cash Flow", value: "$156,800", change: "-2.4%", trend: "down" },
];

const Finance = () => {
  const [selectedPeriod] = useState("This Month");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Finance & Accounting</h1>
          <p className="text-muted-foreground">
            Financial tracking, budgeting, and reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Financial Report
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
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-primary" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span
                      className={`text-xs ${
                        stat.trend === "up"
                          ? "text-primary"
                          : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Patient Services</div>
                  <div className="text-sm text-muted-foreground">Direct revenue</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$784,200</div>
                  <div className="text-sm text-primary">61%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Insurance Claims</div>
                  <div className="text-sm text-muted-foreground">Reimbursements</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$385,600</div>
                  <div className="text-sm text-primary">30%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Other Income</div>
                  <div className="text-sm text-muted-foreground">Miscellaneous</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$114,700</div>
                  <div className="text-sm text-primary">9%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Staff Payroll</div>
                  <div className="text-sm text-muted-foreground">Salaries & benefits</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$456,800</div>
                  <div className="text-sm text-muted-foreground">54%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Medical Supplies</div>
                  <div className="text-sm text-muted-foreground">Drugs & equipment</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$254,200</div>
                  <div className="text-sm text-muted-foreground">30%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Operations</div>
                  <div className="text-sm text-muted-foreground">Utilities & overhead</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$136,300</div>
                  <div className="text-sm text-muted-foreground">16%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="budget">Budget Overview</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions - {selectedPeriod}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-medium">{txn.id}</TableCell>
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>{txn.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{txn.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            txn.type === "Income" ? "default" : "secondary"
                          }
                        >
                          {txn.type}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          txn.amount > 0 ? "text-primary" : "text-destructive"
                        }`}
                      >
                        ${Math.abs(txn.amount).toLocaleString()}
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

export default Finance;
