import { SettingsBoard } from "@/components/business/settings-board";
import { Topbar } from "@/components/layout/topbar";

export default function SettingsPage() {
  return (
    <>
      <Topbar
        title="Settings"
        subtitle="Configure your business, bookings and queue preferences"
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <SettingsBoard />
      </main>
    </>
  );
}
