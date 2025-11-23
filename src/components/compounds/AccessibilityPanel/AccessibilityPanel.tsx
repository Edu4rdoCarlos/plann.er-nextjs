"use client";

import { useLocale } from "@/src/hooks/useLocale";
import { Locale, localeFlags, localeNames, locales } from "@/src/i18n/request";
import { useAccessibility } from "@/src/providers/AccessibilityProvider";
import { Accessibility, Eye, Globe, Type, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  sDropdown,
  sFontButton,
  sFontControls,
  sHeader,
  sPanel,
  sSection,
  sSectionTitle,
  sSubtitle,
  sTitle,
  sToggle,
  sToggleActive,
  sToggleContainer,
  sToggleLabel,
  sToggleThumb,
  sToggleThumbActive,
  sTrigger,
} from "./AccessibilityPanel.variants";

export interface AccessibilityPanelProps {
  className?: string;
}

export const AccessibilityPanel = ({ className }: AccessibilityPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    preferences,
    increaseFontSize,
    decreaseFontSize,
    setEnhancedFocus,
    setSpeechEnabled,
  } = useAccessibility();
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

  useEffect(() => {
    const handleToggleShortcut = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener(
      "toggle-accessibility-settings",
      handleToggleShortcut
    );

    return () => {
      window.removeEventListener(
        "toggle-accessibility-settings",
        handleToggleShortcut
      );
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEnhancedFocusToggle = () => {
    setEnhancedFocus(!preferences.enhancedFocus);
  };

  const handleSpeechToggle = () => {
    setSpeechEnabled(!preferences.speechEnabled);
  };

  const canDecrease = preferences.fontSize > 0;
  const canIncrease = preferences.fontSize < 2;

  const handleLocaleChange = (newLocale: Locale) => {
    changeLocale(newLocale);
  };

  return (
    <div className={sPanel({ className })} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={sTrigger()}
        aria-label={t("settingsAriaLabel")}
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
              <button
                onClick={decreaseFontSize}
                disabled={!canDecrease}
                className={sFontButton({
                  className: !canDecrease
                    ? "opacity-40 cursor-not-allowed"
                    : "",
                })}
                aria-label={t("decreaseFontSizeAriaLabel")}
              >
                <span className="text-lg font-bold">A-</span>
              </button>
              <button
                onClick={increaseFontSize}
                disabled={!canIncrease}
                className={sFontButton({
                  className: !canIncrease
                    ? "opacity-40 cursor-not-allowed"
                    : "",
                })}
                aria-label={t("increaseFontSizeAriaLabel")}
              >
                <span className="text-lg font-bold">A+</span>
              </button>

              <div className="flex items-center justify-center px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {preferences.fontSize === 0 && "0"}
                  {preferences.fontSize === 1 && "1"}
                  {preferences.fontSize === 2 && "2"}
                </span>
              </div>
            </div>
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
                  aria-label={t("languageOptionAriaLabel", {
                    language: t("language"),
                    name: localeNames[loc],
                  })}
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

          <div className={sSection()}>
            <div className={sToggleContainer()}>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-zinc-500" />
                <span className={sToggleLabel()}>{t("voiceReading")}</span>
              </div>
              <button
                onClick={handleSpeechToggle}
                className={sToggle({
                  className: preferences.speechEnabled ? sToggleActive() : "",
                })}
                role="switch"
                aria-checked={preferences.speechEnabled}
                aria-label={t("enableVoiceReadingAriaLabel")}
              >
                <span
                  className={sToggleThumb({
                    className: preferences.speechEnabled
                      ? sToggleThumbActive()
                      : "",
                  })}
                />
              </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              {t("voiceReadingDescription")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
