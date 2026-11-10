"use client";

import { usePathname, useRouter } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/locales";
import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageSwitcher() {
  const { locale, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  function onChange(next: Locale) {
    if (!pathname) return;
    const parts = pathname.split("/");
    // ["", "de", "track", "..."]
    if (parts.length >= 2) {
      parts[1] = next;
      router.push(parts.join("/") || `/${next}`);
      return;
    }
    router.push(`/${next}`);
  }

  return (
    <label className="flex items-center gap-2 text-xs text-[var(--ak-muted)]">
      <span className="hidden sm:inline">{t.language}</span>
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value as Locale)}
        className="rounded-full border border-[var(--ak-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--ak-navy)] outline-none focus:border-[var(--ak-blue)]"
        aria-label={t.language}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
