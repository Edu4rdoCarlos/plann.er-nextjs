"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode, useState, useEffect } from "react";

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocale] = useState("pt");
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    // Load locale from localStorage or cookie
    const savedLocale = localStorage.getItem("locale") || "pt";
    setLocale(savedLocale);

    // Load messages dynamically
    import(`../../messages/${savedLocale}.json`).then((module) => {
      setMessages(module.default);
    });
  }, []);

  // Listen for locale changes
  useEffect(() => {
    const handleLocaleChange = () => {
      const savedLocale = localStorage.getItem("locale") || "pt";
      setLocale(savedLocale);
      import(`../../messages/${savedLocale}.json`).then((module) => {
        setMessages(module.default);
      });
    };

    window.addEventListener("localeChange", handleLocaleChange);
    return () => window.removeEventListener("localeChange", handleLocaleChange);
  }, []);

  if (!messages) {
    // Don't render children until messages are loaded
    return null;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
