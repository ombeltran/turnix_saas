"use client";

import {
  CalendarDays,
  DollarSign,
  Mail,
  Phone,
  Scissors,
  UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { CustomerStatusBadge } from "@/components/business/customer-status-badge";
import { SidePanel } from "@/components/shared/side-panel";
import { Button } from "@/components/ui/button";
import type { Customer } from "@/mocks/customers";

type CustomerProfilePanelProps = {
  customer: Customer | null;
  onClose: () => void;
};

export function CustomerProfilePanel({
  customer,
  onClose,
}: CustomerProfilePanelProps) {
  const t = useTranslations("customers");
  const appointments = useTranslations("appointments");
  return (
    <SidePanel
      open={customer !== null}
      title={customer?.name ?? t("profile")}
      subtitle={
        customer
          ? t("customerId", { id: customer.id })
          : undefined
      }
      size="lg"
      onClose={onClose}
      footer={
        customer ? (
          <>
            <Button
              type="button"
              variant="outline"
            >
              {t("editCustomer")}
            </Button>

            <Button type="button">
              {appointments("newAppointment")}
            </Button>
          </>
        ) : null
      }
    >
      {customer && (
        <CustomerProfileContent customer={customer} />
      )}
    </SidePanel>
  );
}

function CustomerProfileContent({
  customer,
}: {
  customer: Customer;
}) {
  const t = useTranslations("customers");
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-background p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {customer.initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground">
                {customer.name}
              </h3>

              <CustomerStatusBadge
                status={customer.status}
              />
            </div>

            <p className="mt-1 text-sm text-foreground-muted">
              {t("preferredServiceLabel", { service: customer.preferredService })}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <CustomerContactRow
            icon={Mail}
            value={customer.email}
          />

          <CustomerContactRow
            icon={Phone}
            value={customer.phone}
          />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <CustomerMetric
          icon={CalendarDays}
          label={t("visits")}
          value={String(customer.totalVisits)}
        />

        <CustomerMetric
          icon={DollarSign}
          label={t("totalSpent")}
          value={`$${customer.totalSpent.toFixed(2)}`}
        />

        <CustomerMetric
          icon={Scissors}
          label={t("favorite")}
          value={customer.preferredService}
        />
      </section>

      <section className="rounded-xl border border-border bg-background p-5">
        <h3 className="font-semibold text-foreground">
          {t("customerNotes")}
        </h3>

        <p className="mt-3 text-sm leading-6 text-foreground-muted">
          {customer.notes ??
            t("noNotes")}
        </p>
      </section>

      <section>
        <div className="mb-3">
          <h3 className="font-semibold text-foreground">
            {t("visitHistory")}
          </h3>

          <p className="mt-1 text-sm text-foreground-muted">
            {t("visitHistoryDescription")}
          </p>
        </div>

        {customer.visits.length > 0 ? (
          <div className="space-y-3">
            {customer.visits.map((visit) => (
              <article
                key={visit.id}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <UserRound className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-foreground">
                        {visit.service}
                      </p>

                      <p className="mt-1 text-sm text-foreground-muted">
                        {visit.employee}
                      </p>

                      <p className="mt-1 text-xs text-foreground-subtle">
                        {visit.date}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 font-semibold text-foreground">
                    ${visit.amount.toFixed(2)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-background p-5 text-center sm:p-8">
            <CalendarDays className="mx-auto size-6 text-foreground-muted" />

            <p className="mt-3 font-medium text-foreground">
              {t("noVisitsYet")}
            </p>

            <p className="mt-1 text-sm text-foreground-muted">
              {t("noVisitsDescription")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

type CustomerContactRowProps = {
  icon: React.ElementType;
  value: string;
};

function CustomerContactRow({
  icon: Icon,
  value,
}: CustomerContactRowProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon className="size-4 shrink-0 text-foreground-muted" />

      <span className="truncate text-foreground">
        {value}
      </span>
    </div>
  );
}

type CustomerMetricProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function CustomerMetric({
  icon: Icon,
  label,
  value,
}: CustomerMetricProps) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-background p-4">
      <Icon className="size-5 text-primary" />

      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-foreground-muted">
        {label}
      </p>

      <p
        className="mt-1 truncate font-semibold text-foreground"
        title={value}
      >
        {value}
      </p>
    </div>
  );
}
