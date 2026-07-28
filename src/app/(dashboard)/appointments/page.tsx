import { Topbar } from "@/components/layout/topbar";
import { getTranslations } from "next-intl/server";

export default async function CustomersPage() {
  const home = await getTranslations("home");

  return (
    <>
      <Topbar
        title={home("title")}
        subtitle={home("subtitle")}
      />

      <main className="flex-1 p-6">
        Próximamente...
      </main>
    </>
  );
}