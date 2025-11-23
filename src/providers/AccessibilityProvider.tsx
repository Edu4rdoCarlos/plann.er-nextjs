"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useAccessibilityStore } from "@/src/store/accessibility";
import { AccessibilityContextType } from "@/src/types/accessibility";
import { useSpeechNavigation } from "@/src/hooks/useSpeech";
import { useLocale } from "@/src/hooks/useLocale";

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const store = useAccessibilityStore();
  const { locale } = useLocale();

  // Ativar síntese de fala baseado nas preferências
  useSpeechNavigation(store.speechEnabled, locale);

  // Apply CSS classes to document based on preferences
  useEffect(() => {
    const { fontSize, enhancedFocus } = store;

    // Remove existing font-size classes
    document.documentElement.classList.remove(
      "font-size--2",
      "font-size--1",
      "font-size-0",
      "font-size-1",
      "font-size-2",
      "enhanced-focus"
    );

    // Apply new classes
    document.documentElement.classList.add(`font-size-${fontSize}`);
    if (enhancedFocus) {
      document.documentElement.classList.add("enhanced-focus");
    }
  }, [store.fontSize, store.enhancedFocus]);

  const contextValue: AccessibilityContextType = {
    preferences: {
      fontSize: store.fontSize,
      enhancedFocus: store.enhancedFocus,
      speechEnabled: store.speechEnabled,
    },
    setFontSize: store.setFontSize,
    increaseFontSize: store.increaseFontSize,
    decreaseFontSize: store.decreaseFontSize,
    setEnhancedFocus: store.setEnhancedFocus,
    setSpeechEnabled: store.setSpeechEnabled,
    resetPreferences: store.resetPreferences,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
};
