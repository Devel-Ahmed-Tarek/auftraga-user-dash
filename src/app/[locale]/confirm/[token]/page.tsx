"use client";

import { confirmTracking } from "@/lib/api";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmPage() {
  const params = useParams<{ token: string; locale: string }>();
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const token = params?.token;
    if (!token) return;

    let cancelled = false;
    (async () => {
      try {
        const result = await confirmTracking(token, locale);
        if (cancelled) return;
        setDone(true);
        router.replace(
          `/${locale}/track/${encodeURIComponent(result.track_token || token)}`
        );
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : t.error);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params?.token, router, locale, t.error]);

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-[var(--ak-border)] bg-white p-8 text-center shadow-sm">
      {error ? (
        <>
          <h1 className="text-2xl font-bold text-[var(--ak-navy)]">{t.error}</h1>
          <p className="mt-3 text-sm text-red-600">{error}</p>
          <a
            href={`/${locale}/track/${encodeURIComponent(params.token || "")}`}
            className="mt-6 inline-flex rounded-full bg-[var(--ak-blue)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            {t.openTrackingAnyway}
          </a>
        </>
      ) : (
        <>
          <div className="mx-auto mb-4 h-10 w-10 animate-pulse rounded-full bg-[var(--ak-blue)]" />
          <h1 className="text-2xl font-bold text-[var(--ak-navy)]">
            {done ? t.confirmPageDone : t.confirmPageTitle}
          </h1>
          <p className="mt-3 text-sm text-[var(--ak-muted)]">{t.confirmPageWait}</p>
        </>
      )}
    </div>
  );
}
