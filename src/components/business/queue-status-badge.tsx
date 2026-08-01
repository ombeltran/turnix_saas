'use client';

import { Badge } from "@/components/ui/badge";
import type { QueueStatus } from "@/mocks/queue";
import { useTranslations } from "next-intl";

type QueueStatusBadgeProps = {
  status: QueueStatus;
};

const statusConfig = {
  waiting: {
    translationKey: "waiting",
    variant: "warning" as const,
  },
  called: {
    translationKey: "called",
    variant: "info" as const,
  },
  inService: {
    translationKey: "inService",
    variant: "primary" as const,
  },
  completed: {
    translationKey: "completed",
    variant: "success" as const,
  },
  absent: {
    translationKey: "absent",
    variant: "danger" as const,
  },
} satisfies Record<
  QueueStatus,
  {
    translationKey:
      | "waiting"
      | "called"
      | "inService"
      | "completed"
      | "absent";
    variant: "warning" | "info" | "primary" | "success" | "danger";
  }
>;

export function QueueStatusBadge({
  status,
}: QueueStatusBadgeProps) {
  const config = statusConfig[status];
  const t = useTranslations("queue");

  return (
    <Badge variant={config.variant}>
      {t(config.translationKey)}
    </Badge>
  );
}