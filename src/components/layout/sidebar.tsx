import { getTranslations } from "next-intl/server";

import { navigation } from "@/config/navigation";
import { SidebarNav } from "@/components/layout/sidebar-nav";

export async function Sidebar() {
  const nav = await getTranslations("navigation");

  const items = navigation.map((item) => ({
    key: item.key,
    href: item.href,
    label: nav(item.key),
  }));

  return (
    <>
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-border bg-surface md:flex xl:w-72">
      <div className="border-b border-border p-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Turnix
        </h2>

        <p className="mt-1 text-sm text-foreground-muted">
          Business Queue System
        </p>
      </div>

      <SidebarNav items={items} />
    </aside>
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden">
      <SidebarNav items={items} mobile />
    </div>
    </>
  );
}
