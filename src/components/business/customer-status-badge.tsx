import { Badge } from "@/components/ui/badge";
import type { CustomerStatus } from "@/mocks/customers";

type CustomerStatusBadgeProps = {
  status: CustomerStatus;
};

export function CustomerStatusBadge({
  status,
}: CustomerStatusBadgeProps) {
  return (
    <Badge
      variant={
        status === "active"
          ? "success"
          : "neutral"
      }
    >
      {status === "active" ? "Active" : "Inactive"}
    </Badge>
  );
}