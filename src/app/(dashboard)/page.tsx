import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListOrdered,
  Plus,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe } from "lucide-react";
import Link from "next/link";

const upcomingAppointments = [
  {
    time: "9:00 AM",
    customer: "Laura Martínez",
    service: "Haircut & Styling",
    employee: "Sofia",
    status: "Confirmed",
  },
  {
    time: "10:30 AM",
    customer: "Daniel Wilson",
    service: "Beard Trim",
    employee: "Carlos",
    status: "Waiting",
  },
  {
    time: "11:15 AM",
    customer: "Emma Johnson",
    service: "Hair Color",
    employee: "Sofia",
    status: "Confirmed",
  },
];

const queueItems = [
  {
    ticket: "A-014",
    customer: "Michael Brown",
    service: "Haircut",
    wait: "8 min",
  },
  {
    ticket: "A-015",
    customer: "Ana Torres",
    service: "Manicure",
    wait: "5 min",
  },
  {
    ticket: "A-016",
    customer: "James Smith",
    service: "Beard Trim",
    wait: "2 min",
  },
];

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  return (
    <>
      <Topbar
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <>
            <Button>
              <Plus className="size-4" />
              New appointment
            </Button>
            <Button variant="outline">
              <Link
                href="/booking"
                target="_blank"
                className="flex w-fit items-center gap-2"
              >
                <Globe className="size-4" />
                View booking site
              </Link>
            </Button>
            {/* <Button variant="outline">
              <UserRoundPlus className="size-4" />
              New walk-in
            </Button> */}
          </>
        }
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Today's appointments"
              value={24}
              description="compared with yesterday"
              trend="+12%"
              icon={CalendarDays}
              variant="primary"
            />

            <StatCard
              title="Customers waiting"
              value={8}
              description="average wait: 7 min"
              icon={ListOrdered}
              variant="warning"
            />

            <StatCard
              title="Services completed"
              value={18}
              description="75% of today's schedule"
              icon={CheckCircle2}
              variant="success"
            />

            <StatCard
              title="Today's revenue"
              value="$1,245"
              description="from 21 payments"
              trend="+8.4%"
              icon={Banknote}
              variant="info"
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <Card>
              <CardHeader className="flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>Upcoming appointments</CardTitle>
                  <CardDescription>
                    The next scheduled customers for today
                  </CardDescription>
                </div>

                <Button variant="ghost" size="sm">
                  View schedule
                </Button>
              </CardHeader>

              <CardContent>
                <div className="divide-y divide-border">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={`${appointment.time}-${appointment.customer}`}
                      className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-24 items-center gap-2">
                        <Clock3 className="size-4 text-foreground-muted" />

                        <span className="text-sm font-semibold text-foreground">
                          {appointment.time}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {appointment.customer}
                        </p>

                        <p className="truncate text-sm text-foreground-muted">
                          {appointment.service} · {appointment.employee}
                        </p>
                      </div>

                      <Badge
                        variant={
                          appointment.status === "Confirmed"
                            ? "success"
                            : "warning"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>Live queue</CardTitle>
                  <CardDescription>Customers currently waiting</CardDescription>
                </div>

                <Badge variant="warning">{queueItems.length} waiting</Badge>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {queueItems.map((item) => (
                    <div
                      key={item.ticket}
                      className="flex items-center gap-3 rounded-lg border border-border bg-surface-muted p-3"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground p-4 w-fit">
                        {item.ticket}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {item.customer}
                        </p>

                        <p className="truncate text-sm text-foreground-muted">
                          {item.service}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-medium text-warning">
                        {item.wait}
                      </span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="mt-4 w-full">
                  Open queue
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
