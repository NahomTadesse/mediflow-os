import { NavLink } from "react-router-dom";
import { Bed } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Receipt,
  Package,
  FlaskConical,
  UserCircle,
  DollarSign,
  BarChart3,
  Bell,
  Settings,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Medical Records", href: "/records", icon: FileText },
  { name: "Billing", href: "/billing", icon: Receipt },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Laboratory", href: "/laboratory", icon: FlaskConical },
  { name: "Staff & HR", href: "/hr", icon: UserCircle },
  { name: "Finance", href: "/finance", icon: DollarSign },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Bed Management", href: "/bedmanagement", icon: Bed },
];

const bottomNavigation = [
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col border-r border-border bg-card">
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <Activity className="h-8 w-8 text-primary" />
        <span className="ml-3 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          MedCare ERP
        </span>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 border-t border-border bg-card px-3 py-4 space-y-1 mt-auto">
          {bottomNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};
