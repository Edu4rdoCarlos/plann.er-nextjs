"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AccessibilityPreferences, FontSize } from "@/src/types/accessibility";

interface AccessibilityState extends AccessibilityPreferences {
  setFontSize: (size: FontSize) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setEnhancedFocus: (enabled: boolean) => void;
  setSpeechEnabled: (enabled: boolean) => void;
  resetPreferences: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: 0,
  enhancedFocus: false,
  speechEnabled: false,
};

const migrateFontSize = (oldValue: unknown): FontSize => {
  if (typeof oldValue === "number") {
    return oldValue as FontSize;
  }
  // Convert old string values to new numeric values
  if (oldValue === "small") return -1;
  if (oldValue === "medium") return 0;
  if (oldValue === "large") return 1;
  return 0; // default to medium
};

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      setFontSize: (size: FontSize) => {
        set({ fontSize: size });
      },
      increaseFontSize: () => {
        set((state) => {
          const newSize = Math.min(2, state.fontSize + 1) as FontSize;
          return { fontSize: newSize };
        });
      },
      decreaseFontSize: () => {
        set((state) => {
          const newSize = Math.max(-2, state.fontSize - 1) as FontSize;
          return { fontSize: newSize };
        });
      },
      setEnhancedFocus: (enabled: boolean) => set({ enhancedFocus: enabled }),
      setSpeechEnabled: (enabled: boolean) => set({ speechEnabled: enabled }),
      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: "accessibility-preferences",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        fontSize: state.fontSize,
        enhancedFocus: state.enhancedFocus,
        speechEnabled: state.speechEnabled,
      }),
      migrate: (persistedState: unknown) => {
        const state = persistedState as { fontSize?: unknown; enhancedFocus?: boolean; speechEnabled?: boolean };
        return {
          fontSize: migrateFontSize(state.fontSize),
          enhancedFocus: state.enhancedFocus ?? false,
          speechEnabled: state.speechEnabled ?? false,
        };
      },
      version: 2,
    }
  )
);
