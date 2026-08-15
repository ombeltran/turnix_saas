import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background pb-20 md:pb-0">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
