"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Clock3,
  Monitor,
  MoreHorizontal,
  Play,
  Plus,
  SkipForward,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";

import { QueueStatusBadge } from "@/components/business/queue-status-badge";
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
import { initialQueue, type QueueItem } from "@/mocks/queue";
import Link from "next/link";

export function QueueBoard() {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);

  const waitingCustomers = useMemo(
    () => queue.filter((item) => item.status === "waiting"),
    [queue],
  );

  const activeCustomers = useMemo(
    () =>
      queue.filter(
        (item) => item.status === "called" || item.status === "inService",
      ),
    [queue],
  );

  const averageWait = waitingCustomers.length
    ? Math.round(
        waitingCustomers.reduce((total, item) => total + item.waitMinutes, 0) /
          waitingCustomers.length,
      )
    : 0;

  function updateStatus(id: string, status: QueueItem["status"]) {
    setQueue((currentQueue) =>
      currentQueue.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );
  }

  function callNextCustomer() {
    const nextCustomer =
      waitingCustomers.find((item) => item.priority) ?? waitingCustomers[0];

    if (!nextCustomer) {
      return;
    }

    updateStatus(nextCustomer.id, "called");
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Customers waiting"
          value={waitingCustomers.length}
          description="currently in the queue"
          icon={UsersRound}
          variant="warning"
        />

        <StatCard
          title="Average wait"
          value={`${averageWait} min`}
          description="estimated waiting time"
          icon={Clock3}
          variant="info"
        />

        <StatCard
          title="In service"
          value={queue.filter((item) => item.status === "inService").length}
          description="customers being attended"
          icon={UserRoundCheck}
          variant="primary"
        />

        <StatCard
          title="Completed today"
          value={18}
          description="services completed"
          trend="+12%"
          icon={Check}
          variant="success"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Waiting queue</CardTitle>

              <CardDescription>Customers waiting to be called</CardDescription>
            </div>

            <Button
              onClick={callNextCustomer}
              disabled={waitingCustomers.length === 0}
            >
              <SkipForward className="size-4" />
              Call next
            </Button>
          </CardHeader>

          <CardContent>
            {waitingCustomers.length > 0 ? (
              <div className="space-y-3">
                {waitingCustomers.map((item, index) => (
                  <div
                    key={item.id}
                    className="
                      flex flex-col gap-4 rounded-xl
                      border border-border bg-background p-4
                      transition-colors hover:bg-surface-muted
                      md:flex-row md:items-center
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex size-14 shrink-0 items-center
                          justify-center rounded-xl bg-primary
                          text-base font-semibold
                          text-primary-foreground
                        "
                      >
                        {item.ticket}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-foreground">
                            {item.customer}
                          </p>

                          {item.priority ? (
                            <Badge variant="danger">Priority</Badge>
                          ) : null}

                          {index === 0 ? (
                            <Badge variant="primary">Next</Badge>
                          ) : null}
                        </div>

                        <p className="mt-1 text-sm text-foreground-muted">
                          {item.service}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-wrap items-center gap-6 md:justify-end">
                      <div>
                        <p className="text-xs text-foreground-muted">Arrival</p>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {item.arrivalTime}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-foreground-muted">Waiting</p>

                        <p className="mt-1 text-sm font-semibold text-warning">
                          {item.waitMinutes} min
                        </p>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => updateStatus(item.id, "called")}
                      >
                        Call
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`More actions for ${item.ticket}`}
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-success-background text-success">
                  <Check className="size-6" />
                </div>

                <p className="mt-4 font-semibold text-foreground">
                  No customers waiting
                </p>

                <p className="mt-1 text-sm text-foreground-muted">
                  The waiting queue is currently empty.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current service</CardTitle>

            <CardDescription>
              Called customers and active stations
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {activeCustomers.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
                        {item.ticket}
                      </div>

                      <div>
                        <p className="font-semibold text-foreground">
                          {item.customer}
                        </p>

                        <p className="mt-0.5 text-sm text-foreground-muted">
                          {item.service}
                        </p>
                      </div>
                    </div>

                    <QueueStatusBadge status={item.status} />
                  </div>

                  {item.employee ? (
                    <div className="mt-4 rounded-lg bg-surface-muted px-3 py-2">
                      <p className="text-xs text-foreground-muted">
                        Assigned professional
                      </p>

                      <p className="mt-1 text-sm font-medium text-foreground">
                        {item.employee}
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.status === "called" ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(item.id, "inService")}
                        >
                          <Play className="size-4" />
                          Start service
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(item.id, "absent")}
                        >
                          <X className="size-4" />
                          Absent
                        </Button>
                      </>
                    ) : null}

                    {item.status === "inService" ? (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(item.id, "completed")}
                      >
                        <Check className="size-4" />
                        Finish service
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Queue operations</CardTitle>

            <CardDescription>
              Manage walk-ins and public queue information
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Button className="justify-start" variant="outline">
              <Plus className="size-4" />
              Add walk-in customer
            </Button>

            <Link
              href="/display"
              target="_blank"
              className="
                  inline-flex min-h-10 items-center justify-start gap-2
                  rounded-lg border border-border bg-surface px-4
                  text-sm font-medium text-foreground
                  transition hover:bg-surface-hover
                "
            >
              <Monitor className="size-4" />
              Open public display
            </Link>

            <Button className="justify-start" variant="outline">
              <UserRoundCheck className="size-4" />
              Manage service stations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
