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

import {
  AddWalkInPanel,
  type WalkInData,
} from "@/components/business/add-walk-in-panel";

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
import { useTranslations } from "next-intl";

type QueueBoardProps = {
  isWalkInPanelOpen: boolean;
  onWalkInPanelOpenChange: (open: boolean) => void;
};

export function QueueBoard({
  isWalkInPanelOpen,
  onWalkInPanelOpenChange,
}: QueueBoardProps) {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const waitingCustomers = useMemo(
    () => queue.filter((item) => item.status === "waiting"),
    [queue],
  );

  const t = useTranslations("queue");
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

  const nextTicket = useMemo(() => {
    const highestTicketNumber = queue.reduce((highest, item) => {
      const ticketNumber = Number(item.ticket.split("-")[1]);

      if (Number.isNaN(ticketNumber)) {
        return highest;
      }

      return Math.max(highest, ticketNumber);
    }, 0);

    return `A-${String(highestTicketNumber + 1).padStart(3, "0")}`;
  }, [queue]);

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

  function addWalkIn(walkIn: WalkInData) {
    const now = new Date();

    const newQueueItem: QueueItem = {
      id: `QUEUE-${crypto.randomUUID()}`,
      ticket: nextTicket,
      customer: walkIn.customer,
      service: walkIn.service,
      employee: walkIn.employee,
      arrivalTime: now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      waitMinutes: 0,
      status: "waiting",
      priority: walkIn.priority,
    };

    setQueue((currentQueue) => [...currentQueue, newQueueItem]);
    onWalkInPanelOpenChange(false);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title={t("customersWaiting")}
          value={waitingCustomers.length}
          description={t("currentlyInQueue")}
          icon={UsersRound}
          variant="warning"
        />

        <StatCard
          title={t("averageWait")}
          value={t("waitMinutes", { minutes: averageWait })}
          description={t("estimatedWaitingTime")}
          icon={Clock3}
          variant="info"
        />

        <StatCard
          title={t("inService")}
          value={queue.filter((item) => item.status === "inService").length}
          description={t("customersBeingAttended")}
          icon={UserRoundCheck}
          variant="primary"
        />

        <StatCard
          title={t("completedToday")}
          value={18}
          description={t("servicesCompleted")}
          trend="+12%"
          icon={Check}
          variant="success"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>{t("waitingQueue")}</CardTitle>

              <CardDescription>{t("waitingQueueDescription")}</CardDescription>
            </div>

            <Button
              onClick={callNextCustomer}
              disabled={waitingCustomers.length === 0}
            >
              <SkipForward className="size-4" />
              {t("CallNext")}
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
                            <Badge variant="danger">{t("priority")}</Badge>
                          ) : null}

                          {index === 0 ? (
                            <Badge variant="primary">{t("next")}</Badge>
                          ) : null}
                        </div>

                        <p className="mt-1 text-sm text-foreground-muted">
                          {item.service}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-wrap items-center gap-6 md:justify-end">
                      <div>
                        <p className="text-xs text-foreground-muted">
                          {t("arrival")}
                        </p>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {item.arrivalTime}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-foreground-muted">
                          {t("waiting")}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-warning">
                          {t("waitMinutes", {minutes: item.waitMinutes})}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => updateStatus(item.id, "called")}
                      >
                        {t("call")}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t("moreActions", {ticket: item.ticket})}
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
                  {t("noCustomersWaiting")}
                </p>

                <p className="mt-1 text-sm text-foreground-muted">
                  {t("emptyQueue")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("currentService")}</CardTitle>

            <CardDescription>
              {t("calledCustomersAndActiveStations")}
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
                        {t("assignedProfessional")}
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
                          {t("startService")}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(item.id, "absent")}
                        >
                          <X className="size-4" />
                          {t("absent")}
                        </Button>
                      </>
                    ) : null}

                    {item.status === "inService" ? (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(item.id, "completed")}
                      >
                        <Check className="size-4" />
                        {t("finishService")}
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
            <CardTitle>{t("queueOperations")}</CardTitle>

            <CardDescription>
              {t("queueOperationsDescription")}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Button
              className="justify-start"
              variant="outline"
              onClick={() => onWalkInPanelOpenChange(true)}
            >
              <Plus className="size-4" />
              {t("addWalkInCustomer")}
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
              {t("openPublicDisplay")}
            </Link>

            <Button className="justify-start" variant="outline">
              <UserRoundCheck className="size-4" />
              {t("manageStations")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddWalkInPanel
        open={isWalkInPanelOpen}
        nextTicket={nextTicket}
        onClose={() => onWalkInPanelOpenChange(false)}
        onAdd={addWalkIn}
      />
    </div>
  );
}
