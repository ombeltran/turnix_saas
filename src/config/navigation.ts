export type NavigationKey =
  | "dashboard"
  | "appointments"
  | "queue"
  | "customers"
  | "services"
  | "employees"
  | "payments"
  | "reports"
  | "settings";

export type NavigationItem = {
  key: NavigationKey;
  href: string;
};

export const navigation: NavigationItem[] = [
  {
    key: "dashboard",
    href: "/",
  },
  {
    key: "appointments",
    href: "/appointments",
  },
  {
    key: "queue",
    href: "/queue",
  },
  {
    key: "customers",
    href: "/customers",
  },
  {
    key: "services",
    href: "/services",
  },
  {
    key: "payments",
    href: "/payments",
  },
  {
    key: "employees",
    href: "/employees",
  },
  {
    key: "reports",
    href: "/reports",
  },
  {
    key: "settings",
    href: "/settings",
  },
];

export const dashboardNavigation = [
  {
    label: "Resumen",
    href: "/dashboard",
    icon: "LayoutDashboard",
    module: "core",
  },
  {
    label: "Citas",
    href: "/appointments",
    icon: "CalendarDays",
    module: "appointments",
  },
  {
    label: "Turnos",
    href: "/queue",
    icon: "ListOrdered",
    module: "queue",
  },
];
