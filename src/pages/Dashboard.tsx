import { Users, Calendar, DollarSign, Activity } from "lucide-react";
import { StatsCard } from "../../../mediflow-os/src/components/dashboard/StatsCard";
import { RecentActivity } from "../../../mediflow-os/src/components/dashboard/RecentActivity";
import { AppointmentsChart } from "../../../mediflow-os/src/components/dashboard/AppointmentsChart";
import { DepartmentOverview } from "../../../mediflow-os/src/components/dashboard/DepartmentOverview";

const Dashboard = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value="2,847"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          variant="info"
        />
        <StatsCard
          title="Today's Appointments"
          value="52"
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
          variant="success"
        />
        <StatsCard
          title="Revenue (MTD)"
          value="$284,567"
          icon={DollarSign}
          trend={{ value: 23, isPositive: true }}
          variant="default"
        />
        <StatsCard
          title="Active Staff"
          value="142"
          icon={Activity}
          trend={{ value: 3, isPositive: false }}
          variant="warning"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AppointmentsChart />
        <DepartmentOverview />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
