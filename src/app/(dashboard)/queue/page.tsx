import { Monitor, Plus } from "lucide-react";
import Link from "next/link";
import { QueueBoard } from "@/components/business/queue-board";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";

export default function QueuePage() {
  return (
    <>
      <Topbar
        title="Queue"
        subtitle="Manage walk-in customers and service stations"
        actions={
          <>
            <Link
              href="/display"
              target="_blank"
              className="
                    inline-flex h-10 items-center justify-center gap-2
                    rounded-lg border border-border bg-surface px-4
                    text-sm font-medium text-foreground
                    transition hover:bg-surface-hover
                  "
            >
              <Monitor className="size-4" />
              Public display
            </Link>

            <Button>
              <Plus className="size-4" />
              Add walk-in
            </Button>
          </>
        }
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <QueueBoard />
      </main>
    </>
  );
}
