"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function HomePage() {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = token.trim();
    const validEmail = looksLikeEmail(value);
    if (!validEmail && value.length < 16) {
      setError(t.tokenError);
      return;
    }
    setError(null);
    router.push(`/${locale}/track/${encodeURIComponent(value)}`);
  }

  return (
    <div className="mx-auto max-w-xl">
      <section className="rounded-3xl border border-[var(--ak-border)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-[var(--ak-blue)] uppercase">
          {t.portalEyebrow}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--ak-navy)]">
          {t.homeTitle}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ak-muted)]">
          {t.homeIntro}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--ak-muted)]">{t.tokenLabel}</span>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={t.tokenPlaceholder}
              className="w-full rounded-xl border border-[var(--ak-border)] px-3 py-3 outline-none focus:border-[var(--ak-blue)]"
              dir="ltr"
              autoComplete="email"
              inputMode="email"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-[var(--ak-blue)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--ak-blue-dark)]"
          >
            {t.openRequest}
          </button>
        </form>
      </section>
    </div>
  );
}
