export type FontSize = -2 | -1 | 0 | 1 | 2;

export interface AccessibilityPreferences {
  fontSize: FontSize;
  enhancedFocus: boolean;
  speechEnabled: boolean;
}

export interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  setFontSize: (size: FontSize) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setEnhancedFocus: (enabled: boolean) => void;
  setSpeechEnabled: (enabled: boolean) => void;
  resetPreferences: () => void;
}
