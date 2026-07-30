import { Badge } from "@/components/ui/badge";
import type { AppointmentStatus } from "@/mocks/appointments";

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus;
};

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    variant: "primary" as const,
  },
  pending: {
    label: "Pending",
    variant: "warning" as const,
  },
  arrived: {
    label: "Arrived",
    variant: "info" as const,
  },
  inService: {
    label: "In service",
    variant: "info" as const,
  },
  completed: {
    label: "Completed",
    variant: "success" as const,
  },
  cancelled: {
    label: "Cancelled",
    variant: "danger" as const,
  },
};

export function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}