import { Badge } from "@/components/ui/badge";
import type { AppointmentStatus } from "@/mocks/appointments";
import { useTranslations } from "next-intl";

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus;
};

const statusConfig = {
  confirmed: {
    variant: "primary" as const,
  },
  pending: {
    variant: "warning" as const,
  },
  arrived: {
    variant: "info" as const,
  },
  inService: {
    variant: "info" as const,
  },
  completed: {
    variant: "success" as const,
  },
  cancelled: {
    variant: "danger" as const,
  },
};

export function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const t = useTranslations("appointments");
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {t(status)}
    </Badge>
  );
}
