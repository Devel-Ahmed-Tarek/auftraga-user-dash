"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Branding } from "@/lib/api";

export function BrandHeader({ branding }: { branding: Branding }) {
  const { locale, t } = useLanguage();
  const [logoFailed, setLogoFailed] = useState(false);

  const siteName = branding.name?.trim() || "Auftrag Kompass";
  const website =
    branding.website?.trim() || `https://auftragkompass.de/${locale}`;
  const logoUrl = branding.logo || branding.logo_dark;
  const showLogo = !!logoUrl && !logoFailed;

  const websiteHref = (() => {
    try {
      const url = new URL(website);
      // If config website is bare domain, keep locale path for main site.
      if (
        url.pathname === "/" &&
        /auftragkompass\.de$/i.test(url.hostname)
      ) {
        return `${url.origin}/${locale}`;
      }
      return website;
    } catch {
      return `https://auftragkompass.de/${locale}`;
    }
  })();

  return (
    <header className="border-b border-[var(--ak-border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex min-w-0 items-center"
          aria-label={siteName}
        >
          {showLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={siteName}
              className="h-10 w-auto max-w-[180px] object-contain"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--ak-blue) 0%, var(--ak-navy) 55%, var(--ak-orange) 100%)",
              }}
              aria-hidden
            >
              <span className="text-sm font-black tracking-tight text-white">
                AK
              </span>
            </div>
          )}
        </Link>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher />
          <a
            href={websiteHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--ak-border)] px-3 py-1.5 text-xs font-medium text-[var(--ak-navy)] transition hover:border-[var(--ak-blue)] hover:text-[var(--ak-blue)]"
          >
            {t.toWebsite}
          </a>
        </div>
      </div>
    </header>
  );
}
