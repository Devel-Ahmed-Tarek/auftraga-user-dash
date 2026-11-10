import Link from "next/link";
import { TrackDashboard } from "@/components/TrackDashboard";
import { getMessages } from "@/i18n/messages";
import { normalizeLocale } from "@/i18n/locales";
import { getTracking } from "@/lib/api";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale: rawLocale, token } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = getMessages(locale);

  try {
    const data = await getTracking(token, locale);
    return <TrackDashboard initial={data} token={token} />;
  } catch (e) {
    const message = e instanceof Error ? e.message : t.invalidLink;
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[var(--ak-navy)]">{t.invalidLink}</h1>
        <p className="mt-3 text-sm text-[var(--ak-muted)]">{message}</p>
        <Link
          href={`/${locale}`}
          className="mt-6 inline-flex rounded-full bg-[var(--ak-blue)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          {t.backHome}
        </Link>
      </div>
    );
  }
}
