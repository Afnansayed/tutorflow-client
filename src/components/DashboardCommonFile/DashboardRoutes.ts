import { BookCheck, LayoutDashboard, Plus, Users } from "lucide-react";

export const dashboardRoutes = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/dashboard/created",
    icon: Plus,
    label: "Create User",
  },
  {
    href: "/dashboard/users",
    icon: Users,
    label: "All Users",
  },
];
