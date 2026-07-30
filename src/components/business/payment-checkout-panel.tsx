"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Smartphone,
} from "lucide-react";

import { SidePanel } from "@/components/shared/side-panel";
import { Button } from "@/components/ui/button";
import type {
  Payment,
  PaymentMethod,
} from "@/mocks/payments";

type PaymentCheckoutPanelProps = {
  payment: Payment | null;
  onClose: () => void;
  onComplete: (
    id: string,
    method: PaymentMethod,
    tip: number,
    discount: number
  ) => void;
};

const tipOptions = [0, 10, 15, 20];

export function PaymentCheckoutPanel({
  payment,
  onClose,
  onComplete,
}: PaymentCheckoutPanelProps) {
  const [tipPercentage, setTipPercentage] =
    useState(0);

  const [discount, setDiscount] =
    useState(0);

  const [method, setMethod] =
    useState<PaymentMethod>("card");

  const [isCompleted, setIsCompleted] =
    useState(false);

  const tipAmount = useMemo(() => {
    if (!payment) {
      return 0;
    }

    return payment.amount * (tipPercentage / 100);
  }, [payment, tipPercentage]);

  const total = useMemo(() => {
    if (!payment) {
      return 0;
    }

    return Math.max(
      0,
      payment.amount + tipAmount - discount
    );
  }, [payment, tipAmount, discount]);

  function resetCheckout() {
    setTipPercentage(0);
    setDiscount(0);
    setMethod("card");
    setIsCompleted(false);
  }

  function handleClose() {
    resetCheckout();
    onClose();
  }

  function handleConfirmPayment() {
    if (!payment) {
      return;
    }

    onComplete(
      payment.id,
      method,
      tipAmount,
      discount
    );

    setIsCompleted(true);
  }

  return (
    <SidePanel
      open={payment !== null}
      title={
        isCompleted
          ? "Payment completed"
          : "Process payment"
      }
      subtitle={
        payment
          ? isCompleted
            ? `Receipt for ${payment.customer}`
            : `Complete the transaction for ${payment.customer}.`
          : undefined
      }
      size="md"
      onClose={handleClose}
      footer={
        payment ? (
          isCompleted ? (
            <Button
              type="button"
              onClick={handleClose}
            >
              Done
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleConfirmPayment}
              >
                Confirm ${total.toFixed(2)}
              </Button>
            </>
          )
        ) : null
      }
    >
      {payment &&
        (isCompleted ? (
          <PaymentConfirmation
            customer={payment.customer}
            total={total}
            method={method}
          />
        ) : (
          <PaymentCheckoutContent
            payment={payment}
            method={method}
            tipPercentage={tipPercentage}
            tipAmount={tipAmount}
            discount={discount}
            total={total}
            onMethodChange={setMethod}
            onTipChange={setTipPercentage}
            onDiscountChange={setDiscount}
          />
        ))}
    </SidePanel>
  );
}

type PaymentCheckoutContentProps = {
  payment: Payment;
  method: PaymentMethod;
  tipPercentage: number;
  tipAmount: number;
  discount: number;
  total: number;
  onMethodChange: (
    method: PaymentMethod
  ) => void;
  onTipChange: (
    percentage: number
  ) => void;
  onDiscountChange: (
    discount: number
  ) => void;
};

