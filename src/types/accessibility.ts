export type FontSize = "small" | "medium" | "large";

export interface AccessibilityPreferences {
  fontSize: FontSize;
  enhancedFocus: boolean;
}

export interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  setFontSize: (size: FontSize) => void;
  setEnhancedFocus: (enabled: boolean) => void;
  resetPreferences: () => void;
}
