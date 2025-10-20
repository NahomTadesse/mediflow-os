import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const departments = [
  { name: "Cardiology", patients: 28, capacity: 40, utilization: 70 },
  { name: "Orthopedics", patients: 35, capacity: 45, utilization: 78 },
  { name: "Pediatrics", patients: 42, capacity: 50, utilization: 84 },
  { name: "Emergency", patients: 18, capacity: 25, utilization: 72 },
  { name: "Surgery", patients: 15, capacity: 20, utilization: 75 },
];

export const DepartmentOverview = () => {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>Department Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {departments.map((dept) => (
            <div key={dept.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{dept.name}</span>
                <span className="text-muted-foreground">
                  {dept.patients}/{dept.capacity} patients
                </span>
              </div>
              <Progress value={dept.utilization} className="h-2" />
              <div className="flex justify-end">
                <span className="text-xs text-muted-foreground">
                  {dept.utilization}% capacity
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
