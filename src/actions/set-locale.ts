"use server";

import { cookies } from "next/headers";

const supportedLocales = ["es", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export async function setLocale(locale: Locale) {
  if (!supportedLocales.includes(locale)) {
    throw new Error("Idioma no soportado");
  }

  const cookieStore = await cookies();

  cookieStore.set("TURNIX_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}