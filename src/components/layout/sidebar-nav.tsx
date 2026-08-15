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
  mobile?: boolean;
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

export function SidebarNav({ items, mobile = false }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={mobile ? "overflow-x-auto px-2 py-2" : "flex-1 p-3"}>
      <ul className={mobile ? "flex min-w-max gap-1" : "space-y-1"}>
        {items.map((item) => {
          const Icon = icons[item.key];

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href} className={mobile ? "w-20 shrink-0" : undefined}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                    flex items-center rounded-lg
                    ${mobile ? "flex-col gap-1 px-2 py-1.5 text-center" : "gap-3 px-3 py-2"}
                    text-sm font-semibold transition-colors
                    ${
                      isActive
                        ? "bg-navigation-active text-navigation-active-foreground"
                        : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                    }
                `}
              >
                <Icon className="size-5 shrink-0 text-current" />

                <span className={mobile ? "w-full truncate text-[0.68rem] leading-4 text-current" : "text-current"}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
