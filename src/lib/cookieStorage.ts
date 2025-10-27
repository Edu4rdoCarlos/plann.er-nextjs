import Cookies from "js-cookie";
import { StateStorage } from "zustand/middleware";

export const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    // Check if we're in the browser
    if (typeof window === "undefined") return null;

    try {
      const value = Cookies.get(name);
      return value || null;
    } catch (error) {
      console.error("❌ [GET] Error reading cookie:", error);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    // Check if we're in the browser
    if (typeof window === "undefined") return;

    try {
      Cookies.set(name, value, {
        expires: 365, // 1 year
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    } catch (error) {
      console.error("❌ [SET] Error saving cookie:", error);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;

    try {
      Cookies.remove(name);
    } catch (error) {
      console.error("❌ [REMOVE] Error removing cookie:", error);
    }
  },
};
