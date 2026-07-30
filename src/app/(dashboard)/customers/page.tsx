import { Download } from "lucide-react";

import { CustomersBoard } from "@/components/business/customers-board";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";

export default function CustomersPage() {
  return (
    <>
      <Topbar
        title="Customers"
        subtitle="Manage customer profiles, visits and activity"
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" />
              Export
            </Button>
          </>
        }
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <CustomersBoard />
      </main>
    </>
  );
}