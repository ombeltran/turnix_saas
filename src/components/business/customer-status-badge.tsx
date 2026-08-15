import { Badge } from "@/components/ui/badge";
import type { CustomerStatus } from "@/mocks/customers";
import { useTranslations } from "next-intl";

type CustomerStatusBadgeProps = {
  status: CustomerStatus;
};

export function CustomerStatusBadge({
  status,
}: CustomerStatusBadgeProps) {
  const common = useTranslations("common");
  return (
    <Badge
      variant={
        status === "active"
          ? "success"
          : "neutral"
      }
    >
      {status === "active" ? common("active") : common("inactive")}
    </Badge>
  );
}
