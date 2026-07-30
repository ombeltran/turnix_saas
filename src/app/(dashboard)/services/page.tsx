import { ServicesBoard } from "@/components/business/services-board";
import { Topbar } from "@/components/layout/topbar";

export default function ServicesPage() {
  return (
    <>
      <Topbar
        title="Services"
        subtitle="Manage services, pricing and availability"
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <ServicesBoard />
      </main>
    </>
  );
}