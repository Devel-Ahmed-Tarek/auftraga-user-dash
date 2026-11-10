export const locales = ["de", "en", "ar", "fr", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export const localeLabels: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  ar: "العربية",
  fr: "Français",
  it: "Italiano",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return defaultLocale;
  const short = value.toLowerCase().slice(0, 2);
  return isLocale(short) ? short : defaultLocale;
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}
