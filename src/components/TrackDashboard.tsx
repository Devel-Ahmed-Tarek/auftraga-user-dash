"use client";

import { useMemo, useState } from "react";
import {
  markExecuted,
  rateCompany,
  sendAnnouncement,
  type TrackPayload,
} from "@/lib/api";
import { StatusStepper } from "./StatusStepper";
import { OfferChat } from "./OfferChat";
import { useLanguage } from "@/i18n/LanguageProvider";

export function TrackDashboard({
  initial,
  token,
}: {
  initial: TrackPayload;
  token: string;
}) {
  const { locale, t } = useLanguage();
  const [data, setData] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingComment, setRatingComment] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<number | "">(
    initial.companies[0]?.id ?? ""
  );
  const [announceText, setAnnounceText] = useState("");

  const offer = data.offer;
  const location = useMemo(() => {
    return [offer.adresse, offer.zipcode, offer.ort || offer.city]
      .filter(Boolean)
      .join(", ");
  }, [offer]);

  async function refreshAfter(action: () => Promise<unknown>) {
    setError(null);
    setMessage(null);
    await action();
    const { getTracking } = await import("@/lib/api");
    const fresh = await getTracking(data.track_token || token, locale);
    setData(fresh);
  }

  async function onConfirm() {
    setBusy("confirm");
    try {
      await refreshAfter(async () => {
        const { confirmTracking } = await import("@/lib/api");
        await confirmTracking(token, locale);
      });
      setMessage(t.confirmSuccess);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.error);
    } finally {
      setBusy(null);
    }
  }

  async function onExecuted(companyId: number) {
    setBusy(`exec-${companyId}`);
    try {
      await refreshAfter(() =>
        markExecuted(
          data.track_token || token,
          {
            company_id: companyId,
            is_executed: true,
          },
          locale
        )
      );
      setMessage(t.savedExecution);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.error);
    } finally {
      setBusy(null);
    }
  }

  async function onRate(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCompany) {
      setError(t.chooseCompany);
      return;
    }
    setBusy("rate");
    try {
      await refreshAfter(() =>
        rateCompany(
          data.track_token || token,
          {
            stars: ratingStars,
            comment: ratingComment,
            user_id: Number(selectedCompany),
          },
          locale
        )
      );
      setMessage(t.rateSuccess);
      setRatingComment("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
    } finally {
      setBusy(null);
    }
  }

  async function onAnnounce(e: React.FormEvent) {
    e.preventDefault();
    setBusy("announce");
    try {
      await sendAnnouncement(data.track_token || token, announceText, locale);
      setAnnounceText("");
      setMessage(t.messageSuccess);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-[var(--ak-navy)] text-white shadow-lg shadow-[rgba(24,40,68,0.18)]">
        <div className="relative px-5 py-7 sm:px-8">
          <div
            className="pointer-events-none absolute inset-y-0 end-0 w-1/2 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 70% 30%, var(--ak-blue), transparent 55%)",
            }}
          />
          <p className="mb-2 text-xs tracking-[0.18em] text-white/70 uppercase">
            {t.requestNumber} #{offer.id}
          </p>
          <h1 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
            {t.trackTitle}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/75">
            {offer.service || "—"} ·{" "}
            {offer.confirm_status === "confirmed"
              ? t.confirmed
              : t.waitingConfirm}
          </p>

          {offer.can_confirm && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={busy === "confirm"}
              className="mt-5 rounded-full bg-[var(--ak-orange)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-60"
            >
              {busy === "confirm" ? t.confirming : t.confirmNow}
            </button>
          )}
        </div>
      </section>

      {(message || error) && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {error || message}
        </div>
      )}

      <section className="rounded-3xl border border-[var(--ak-border)] bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[var(--ak-navy)]">
              {t.status}
            </h2>
            <p className="text-sm text-[var(--ak-muted)]">{t.statusHint}</p>
          </div>
          <span className="rounded-full bg-[var(--ak-blue-soft)] px-3 py-1 text-xs font-semibold text-[var(--ak-blue-dark)]">
            {offer.companies_count} {t.companiesCount}
          </span>
        </div>
        <StatusStepper steps={data.steps} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-[var(--ak-border)] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--ak-navy)]">
            {t.details}
          </h2>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <Item label={t.name} value={offer.name} />
            <Item label={t.email} value={offer.email} />
            <Item label={t.phone} value={offer.phone} />
            <Item label={t.service} value={offer.service} />
            <Item label={t.date} value={offer.date} />
            <Item label={t.address} value={location} />
          </dl>
        </div>

        <div className="rounded-3xl border border-[var(--ak-border)] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--ak-navy)]">
            {t.interestedCompanies}
          </h2>
          {data.companies.length === 0 ? (
            <p className="rounded-2xl bg-[var(--ak-bg)] px-4 py-6 text-sm text-[var(--ak-muted)]">
              {t.noCompanies}
            </p>
          ) : (
            <ul className="space-y-3">
              {data.companies.map((company) => (
                <li
                  key={company.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--ak-border)] px-3 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--ak-blue-soft)] text-sm font-bold text-[var(--ak-blue-dark)]">
                      {company.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={company.img}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        company.name.slice(0, 1).toUpperCase()
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-[var(--ak-navy)]">
                        {company.name}
                      </p>
                      <p className="text-xs text-[var(--ak-muted)]">
                        {company.is_executed ? t.executed : t.interested}
                      </p>
                    </div>
                  </div>
                  {!company.is_executed && (
                    <button
                      type="button"
                      disabled={busy === `exec-${company.id}`}
                      onClick={() => onExecuted(company.id)}
                      className="rounded-full bg-[var(--ak-blue)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--ak-blue-dark)] disabled:opacity-60"
                    >
                      {t.markDone}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <OfferChat token={data.track_token || token} companies={data.companies} />

      <section className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={onRate}
          className="rounded-3xl border border-[var(--ak-border)] bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="mb-1 text-lg font-semibold text-[var(--ak-navy)]">
            {t.rateTitle}
          </h2>
          <p className="mb-4 text-sm text-[var(--ak-muted)]">{t.rateHint}</p>

          <label className="mb-3 block text-sm">
            <span className="mb-1 block text-[var(--ak-muted)]">{t.company}</span>
            <select
              value={selectedCompany}
              onChange={(e) =>
                setSelectedCompany(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full rounded-xl border border-[var(--ak-border)] bg-white px-3 py-2.5 outline-none focus:border-[var(--ak-blue)]"
            >
              <option value="">{t.pleaseSelect}</option>
              {data.companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="mb-3 block text-sm">
            <span className="mb-1 block text-[var(--ak-muted)]">{t.stars}</span>
            <select
              value={ratingStars}
              onChange={(e) => setRatingStars(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--ak-border)] bg-white px-3 py-2.5 outline-none focus:border-[var(--ak-blue)]"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} / 5
                </option>
              ))}
            </select>
          </label>

          <label className="mb-4 block text-sm">
            <span className="mb-1 block text-[var(--ak-muted)]">{t.comment}</span>
            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-[var(--ak-border)] bg-white px-3 py-2.5 outline-none focus:border-[var(--ak-blue)]"
              placeholder={t.optional}
            />
          </label>

          <button
            type="submit"
            disabled={busy === "rate" || data.companies.length === 0}
            className="rounded-full bg-[var(--ak-navy)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--ak-navy-soft)] disabled:opacity-60"
          >
            {busy === "rate" ? t.sending : t.submitRating}
          </button>
        </form>

        <form
          onSubmit={onAnnounce}
          className="rounded-3xl border border-[var(--ak-border)] bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="mb-1 text-lg font-semibold text-[var(--ak-navy)]">
            {t.messageTitle}
          </h2>
          <p className="mb-4 text-sm text-[var(--ak-muted)]">{t.messageHint}</p>
          <textarea
            value={announceText}
            onChange={(e) => setAnnounceText(e.target.value)}
            required
            rows={6}
            className="mb-4 w-full rounded-xl border border-[var(--ak-border)] bg-white px-3 py-2.5 outline-none focus:border-[var(--ak-blue)]"
            placeholder={t.messagePlaceholder}
          />
          <button
            type="submit"
            disabled={busy === "announce"}
            className="rounded-full bg-[var(--ak-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--ak-blue-dark)] disabled:opacity-60"
          >
            {busy === "announce" ? t.sending : t.sendMessage}
          </button>
        </form>
      </section>
    </div>
  );
}

function Item({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-2xl bg-[var(--ak-bg)] px-3 py-3">
      <dt className="text-xs tracking-wide text-[var(--ak-muted)] uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-[var(--ak-navy)]">{value || "—"}</dd>
    </div>
  );
}
