"use client";

import { useState } from "react";
import { Monitor, Plus } from "lucide-react";
import Link from "next/link";

import { QueueBoard } from "@/components/business/queue-board";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function QueuePage() {
  const [isWalkInPanelOpen, setIsWalkInPanelOpen] = useState(false);
  const t = useTranslations("queue");

  return (
    <>
      <Topbar
        title={t("title")}
       subtitle={t("subtitle")}
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
              {t("publicDisplay")}
            </Link>

            <Button onClick={() => setIsWalkInPanelOpen(true)}>
              <Plus className="size-4" />
              {t("addWalkIn")}
            </Button>
          </>
        }
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <QueueBoard
          isWalkInPanelOpen={isWalkInPanelOpen}
          onWalkInPanelOpenChange={setIsWalkInPanelOpen}
        />
      </main>
    </>
  );
}