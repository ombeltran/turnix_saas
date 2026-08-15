import { ReportsBoard } from "@/components/business/reports-board";
import { Topbar } from "@/components/layout/topbar";
import { getTranslations } from "next-intl/server";

export default async function ReportsPage() {
  const t = await getTranslations("reports");
  return (
    <>
      <Topbar
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
        <ReportsBoard />
      </main>
    </>
  );
}
