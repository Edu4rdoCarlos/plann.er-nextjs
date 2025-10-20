"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/src/i18n/request";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("pt");

  useEffect(() => {
    // Load locale from localStorage
    const savedLocale = (localStorage.getItem("locale") || "pt") as Locale;
    setLocale(savedLocale);
  }, []);

  const changeLocale = (newLocale: Locale) => {
    // Store locale preference in localStorage
    localStorage.setItem("locale", newLocale);
    setLocale(newLocale);

    // Dispatch custom event to notify LocaleProvider
    window.dispatchEvent(new Event("localeChange"));
  };

  return {
    locale,
    changeLocale,
  };
}
