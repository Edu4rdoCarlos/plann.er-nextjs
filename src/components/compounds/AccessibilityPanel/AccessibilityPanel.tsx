"use client";

import { useState, useRef, useEffect } from "react";
import { useAccessibility } from "@/src/providers/AccessibilityProvider";
import { FontSize } from "@/src/types/accessibility";
import { Accessibility, Type, Eye, Globe } from "lucide-react";
import { useLocale } from "@/src/hooks/useLocale";
import { useTranslations } from "next-intl";
import { locales, localeNames, localeFlags, Locale } from "@/src/i18n/request";
import {
  sPanel,
  sTrigger,
  sDropdown,
  sHeader,
  sTitle,
  sSubtitle,
  sSection,
  sSectionTitle,
  sFontControls,
  sFontButton,
  sFontButtonActive,
  sToggleContainer,
  sToggleLabel,
  sToggle,
  sToggleActive,
  sToggleThumb,
  sToggleThumbActive,
} from "./AccessibilityPanel.variants";

export interface AccessibilityPanelProps {
  className?: string;
}

export const AccessibilityPanel = ({ className }: AccessibilityPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { preferences, setFontSize, setEnhancedFocus } = useAccessibility();
  const { locale, changeLocale } = useLocale();
  const t = useTranslations("accessibility");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
  };

  const handleEnhancedFocusToggle = () => {
    setEnhancedFocus(!preferences.enhancedFocus);
  };

  const fontSizes: { size: FontSize; label: string; icon: string }[] = [
    { size: "small", label: t("fontSmall"), icon: "A-" },
    { size: "medium", label: t("fontMedium"), icon: "A" },
    { size: "large", label: t("fontLarge"), icon: "A+" },
  ];

  const handleLocaleChange = (newLocale: Locale) => {
    changeLocale(newLocale);
  };

  return (
    <div className={sPanel({ className })} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={sTrigger()}
        aria-label="Configurações de acessibilidade"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Accessibility size={20} />
      </button>

      {isOpen && (
        <div className={sDropdown()}>
          <div className={sHeader()}>
            <h3 className={sTitle()}>{t("title")}</h3>
            <p className={sSubtitle()}>{t("subtitle")}</p>
          </div>

          <div className={sSection()}>
            <h4 className={sSectionTitle()}>
              <Type className="inline w-4 h-4 mr-2" />
              {t("fontSize")}
            </h4>
            <div className={sFontControls()}>
              {fontSizes.map(({ size, label, icon }) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={sFontButton({
                    className:
                      preferences.fontSize === size ? sFontButtonActive() : "",
                  })}
                  aria-label={`Alterar tamanho da fonte para ${label}`}
                  aria-pressed={preferences.fontSize === size}
                >
                  <span className="text-sm font-medium">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={sSection()}>
            <div className={sToggleContainer()}>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-zinc-500" />
                <span className={sToggleLabel()}>{t("enhancedFocus")}</span>
              </div>
              <button
                onClick={handleEnhancedFocusToggle}
                className={sToggle({
                  className: preferences.enhancedFocus ? sToggleActive() : "",
                })}
                role="switch"
                aria-checked={preferences.enhancedFocus}
                aria-label={t("enhancedFocus")}
              >
                <span
                  className={sToggleThumb({
                    className: preferences.enhancedFocus
                      ? sToggleThumbActive()
                      : "",
                  })}
                />
              </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              {t("enhancedFocusDescription")}
            </p>
          </div>

          <div className={sSection()}>
            <h4 className={sSectionTitle()}>
              <Globe className="inline w-4 h-4 mr-2" />
              {t("language")}
            </h4>
            <div className="flex flex-col gap-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    locale === loc
                      ? "bg-lime-100 dark:bg-lime-900 border border-lime-500 text-lime-700 dark:text-lime-200"
                      : "bg-zinc-50 dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 border border-zinc-200 dark:border-zinc-600"
                  }`}
                  aria-label={`${t("language")}: ${localeNames[loc]}`}
                  aria-pressed={locale === loc}
                >
                  <span className="text-2xl">{localeFlags[loc]}</span>
                  <span className="text-sm font-medium">
                    {localeNames[loc]}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              {t("languageDescription")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
