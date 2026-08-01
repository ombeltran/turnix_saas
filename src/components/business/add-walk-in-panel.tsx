"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AlertCircle, UserRound } from "lucide-react";

import { SidePanel } from "@/components/shared/side-panel";
import { Button } from "@/components/ui/button";
import { services } from "@/mocks/services";
import { useTranslations } from "next-intl";

export type WalkInData = {
  customer: string;
  service: string;
  employee?: string;
  priority: boolean;
};

type AddWalkInPanelProps = {
  open: boolean;
  nextTicket: string;
  onClose: () => void;
  onAdd: (walkIn: WalkInData) => void;
};

type QueueProfessional = {
  id: string;
  name: string;
  serviceIds: string[];
  available: boolean;
};

const activeServiceIds = services
  .filter((service) => service.status === "active")
  .map((service) => service.id);

const queueProfessionals: QueueProfessional[] = [
  {
    id: "EMP-001",
    name: "Carlos Méndez",
    serviceIds: activeServiceIds,
    available: false,
  },
  {
    id: "EMP-002",
    name: "Sofia Ramirez",
    serviceIds: activeServiceIds,
    available: false,
  },
  {
    id: "EMP-003",
    name: "Laura Torres",
    serviceIds: activeServiceIds,
    available: true,
  },
  {
    id: "EMP-004",
    name: "David Miller",
    serviceIds: activeServiceIds,
    available: true,
  },
];

export function AddWalkInPanel({
  open,
  nextTicket,
  onClose,
  onAdd,
}: AddWalkInPanelProps) {
  const activeServices = useMemo(
    () => services.filter((service) => service.status === "active"),
    [],
  );
  const t = useTranslations("queue");
  const common = useTranslations("common");

  const [customer, setCustomer] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [priority, setPriority] = useState(false);
  const [error, setError] = useState("");

  const eligibleProfessionals = useMemo(
    () =>
      queueProfessionals.filter((professional) =>
        professional.serviceIds.includes(serviceId),
      ),
    [serviceId],
  );

  function resetForm() {
    setCustomer("");
    setServiceId("");
    setEmployeeId("");
    setPriority(false);
    setError("");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedCustomer = customer.trim();

    const selectedService = activeServices.find(
      (service) => service.id === serviceId,
    );

    if (!normalizedCustomer) {
      setError(t("validation.customerRequired"));
      return;
    }

    if (!selectedService) {
      setError(t("validation.serviceRequired"));
      return;
    }

    const selectedProfessional = queueProfessionals.find(
      (professional) => professional.id === employeeId,
    );

    onAdd({
      customer: normalizedCustomer,
      service: selectedService.name,
      employee: selectedProfessional?.name,
      priority,
    });

    resetForm();
  }

  return (
    <SidePanel
      open={open}
      title={t("addWalkInCustomer")}
      subtitle={t("addWalkInSubtitle")}
      size="md"
      onClose={handleClose}
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            {common("cancel")}
          </Button>

          <Button type="submit" form="add-walk-in-form">
            {t("addToQueue")}
          </Button>
        </>
      }
    >
      <form id="add-walk-in-form" className="space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            {t("nextTicket")}
          </p>

          <p className="mt-1 text-2xl font-semibold text-foreground">
            {nextTicket}
          </p>
        </div>

        {error ? (
          <div className="flex items-start gap-3 rounded-lg border border-danger/30 bg-danger-background p-3 text-sm text-danger">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        <div>
          <label
            htmlFor="walk-in-customer"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {t("customerName")}
          </label>

          <input
            id="walk-in-customer"
            value={customer}
            onChange={(event) => {
              setCustomer(event.target.value);
              setError("");
            }}
            placeholder={t("customerPlaceholder")}
            autoComplete="off"
            className="
              h-10 w-full rounded-lg border border-border-strong
              bg-background px-3 text-sm text-foreground
              outline-none transition
              placeholder:text-foreground-subtle
              focus:border-primary focus:ring-2 focus:ring-primary/20
            "
          />
        </div>

        <div>
          <label
            htmlFor="walk-in-service"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {common("service")}
          </label>

          <select
            id="walk-in-service"
            value={serviceId}
            onChange={(event) => {
              setServiceId(event.target.value);
              setError("");
            }}
            className="
              h-10 w-full rounded-lg border border-border-strong
              bg-background px-3 text-sm text-foreground
              outline-none transition
              focus:border-primary focus:ring-2 focus:ring-primary/20
            "
          >
            <option value="">{t("selectService")}</option>

            {activeServices.map((service) => (
              <option key={service.id} value={service.id}>
                {t("durationOption", {
                  name: service.name,
                  duration: service.duration,
                })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="walk-in-professional"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {t("preferredProfessional")}
          </label>

          <select
            id="walk-in-professional"
            value={employeeId}
            disabled={!serviceId}
            onChange={(event) => setEmployeeId(event.target.value)}
            className="
              h-10 w-full rounded-lg border border-border-strong
              bg-background px-3 text-sm text-foreground
              outline-none transition
              focus:border-primary focus:ring-2 focus:ring-primary/20
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            <option value="">{t("anyProfessional")}</option>

            {eligibleProfessionals.map((professional) => (
              <option key={professional.id} value={professional.id}>
                {professional.name}
                {professional.available
                  ? ` · ${t("available")}`
                  : ` · ${t("busy")}`}
              </option>
            ))}
          </select>

          <p className="mt-2 text-xs text-foreground-muted">
            {t("professionalFilterHelp")}
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4">
          <input
            type="checkbox"
            checked={priority}
            onChange={(event) => setPriority(event.target.checked)}
            className="mt-1 size-4 accent-primary"
          />

          <span className="flex gap-3">
            <UserRound className="mt-0.5 size-5 shrink-0 text-foreground-muted" />

            <span>
              <span className="block text-sm font-medium text-foreground">
                {t("priorityCustomer")}
              </span>

              <span className="mt-1 block text-xs text-foreground-muted">
                {t("priorityDescription")}
              </span>
            </span>
          </span>
        </label>
      </form>
    </SidePanel>
  );
}
