"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useAccessibilityStore } from "@/src/store/accessibility";
import { AccessibilityContextType } from "@/src/types/accessibility";

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const store = useAccessibilityStore();

  // Apply CSS classes to document based on preferences
  useEffect(() => {
    const { fontSize, enhancedFocus } = store;

    // Remove existing classes
    document.documentElement.classList.remove(
      "font-size-small",
      "font-size-medium",
      "font-size-large",
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
    },
    setFontSize: store.setFontSize,
    setEnhancedFocus: store.setEnhancedFocus,
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
