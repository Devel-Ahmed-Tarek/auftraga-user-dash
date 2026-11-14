"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { getMyOffers, setStoredAuthToken } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function HomePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale, t } = useLanguage();
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const authToken = searchParams.get("token")?.trim();
    if (!authToken) {
      setBooting(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setStoredAuthToken(authToken);
        const data = await getMyOffers(authToken, locale);
        if (cancelled) return;

        // Clean token from URL
        router.replace(`/${locale}`);

        if (data.latest_track_token) {
          router.replace(
            `/${locale}/track/${encodeURIComponent(data.latest_track_token)}`
          );
          return;
        }

        setError(t.noOffersForAccount);
      } catch {
        if (!cancelled) {
          setStoredAuthToken(null);
          setError(t.authRedirectError);
        }
      } finally {
        if (!cancelled) setBooting(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams, locale, router, t.authRedirectError, t.noOffersForAccount]);

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

  if (booting && searchParams.get("token")) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-[var(--ak-border)] bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-[var(--ak-muted)]">{t.signingIn}</p>
      </div>
    );
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

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-xl rounded-3xl border border-[var(--ak-border)] bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-[var(--ak-muted)]">…</p>
        </div>
      }
    >
      <HomePageInner />
    </Suspense>
  );
}
