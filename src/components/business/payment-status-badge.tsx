import { Badge } from "@/components/ui/badge";
import type { PaymentStatus } from "@/mocks/payments";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "warning" as const,
  },
  completed: {
    label: "Completed",
    variant: "success" as const,
  },
  refunded: {
    label: "Refunded",
    variant: "danger" as const,
  },
};

export function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}