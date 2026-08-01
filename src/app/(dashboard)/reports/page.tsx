import { ReportsBoard } from "@/components/business/reports-board";
import { Topbar } from "@/components/layout/topbar";

export default function ReportsPage() {
  return (
    <>
      <Topbar
        title="Reports"
        subtitle="Analyze demand, revenue and business performance"
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <ReportsBoard />
      </main>
    </>
  );
}
