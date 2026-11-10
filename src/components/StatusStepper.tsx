"use client";

import type { TrackStep } from "@/lib/api";
import { useLanguage } from "@/i18n/LanguageProvider";

export function StatusStepper({ steps }: { steps: TrackStep[] }) {
  const { t } = useLanguage();

  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => {
        const label =
          t.steps[step.key as keyof typeof t.steps] || step.label || step.key;
        const tone = step.done
          ? "border-transparent bg-[var(--ak-green-soft)] text-[var(--ak-navy)]"
          : step.current
            ? "border-[var(--ak-blue)] bg-[var(--ak-blue-soft)] text-[var(--ak-navy)] shadow-[0_0_0_1px_rgba(0,132,252,0.15)]"
            : "border-[var(--ak-border)] bg-white text-[var(--ak-muted)]";

        return (
          <li
            key={step.key}
            className={`rounded-2xl border px-4 py-4 transition ${tone}`}
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  step.done
                    ? "bg-[var(--ak-green)] text-white"
                    : step.current
                      ? "bg-[var(--ak-blue)] text-white"
                      : "bg-[var(--ak-border)] text-[var(--ak-muted)]"
                }`}
              >
                {step.done ? "✓" : index + 1}
              </span>
              {step.current && (
                <span className="rounded-full bg-[var(--ak-orange)] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                  {t.current}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold leading-snug">{label}</p>
          </li>
        );
      })}
    </ol>
  );
}
