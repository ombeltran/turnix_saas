"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChartColumn,
  ClipboardList,
  LayoutDashboard,
  Scissors,
  Settings,
  Banknote,
  Users,
  UserRoundCog,
  type LucideIcon,
} from "lucide-react";

import type { NavigationKey } from "@/config/navigation";

type SidebarNavItem = {
  key: NavigationKey;
  href: string;
  label: string;
};

type SidebarNavProps = {
  items: SidebarNavItem[];
};

const icons: Record<NavigationKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  appointments: CalendarDays,
  queue: ClipboardList,
  customers: Users,
  services: Scissors,
  payments: Banknote,
  employees: UserRoundCog,
  reports: ChartColumn,
  settings: Settings,
};

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-3">
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = icons[item.key];

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                    flex items-center gap-3 rounded-lg px-3 py-2
                    text-sm font-semibold transition-colors
                    ${
                      isActive
                        ? "bg-navigation-active text-navigation-active-foreground"
                        : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                    }
                `}
              >
                <Icon className="size-5 shrink-0 text-current" />

                <span className="text-current">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
