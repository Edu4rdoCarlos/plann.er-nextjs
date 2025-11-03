"use client";

import { useState, useRef, useEffect } from "react";
import { useAccessibility } from "@/src/providers/AccessibilityProvider";
import { FontSize } from "@/src/types/accessibility";
import { useLocale } from "@/src/hooks/useLocale";
import { useTranslations } from "next-intl";
import { locales, localeNames, localeFlags, Locale } from "@/src/i18n/request";
import { Accessibility, Type, Eye, Volume2, Globe } from "lucide-react";
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
   const { preferences, increaseFontSize, decreaseFontSize, setEnhancedFocus, setSpeechEnabled } =
    useAccessibility();
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
              <button
                onClick={decreaseFontSize}
                disabled={!canDecrease}
                className={sFontButton({
                  className: !canDecrease ? "opacity-40 cursor-not-allowed" : "",
                })}
                aria-label="Diminuir tamanho da fonte"
              >
                <span className="text-lg font-bold">A-</span>
              </button>
              <button
                onClick={increaseFontSize}
                disabled={!canIncrease}
                className={sFontButton({
                  className: !canIncrease ? "opacity-40 cursor-not-allowed" : "",
                })}
                aria-label="Aumentar tamanho da fonte"
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

          <div className={sSection()}>
            <div className={sToggleContainer()}>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-zinc-500" />
                <span className={sToggleLabel()}>Leitura por Voz</span>
              </div>
              <button
                onClick={handleSpeechToggle}
                className={sToggle({
                  className: preferences.speechEnabled ? sToggleActive() : "",
                })}
                role="switch"
                aria-checked={preferences.speechEnabled}
                aria-label="Ativar leitura por voz"
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
              Lê em voz alta os elementos durante a navegação por teclado
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
