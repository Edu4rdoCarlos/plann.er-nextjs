"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  owner: boolean;
  token: string | null;
  login: (email: string, owner: boolean, token?: string) => void;
  logout: () => void;
  setEmail: (email: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      owner: false,
      token: null,
      login: (email: string, owner: boolean, token?: string) =>
        set({
          isAuthenticated: true,
          userEmail: email,
          owner: owner,
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
