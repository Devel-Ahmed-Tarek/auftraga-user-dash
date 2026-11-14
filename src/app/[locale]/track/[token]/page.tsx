import Link from "next/link";
import { redirect } from "next/navigation";
import { TrackDashboard } from "@/components/TrackDashboard";
import { getMessages } from "@/i18n/messages";
import { normalizeLocale } from "@/i18n/locales";
import { getTracking } from "@/lib/api";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale: rawLocale, token: rawToken } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = getMessages(locale);
  const token = decodeURIComponent(rawToken);

  try {
    const data = await getTracking(token, locale);

    // Normalize email/legacy lookups onto the stable track_token URL.
    if (
      data.track_token &&
      data.track_token !== token &&
      (token.includes("@") || token.length < 32)
    ) {
      redirect(`/${locale}/track/${encodeURIComponent(data.track_token)}`);
    }

    return <TrackDashboard initial={data} token={data.track_token || token} />;
  } catch (e) {
    const err = e as Error & { code?: string; loginUrl?: string };
    const needsLogin = err.code === "login_required";
    const message = err.message || t.invalidLink;
    const loginUrl = err.loginUrl || `https://auftragkompass.de/${locale}/login`;

    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[var(--ak-navy)]">
          {needsLogin ? t.loginRequiredTitle : t.invalidLink}
        </h1>
        <p className="mt-3 text-sm text-[var(--ak-muted)]">
          {needsLogin ? t.loginRequiredBody : message}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {needsLogin && (
            <a
              href={loginUrl}
              className="inline-flex rounded-full bg-[var(--ak-blue)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              {t.goToLogin}
            </a>
          )}
          <Link
            href={`/${locale}`}
            className="inline-flex rounded-full border border-[var(--ak-border)] px-5 py-2.5 text-sm font-semibold text-[var(--ak-navy)]"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    );
  }
}
