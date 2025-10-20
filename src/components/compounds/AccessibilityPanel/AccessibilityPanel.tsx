"use client";

import { useState, useRef, useEffect } from "react";
import { useAccessibility } from "@/src/providers/AccessibilityProvider";
import { FontSize } from "@/src/types/accessibility";
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
    { size: "small", label: "Pequeno", icon: "A-" },
    { size: "medium", label: "Médio", icon: "A" },
    { size: "large", label: "Grande", icon: "A+" },
  ];

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
