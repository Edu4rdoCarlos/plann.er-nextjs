"use client";

import { useEffect } from "react";

export const GlobalKeyboardShortcuts = () => {
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

            if (e.altKey && (e.key === "a" || e.key === "A")) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("toggle-accessibility-settings"));
            }

            if (e.shiftKey && e.key === "?") {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("toggle-shortcuts-help"));
            }
        };

        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);
    return null;
};