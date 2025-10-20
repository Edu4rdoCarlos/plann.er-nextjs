"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AccessibilityPreferences, FontSize } from "@/src/types/accessibility";

interface AccessibilityState extends AccessibilityPreferences {
  setFontSize: (size: FontSize) => void;
  setEnhancedFocus: (enabled: boolean) => void;
  resetPreferences: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: "medium",
  enhancedFocus: false,
};

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      setFontSize: (size: FontSize) => set({ fontSize: size }),
      setEnhancedFocus: (enabled: boolean) => set({ enhancedFocus: enabled }),
      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: "accessibility-storage",
      partialize: (state) => ({
        fontSize: state.fontSize,
        enhancedFocus: state.enhancedFocus,
      }),
    }
  )
);
