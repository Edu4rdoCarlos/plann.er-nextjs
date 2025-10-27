"use client";

import { useState, useRef, useEffect } from "react";
import { useAccessibility } from "@/src/providers/AccessibilityProvider";
import { Accessibility, Type, Eye } from "lucide-react";
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
  const { preferences, increaseFontSize, decreaseFontSize, setEnhancedFocus } =
    useAccessibility();

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

  const canDecrease = preferences.fontSize > -2;
  const canIncrease = preferences.fontSize < 2;

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
            <h3 className={sTitle()}>Configurações de Acessibilidade</h3>
            <p className={sSubtitle()}>
              Personalize a experiência para melhor visibilidade
            </p>
          </div>

          <div className={sSection()}>
            <h4 className={sSectionTitle()}>
              <Type className="inline w-4 h-4 mr-2" />
              Tamanho da Fonte
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
                  {preferences.fontSize === -2 && "-2"}
                  {preferences.fontSize === -1 && "-1"}
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
                <span className={sToggleLabel()}>Foco Melhorado</span>
              </div>
              <button
                onClick={handleEnhancedFocusToggle}
                className={sToggle({
                  className: preferences.enhancedFocus ? sToggleActive() : "",
                })}
                role="switch"
                aria-checked={preferences.enhancedFocus}
                aria-label="Ativar foco melhorado"
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
              Destaca elementos em foco com maior contraste
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
