"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { BellRing, Clock3, Monitor, Sparkles, Volume2 } from "lucide-react";

import {
  activeStations,
  currentTicket,
  waitingTickets,
} from "@/mocks/public-display";

export function PublicQueueDisplay() {
  const t = useTranslations("display");
  const locale = useLocale();
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const formattedTime = currentTime
    ? new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }).format(currentTime)
    : "--:--:--";

  const formattedDate = currentTime
    ? new Intl.DateTimeFormat(locale, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(currentTime)
    : t("loadingDate");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex flex-col gap-4 border-b border-border bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 lg:py-5">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-6" />
          </div>

          <div>
            <p className="text-2xl font-bold tracking-tight">{t("businessName")}</p>

            <p className="text-sm text-foreground-muted">
              {t("welcome")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-left sm:gap-4 sm:text-right">
          <Clock3 className="size-6 text-primary" />

          <div>
            <p className="text-2xl font-semibold tabular-nums">
              {formattedTime}
            </p>

            <p className="text-sm text-foreground-muted">{formattedDate}</p>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-105px)] gap-4 p-3 sm:gap-6 sm:p-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="flex min-h-125 flex-col overflow-hidden rounded-3xl border border-primary/20 bg-primary text-primary-foreground shadow-xl">
          <div className="flex items-center justify-center gap-3 border-b border-white/20 px-4 py-4 sm:px-8 sm:py-5">
            <BellRing className="size-7" />

            <p className="text-xl font-semibold uppercase tracking-[0.2em]">
              {t("nowCalling")}
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:px-8 sm:py-12">
            <p className="text-lg font-medium uppercase tracking-[0.25em] text-white/75">
              {t("ticket")}
            </p>

            <p className="mt-4 text-[clamp(3.5rem,18vw,13rem)] font-black leading-none tracking-tight">
              {currentTicket.ticket}
            </p>

            <div className="mt-10 rounded-2xl bg-white/15 px-10 py-6 backdrop-blur-sm">
              <p className="text-lg text-white/75">{t("proceedTo")}</p>

              <p className="mt-2 text-4xl font-bold">{currentTicket.station}</p>
            </div>

            <div className="mt-10 flex items-center gap-3 text-lg text-white/80">
              <Volume2 className="size-6" />

              <span>{t("haveTicketReady")}</span>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{t("upNext")}</h2>

                <p className="mt-1 text-sm text-foreground-muted">
                  {t("waitingArea")}
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 className="size-5" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {waitingTickets.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    flex min-h-24 items-center justify-center
                    rounded-2xl border text-3xl font-bold
                    ${
                      index === 0
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground"
                    }
                  `}
                >
                  {item.ticket}
                </div>
              ))}
            </div>
          </section>

          <section className="flex-1 rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{t("inService")}</h2>

                <p className="mt-1 text-sm text-foreground-muted">
                  {t("activeStations")}
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Monitor className="size-5" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {activeStations.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4"
                >
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {item.ticket}
                    </p>

                    <p className="mt-1 text-sm text-foreground-muted">
                      {t("currentlyServed")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-surface-muted px-4 py-3 text-right">
                    <p className="text-xs uppercase tracking-wide text-foreground-muted">
                      {t("station")}
                    </p>

                    <p className="mt-1 font-semibold">{item.station}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-surface-muted px-6 py-4 text-center">
            <p className="text-sm text-foreground-muted">
              {t("thankYou")}
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
