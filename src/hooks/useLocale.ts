"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/src/i18n/request";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("pt");

  useEffect(() => {
    // Load locale from localStorage
    const savedLocale = (localStorage.getItem("locale") || "pt") as Locale;
    setLocale(savedLocale);

    // Listen for locale changes
    const handleLocaleChange = () => {
      const newLocale = (localStorage.getItem("locale") || "pt") as Locale;
      setLocale(newLocale);
    };

    window.addEventListener("localeChange", handleLocaleChange);
    return () => {
      window.removeEventListener("localeChange", handleLocaleChange);
    };
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
