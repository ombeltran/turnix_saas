import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";

import { AppointmentStatusBadge } from "@/components/business/appointment-status-badge";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appointments } from "@/mocks/appointments";
import { NewAppointmentPanel } from "@/components/business/new-appointment-panel";
import { getTranslations } from "next-intl/server";

export default async function AppointmentsPage() {
  const t = await getTranslations("appointments");
  const common = await getTranslations("common");
  const dayFilters = [
    { label: t("today"), active: true },
    { label: t("tomorrow"), active: false },
    { label: t("thisWeek"), active: false },
  ];
  return (
    <>
      <Topbar
        title={t("title")}
        subtitle={t("subtitle")}
        actions={<NewAppointmentPanel />}
      />

      <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-(--shadow-sm)">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-wrap items-center gap-2">
                {dayFilters.map((filter) => (
                  <Button
                    key={filter.label}
                    variant={filter.active ? "primary" : "ghost"}
                    size="sm"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="relative">
                  <Search
                    aria-hidden="true"
                    className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted"
                  />

                  <input
                    type="search"
                    placeholder={t("searchPlaceholder")}
                    className="
                      h-10 w-full rounded-lg border border-border
                      bg-background pl-9 pr-3 text-sm text-foreground
                      outline-none transition
                      placeholder:text-foreground-subtle
                      focus:border-primary focus:ring-2 focus:ring-primary/20
                      sm:w-64
                    "
                  />
                </label>

                <Button variant="outline">
                  <Filter className="size-4" />
                  {t("filters")}
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="size-5" />
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    {t("selectedDate")}
                  </p>

                  <p className="text-sm text-foreground-muted">
                    {t("scheduledCount", { count: 6 })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={t("previousDay")}
                >
                  <ChevronLeft className="size-4" />
                </Button>

                <Button variant="outline" size="sm">
                  {t("today")}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  aria-label={t("nextDay")}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>{t("dailySchedule")}</CardTitle>

              <CardDescription>
                {t("scheduleDescription")}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-225 border-collapse">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                        {common("time")}
                      </th>

                      <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                        {common("customer")}
                      </th>

                      <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                        {common("service")}
                      </th>

                      <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                        {common("professional")}
                      </th>

                      <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                        {common("status")}
                      </th>

                      <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                        {common("price")}
                      </th>

                      <th className="pb-3 pl-4 text-right text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                        {common("actions")}
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {appointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="transition-colors hover:bg-surface-muted"
                      >
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2">
                            <Clock3 className="size-4 text-foreground-muted" />

                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {appointment.time}
                              </p>

                              <p className="text-xs text-foreground-muted">
                                {appointment.duration}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <p className="text-sm font-medium text-foreground">
                            {appointment.customer}
                          </p>

                          <p className="text-xs text-foreground-muted">
                            {appointment.phone}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-sm text-foreground">
                          {appointment.service}
                        </td>

                        <td className="px-4 py-4 text-sm text-foreground">
                          {appointment.employee}
                        </td>

                        <td className="px-4 py-4">
                          <AppointmentStatusBadge
                            status={appointment.status}
                          />
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-foreground">
                          ${appointment.price.toFixed(2)}
                        </td>

                        <td className="py-4 pl-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t("actionsFor", { customer: appointment.customer })}
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
