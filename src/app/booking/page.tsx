import type { Metadata } from "next";

import { BookingLanding } from "@/components/public/booking-landing";

export const metadata: Metadata = {
  title: "Book an appointment",
  description: "Book a service with Bella Studio.",
};

export default function BookingPage() {
  return <BookingLanding />;
}
