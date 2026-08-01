import { EmployeesBoard } from "@/components/business/employees-board";
import { Topbar } from "@/components/layout/topbar";

export default function EmployeesPage() {
  return (
    <>
      <Topbar
        title="Employees"
        subtitle="Manage your team, services and queue assignments"
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <EmployeesBoard />
      </main>
    </>
  );
}
