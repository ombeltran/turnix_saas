"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  DollarSign,
  MoreHorizontal,
  ReceiptText,
  Smartphone,
  WalletCards,
} from "lucide-react";

import { PaymentStatusBadge } from "@/components/business/payment-status-badge";
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
import {
  initialPayments,
  type Payment,
  type PaymentMethod,
} from "@/mocks/payments";
import { PaymentCheckoutPanel } from "@/components/business/payment-checkout-panel";

export function PaymentsBoard() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const completedPayments = useMemo(
    () => payments.filter((payment) => payment.status === "completed"),
    [payments],
  );

  const pendingPayments = useMemo(
    () => payments.filter((payment) => payment.status === "pending"),
    [payments],
  );

  const totalRevenue = completedPayments.reduce(
    (total, payment) => total + payment.total,
    0,
  );

  const totalTips = completedPayments.reduce(
    (total, payment) => total + payment.tip,
    0,
  );

  function completePayment(
    id: string,
    method: PaymentMethod,
    tip: number,
    discount: number,
  ) {
    setPayments((currentPayments) =>
      currentPayments.map((payment) => {
        if (payment.id !== id) {
          return payment;
        }

        return {
          ...payment,
          status: "completed",
          method,
          tip,
          discount,
          total: Math.max(0, payment.amount + tip - discount),
        };
      }),
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today's revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          description="completed payments"
          icon={DollarSign}
          variant="success"
        />

        <StatCard
          title="Pending payments"
          value={pendingPayments.length}
          description="services awaiting payment"
          icon={ReceiptText}
          variant="warning"
        />

        <StatCard
          title="Completed payments"
          value={completedPayments.length}
          description="transactions today"
          icon={CheckCircle2}
          variant="primary"
        />

        <StatCard
          title="Tips received"
          value={`$${totalTips.toFixed(2)}`}
          description="additional earnings"
          icon={WalletCards}
          variant="info"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Pending payments</CardTitle>

            <CardDescription>
              Services completed and ready to be charged
            </CardDescription>
          </CardHeader>

          <CardContent>
            {pendingPayments.length > 0 ? (
              <div className="space-y-3">
                {pendingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="
                      flex flex-col gap-4 rounded-xl
                      border border-border bg-background p-4
                      lg:flex-row lg:items-center
                    "
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ReceiptText className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">
                          {payment.customer}
                        </p>

                        <p className="mt-1 text-sm text-foreground-muted">
                          {payment.service}
                        </p>

                        <p className="mt-1 text-xs text-foreground-subtle">
                          {payment.employee} · {payment.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="mr-2">
                        <p className="text-xs text-foreground-muted">
                          Amount due
                        </p>

                        <p className="mt-1 text-xl font-bold text-foreground">
                          ${payment.total.toFixed(2)}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <CreditCard className="size-4" />
                        Charge
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`More options for ${payment.customer}`}
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
                  <CheckCircle2 className="size-6" />
                </div>

                <p className="mt-4 font-semibold text-foreground">
                  All payments completed
                </p>

                <p className="mt-1 text-sm text-foreground-muted">
                  There are no services awaiting payment.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment methods</CardTitle>

            <CardDescription>
              Revenue distribution by payment type
            </CardDescription>
          </CardHeader>

          <CardContent>
            <PaymentMethodSummary
              icon={Banknote}
              label="Cash"
              value={getMethodTotal(completedPayments, "cash")}
            />

            <PaymentMethodSummary
              icon={CreditCard}
              label="Card"
              value={getMethodTotal(completedPayments, "card")}
            />

            <PaymentMethodSummary
              icon={Smartphone}
              label="Online"
              value={getMethodTotal(completedPayments, "online")}
            />
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Recent transactions</CardTitle>

          <CardDescription>
            Payments processed during today&apos;s operation
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                    Customer
                  </th>

                  <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                    Service
                  </th>

                  <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                    Method
                  </th>

                  <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                    Status
                  </th>

                  <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                    Time
                  </th>

                  <th className="pb-3 pl-4 text-right text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="transition-colors hover:bg-surface-muted"
                  >
                    <td className="py-4 pr-4">
                      <p className="text-sm font-medium text-foreground">
                        {payment.customer}
                      </p>

                      <p className="text-xs text-foreground-muted">
                        {payment.employee}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm text-foreground">
                      {payment.service}
                    </td>

                    <td className="px-4 py-4">
                      {payment.method ? (
                        <PaymentMethodBadge method={payment.method} />
                      ) : (
                        <span className="text-sm text-foreground-subtle">
                          Not selected
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <PaymentStatusBadge status={payment.status} />
                    </td>

                    <td className="px-4 py-4 text-sm text-foreground-muted">
                      {payment.time}
                    </td>

                    <td className="py-4 pl-4 text-right text-sm font-semibold text-foreground">
                      ${payment.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <PaymentCheckoutPanel
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
        onComplete={completePayment}
      />
    </div>
  );
}

type PaymentMethodSummaryProps = {
  icon: React.ElementType;
  label: string;
  value: number;
};

function PaymentMethodSummary({
  icon: Icon,
  label,
  value,
}: PaymentMethodSummaryProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>

        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>

      <span className="font-semibold text-foreground">${value.toFixed(2)}</span>
    </div>
  );
}

function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  const labels = {
    cash: "Cash",
    card: "Card",
    online: "Online",
  };

  return <Badge variant="primary">{labels[method]}</Badge>;
}

function getMethodTotal(payments: Payment[], method: PaymentMethod) {
  return payments
    .filter((payment) => payment.method === method)
    .reduce((total, payment) => total + payment.total, 0);
}
