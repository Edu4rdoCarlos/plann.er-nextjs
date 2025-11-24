import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export const localeFlags: Record<Locale, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // If invalid, use default locale 'pt'
  const validLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pt";

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