function PaymentCheckoutContent({
  payment,
  method,
  tipPercentage,
  tipAmount,
  discount,
  total,
  onMethodChange,
  onTipChange,
  onDiscountChange,
}: PaymentCheckoutContentProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-background p-4">
        <p className="text-sm font-semibold text-foreground">
          {payment.customer}
        </p>

        <p className="mt-1 text-sm text-foreground-muted">
          {payment.service}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-foreground-muted">
            Service amount
          </span>

          <span className="font-semibold text-foreground">
            ${payment.amount.toFixed(2)}
          </span>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground">
          Tip
        </h3>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {tipOptions.map((percentage) => (
            <button
              key={percentage}
              type="button"
              onClick={() =>
                onTipChange(percentage)
              }
              className={`
                min-h-10 rounded-lg border px-3
                text-sm font-medium transition
                ${
                  tipPercentage === percentage
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-surface-hover"
                }
              `}
            >
              {percentage === 0
                ? "None"
                : `${percentage}%`}
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg bg-surface-muted px-4 py-3">
          <span className="text-sm text-foreground-muted">
            Tip amount
          </span>

          <span className="font-semibold text-foreground">
            ${tipAmount.toFixed(2)}
          </span>
        </div>
      </section>

      <section>
        <label
          htmlFor="payment-discount"
          className="text-sm font-semibold text-foreground"
        >
          Discount
        </label>

        <div className="relative mt-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-muted">
            $
          </span>

          <input
            id="payment-discount"
            type="number"
            min="0"
            max={payment.amount + tipAmount}
            step="0.01"
            value={discount}
            onChange={(event) => {
              const enteredDiscount =
                Number(event.target.value) || 0;

              const maximumDiscount =
                payment.amount + tipAmount;

              onDiscountChange(
                Math.min(
                  Math.max(enteredDiscount, 0),
                  maximumDiscount
                )
              );
            }}
            className="
              h-10 w-full rounded-lg
              border border-border bg-background
              pl-8 pr-3 text-sm text-foreground
              outline-none transition
              focus:border-primary
              focus:ring-2 focus:ring-primary/20
            "
          />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground">
          Payment method
        </h3>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <PaymentMethodButton
            label="Cash"
            icon={Banknote}
            active={method === "cash"}
            onClick={() =>
              onMethodChange("cash")
            }
          />

          <PaymentMethodButton
            label="Card"
            icon={CreditCard}
            active={method === "card"}
            onClick={() =>
              onMethodChange("card")
            }
          />

          <PaymentMethodButton
            label="Online"
            icon={Smartphone}
            active={method === "online"}
            onClick={() =>
              onMethodChange("online")
            }
          />
        </div>
      </section>

      <section className="rounded-xl bg-surface-muted p-4">
        <PaymentRow
          label="Subtotal"
          value={payment.amount}
        />

        <PaymentRow
          label="Tip"
          value={tipAmount}
        />

        <PaymentRow
          label="Discount"
          value={-discount}
        />

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-semibold text-foreground">
            Total
          </span>

          <span className="text-2xl font-bold text-foreground">
            ${total.toFixed(2)}
          </span>
        </div>
      </section>
    </div>
  );
}

type PaymentConfirmationProps = {
  customer: string;
  total: number;
  method: PaymentMethod;
};

function PaymentConfirmation({
  customer,
  total,
  method,
}: PaymentConfirmationProps) {
  return (
    <div className="flex min-h-125 flex-col items-center justify-center p-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-success-background text-success">
        <CheckCircle2 className="size-8" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-foreground">
        Payment completed
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-foreground-muted">
        The payment for {customer} was processed
        successfully.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-background px-8 py-5">
        <p className="text-sm text-foreground-muted">
          Amount paid
        </p>

        <p className="mt-1 text-3xl font-bold text-foreground">
          ${total.toFixed(2)}
        </p>

        <p className="mt-2 text-sm capitalize text-foreground-muted">
          Paid by {method}
        </p>
      </div>
    </div>
  );
}

type PaymentMethodButtonProps = {
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
};

function PaymentMethodButton({
  label,
  icon: Icon,
  active,
  onClick,
}: PaymentMethodButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex min-h-24 flex-col
        items-center justify-center gap-2
        rounded-xl border p-3 transition
        ${
          active
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-background text-foreground hover:bg-surface-hover"
        }
      `}
    >
      <Icon className="size-6" />

      <span className="text-sm font-medium">
        {label}
      </span>
    </button>
  );
}

function PaymentRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-2 flex items-center justify-between text-sm last:mb-0">
      <span className="text-foreground-muted">
        {label}
      </span>

      <span className="font-medium text-foreground">
        {value < 0 ? "-" : ""}$
        {Math.abs(value).toFixed(2)}
      </span>
    </div>
  );
}