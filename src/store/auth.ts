"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  token: string | null;
  login: (email: string, token?: string) => void;
  logout: () => void;
  setEmail: (email: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      token: null,
      login: (email: string, token?: string) =>
        set({
          isAuthenticated: true,
          userEmail: email,
          token: token || null,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          userEmail: null,
          token: null,
        }),
      setEmail: (email: string) => set({ userEmail: email }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userEmail: state.userEmail,
        token: state.token,
      }),
    }
  )
);
