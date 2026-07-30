import { Badge } from "@/components/ui/badge";
import type { QueueStatus } from "@/mocks/queue";

type QueueStatusBadgeProps = {
  status: QueueStatus;
};

const statusConfig = {
  waiting: {
    label: "Waiting",
    variant: "warning" as const,
  },
  called: {
    label: "Called",
    variant: "info" as const,
  },
  inService: {
    label: "In service",
    variant: "primary" as const,
  },
  completed: {
    label: "Completed",
    variant: "success" as const,
  },
  absent: {
    label: "Absent",
    variant: "danger" as const,
  },
};

export function QueueStatusBadge({
  status,
}: QueueStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}