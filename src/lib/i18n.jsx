import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { LOCALES, company, content } from "@/content/site";

const I18nContext = createContext(null);

export function localeFromPath(pathname) {
  const first = pathname.split("/").filter(Boolean)[0];
  return LOCALES.some((l) => l.code === first) ? first : "nl";
}

export function I18nProvider({ children }) {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);

  useEffect(() => {
    const t = content[locale];
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    document.head.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [locale]);

  const value = useMemo(() => ({ locale, t: content[locale] }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

const digits = company.phone.replace(/\D/g, "");

export const links = {
  tel: `tel:+${digits}`,
  mail: `mailto:${company.email}`,
  whatsapp: (message) => `https://wa.me/${digits}?text=${encodeURIComponent(message)}`,
};
