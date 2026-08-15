import { Badge } from "@/components/ui/badge";
import type { PaymentStatus } from "@/mocks/payments";
import { useTranslations } from "next-intl";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

const statusConfig = {
  pending: {
    variant: "warning" as const,
  },
  completed: {
    variant: "success" as const,
  },
  refunded: {
    variant: "danger" as const,
  },
};

export function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const t = useTranslations("payments");
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {t(status)}
    </Badge>
  );
}
