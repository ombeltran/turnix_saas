import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const supportedLocales = ["es", "en"] as const;

type Locale = (typeof supportedLocales)[number];

function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const requestedLocale = cookieStore.get("TURNIX_LOCALE")?.value ?? "es";

  const locale = isSupportedLocale(requestedLocale)
    ? requestedLocale
    : "es";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});