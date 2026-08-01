import { Download } from "lucide-react";

import { PaymentsBoard } from "@/components/business/payments-board";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
  return (
    <>
      <Topbar
        title="Payments"
        subtitle="Manage transactions, revenue and pending charges"
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" />
              Export
            </Button>

            {/* <Button>
              <Plus className="size-4" />
              New payment
            </Button> */}
          </>
        }
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <PaymentsBoard />
      </main>
    </>
  );
}