import { BrandHeader } from "@/components/BrandHeader";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { isRtl, locales, normalizeLocale } from "@/i18n/locales";
import { getBranding } from "@/lib/api";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  if (!(locales as readonly string[]).includes(raw)) {
    notFound();
  }

  const dir = isRtl(locale) ? "rtl" : "ltr";
  const branding = await getBranding();

  return (
    <LanguageProvider locale={locale}>
      <div lang={locale} dir={dir}>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang=${JSON.stringify(
              locale
            )};document.documentElement.dir=${JSON.stringify(dir)};`,
          }}
        />
        <BrandHeader branding={branding} />
        <main className="mx-auto min-h-[calc(100vh-73px)] max-w-5xl px-4 py-8 sm:px-6">
          {children}
        </main>
      </div>
    </LanguageProvider>
  );
}
