"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  CalendarCheck,
  CircleDollarSign,
  Clock3,
  Scissors,
  Star,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  reportData,
  type AppointmentStatusSummary,
  type ReportPeriod,
  type TrendPoint,
} from "@/mocks/reports";

const statusStyles: Record<AppointmentStatusSummary["status"], string> = {
  completed: "bg-success",
  scheduled: "bg-primary",
  cancelled: "bg-warning",
  "no-show": "bg-danger",
};

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function AppointmentsChart({ data, ariaLabel }: { data: TrendPoint[]; ariaLabel: string }) {
  const width = 680;
  const height = 220;
  const paddingX = 34;
  const paddingTop = 22;
  const paddingBottom = 40;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;
  const maxValue = Math.max(...data.map((point) => point.appointments), 1);
  const stepX = data.length > 1 ? chartWidth / (data.length - 1) : chartWidth;

  const coordinates = data.map((point, index) => ({
    ...point,
    x: paddingX + index * stepX,
    y: paddingTop + chartHeight - (point.appointments / maxValue) * chartHeight,
  }));

  const linePath = coordinates
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${coordinates.at(-1)?.x ?? paddingX} ${
    paddingTop + chartHeight
  } L ${coordinates[0]?.x ?? paddingX} ${paddingTop + chartHeight} Z`;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-150 w-full"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id="reports-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.24" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 0.33, 0.66, 1].map((ratio) => {
          const y = paddingTop + chartHeight * ratio;

          return (
            <line
              key={ratio}
              x1={paddingX}
              x2={width - paddingX}
              y1={y}
              y2={y}
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          );
        })}

        <path d={areaPath} fill="url(#reports-chart-fill)" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {coordinates.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="var(--surface)"
              stroke="var(--primary)"
              strokeWidth="3"
            />
            <text
              x={point.x}
              y={height - 12}
              textAnchor="middle"
              fill="var(--foreground-muted)"
              fontSize="12"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ReportsBoard() {
  const t = useTranslations("reports");
  const locale = useLocale();
  const periodOptions: Array<{ value: ReportPeriod; label: string }> = [
    { value: "week", label: t("period.week") },
    { value: "month", label: t("period.month") },
    { value: "30days", label: t("period.last30Days") },
  ];
  const [period, setPeriod] = useState<ReportPeriod>("week");
  const dataset = reportData[period];

  const totalStatusValue = useMemo(
    () => dataset.statuses.reduce((total, item) => total + item.value, 0),
    [dataset.statuses],
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{t("overview")}</p>
          <p className="mt-1 text-sm text-foreground-muted">
            {t("overviewDescription")}
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-foreground-muted">
          {t("periodLabel")}
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value as ReportPeriod)}
            className="h-10 rounded-lg border border-border-strong bg-surface px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title={t("appointments")}
          value={dataset.metric.appointments}
          trend={dataset.metric.appointmentsTrend}
          description={t("previousPeriod")}
          icon={CalendarCheck}
          variant="primary"
        />
        <StatCard
          title={t("customersServed")}
          value={dataset.metric.customers}
          trend={dataset.metric.customersTrend}
          description={t("previousPeriod")}
          icon={UsersRound}
          variant="info"
        />
        <StatCard
          title={t("revenue")}
          value={formatCurrency(dataset.metric.revenue, locale)}
          trend={dataset.metric.revenueTrend}
          description={t("previousPeriod")}
          icon={CircleDollarSign}
          variant="success"
        />
        <StatCard
          title={t("averageTicket")}
          value={`$${dataset.metric.averageTicket.toFixed(2)}`}
          trend={dataset.metric.ticketTrend}
          description={t("perCompletedService")}
          icon={TrendingUp}
          variant="warning"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
        <Card>
          <CardHeader className="items-start justify-between gap-4 sm:flex-row">
            <div>
              <CardTitle>{t("appointmentsTrend")}</CardTitle>
              <CardDescription>{t("trendDescription")}</CardDescription>
            </div>
            <div className="rounded-lg bg-info-background px-3 py-2 text-right">
              <p className="text-xs text-foreground-muted">{t("peakDay")}</p>
              <p className="mt-0.5 text-sm font-semibold text-primary">{dataset.peakDay}</p>
            </div>
          </CardHeader>
          <CardContent>
            <AppointmentsChart data={dataset.trend} ariaLabel={t("appointmentsTrend")} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("appointmentStatus")}</CardTitle>
            <CardDescription>{t("appointmentCount", { count: totalStatusValue })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex h-3 overflow-hidden rounded-full bg-surface-muted">
              {dataset.statuses.map((item) => (
                <div
                  key={item.status}
                  className={statusStyles[item.status]}
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.label}: ${item.percentage}%`}
                />
              ))}
            </div>

            <div className="space-y-3">
              {dataset.statuses.map((item) => (
                <div key={item.status} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`size-2.5 rounded-full ${statusStyles[item.status]}`} />
                    <span className="text-sm text-foreground">
                      {t(item.status === "no-show" ? "noShow" : item.status === "scheduled" ? "confirmed" : item.status)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">{item.value}</span>
                    <span className="ml-2 text-xs text-foreground-muted">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("topServices")}</CardTitle>
            <CardDescription>{t("topServicesDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {dataset.services.map((service, index) => (
              <div key={service.id}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Scissors className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {index + 1}. {service.name}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {t("serviceAppointments", { count: service.appointments })}
                      </p>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-foreground">
                    {formatCurrency(service.revenue, locale)}
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${service.share}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("employeePerformance")}</CardTitle>
            <CardDescription>{t("employeePerformanceDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-125 border-collapse">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">{t("employee")}</th>
                    <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wide text-foreground-muted">{t("services")}</th>
                    <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wide text-foreground-muted">{t("revenue")}</th>
                    <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wide text-foreground-muted">{t("rating")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {dataset.employees.map((employee) => (
                    <tr key={employee.id} className="transition-colors hover:bg-surface-muted">
                      <td className="py-4 pr-3">
                        <p className="text-sm font-medium text-foreground">{employee.name}</p>
                        <p className="mt-1 text-xs text-foreground-muted">{employee.role}</p>
                      </td>
                      <td className="px-3 py-4 text-right text-sm text-foreground">{employee.appointments}</td>
                      <td className="px-3 py-4 text-right text-sm font-medium text-foreground">{formatCurrency(employee.revenue, locale)}</td>
                      <td className="py-4 pl-3">
                        <div className="flex items-center justify-end gap-1 text-sm font-medium text-foreground">
                          <Star className="size-4 fill-warning text-warning" />
                          {employee.rating.toFixed(1)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="grid gap-4 pt-5 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl bg-surface-muted p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-info-background text-primary">
              <CalendarCheck className="size-5" />
            </div>
            <div>
              <p className="text-sm text-foreground-muted">{t("busiestDay")}</p>
              <p className="mt-1 font-semibold text-foreground">{dataset.peakDay}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-surface-muted p-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-warning-background text-warning">
              <Clock3 className="size-5" />
            </div>
            <div>
              <p className="text-sm text-foreground-muted">{t("peakServiceTime")}</p>
              <p className="mt-1 font-semibold text-foreground">{dataset.peakTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
