import { Download } from "lucide-react";

import { CustomersBoard } from "@/components/business/customers-board";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function CustomersPage() {
  const t = await getTranslations("customers");
  return (
    <>
      <Topbar
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" />
              {t("export")}
            </Button>
          </>
        }
      />

      <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
        <CustomersBoard />
      </main>
    </>
  );
}
