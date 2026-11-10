"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { getMessages, type Messages } from "./messages";
import {
  defaultLocale,
  isRtl,
  normalizeLocale,
  type Locale,
} from "./locales";

type LanguageContextValue = {
  locale: Locale;
  t: Messages;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: defaultLocale,
  t: getMessages(defaultLocale),
  dir: "ltr",
});

export function LanguageProvider({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const value = useMemo(() => {
    const normalized = normalizeLocale(locale);
    return {
      locale: normalized,
      t: getMessages(normalized),
      dir: isRtl(normalized) ? ("rtl" as const) : ("ltr" as const),
    };
  }, [locale]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
