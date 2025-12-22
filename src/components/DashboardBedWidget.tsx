// components/DashboardBedWidget.tsx
import React from "react";
import { Bed, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface DashboardBedWidgetProps {
  stats?: {
    total: number;
    occupied: number;
    available: number;
    maintenance: number;
  };
}

const DashboardBedWidget: React.FC<DashboardBedWidgetProps> = ({
  stats = { total: 156, occupied: 124, available: 28, maintenance: 4 },
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bed className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Bed Management</CardTitle>
              <p className="text-sm text-gray-500">Monitor hospital beds</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate("/bedmanagement")}
            className="h-8 px-2"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xl font-bold">{stats.total}</p>
            <p className="text-xs text-gray-600">Total</p>
          </div>
          <div className="text-center p-2 bg-red-50 rounded">
            <p className="text-xl font-bold text-red-600">{stats.occupied}</p>
            <p className="text-xs text-gray-600">Occupied</p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <p className="text-xl font-bold text-green-600">
              {stats.available}
            </p>
            <p className="text-xs text-gray-600">Available</p>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded">
            <p className="text-xl font-bold text-yellow-600">
              {stats.maintenance}
            </p>
            <p className="text-xs text-gray-600">Maintenance</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">ICU-01</Badge>
              <span className="text-gray-600">Available</span>
            </div>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800">GEN-101</Badge>
              <span className="text-gray-600">Occupied</span>
            </div>
            <Users className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-800">ISO-301</Badge>
              <span className="text-gray-600">Maintenance</span>
            </div>
            <Bed className="w-4 h-4 text-yellow-500" />
          </div>
        </div>

        <Button
          onClick={() => navigate("/bedmanagement")}
          className="w-full mt-4"
          size="sm"
        >
          <Bed className="w-4 h-4 mr-2" />
          Manage All Beds
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardBedWidget;
