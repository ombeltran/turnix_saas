"use client";

import { useEffect, useState } from "react";
import { BellRing, Clock3, Monitor, Sparkles, Volume2 } from "lucide-react";

import {
  activeStations,
  currentTicket,
  waitingTickets,
} from "@/mocks/public-display";

export function PublicQueueDisplay() {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const formattedTime = currentTime
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }).format(currentTime)
    : "--:--:--";

  const formattedDate = currentTime
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(currentTime)
    : "Loading date...";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border bg-surface px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-6" />
          </div>

          <div>
            <p className="text-2xl font-bold tracking-tight">Bella Studio</p>

            <p className="text-sm text-foreground-muted">
              Welcome — we will be with you shortly
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <Clock3 className="size-6 text-primary" />

          <div>
            <p className="text-2xl font-semibold tabular-nums">
              {formattedTime}
            </p>

            <p className="text-sm text-foreground-muted">{formattedDate}</p>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-105px)] gap-6 p-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="flex min-h-125 flex-col overflow-hidden rounded-3xl border border-primary/20 bg-primary text-primary-foreground shadow-xl">
          <div className="flex items-center justify-center gap-3 border-b border-white/20 px-8 py-5">
            <BellRing className="size-7" />

            <p className="text-xl font-semibold uppercase tracking-[0.2em]">
              Now calling
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center">
            <p className="text-lg font-medium uppercase tracking-[0.25em] text-white/75">
              Ticket
            </p>

            <p className="mt-4 text-[clamp(6rem,18vw,13rem)] font-black leading-none tracking-tight">
              {currentTicket.ticket}
            </p>

            <div className="mt-10 rounded-2xl bg-white/15 px-10 py-6 backdrop-blur-sm">
              <p className="text-lg text-white/75">Please proceed to</p>

              <p className="mt-2 text-4xl font-bold">{currentTicket.station}</p>
            </div>

            <div className="mt-10 flex items-center gap-3 text-lg text-white/80">
              <Volume2 className="size-6" />

              <span>Please have your ticket ready</span>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Up next</h2>

                <p className="mt-1 text-sm text-foreground-muted">
                  Please remain near the waiting area
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
                <h2 className="text-xl font-semibold">In service</h2>

                <p className="mt-1 text-sm text-foreground-muted">
                  Active service stations
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
                      Currently being served
                    </p>
                  </div>

                  <div className="rounded-xl bg-surface-muted px-4 py-3 text-right">
                    <p className="text-xs uppercase tracking-wide text-foreground-muted">
                      Station
                    </p>

                    <p className="mt-1 font-semibold">{item.station}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-surface-muted px-6 py-4 text-center">
            <p className="text-sm text-foreground-muted">
              Thank you for choosing Bella Studio
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
