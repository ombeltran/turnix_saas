import { EmployeesBoard } from "@/components/business/employees-board";
import { Topbar } from "@/components/layout/topbar";
import { getTranslations } from "next-intl/server";

export default async function EmployeesPage() {
  const t = await getTranslations("employees");

  return (
    <>
      <Topbar
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
        <EmployeesBoard />
      </main>
    </>
  );
}
