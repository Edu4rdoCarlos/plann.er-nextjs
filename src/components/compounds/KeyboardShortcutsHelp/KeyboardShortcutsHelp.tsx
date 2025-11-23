"use client";

import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Keyboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  sSection,
  sSectionTitle,
  sShortcut,
  sShortcutDescription,
  sShortcutKey,
  sShortcutsList,
} from "./KeyboardShortcutsHelp.variants";

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutSection {
  title: string;
  shortcuts: Shortcut[];
}

export const KeyboardShortcutsHelp = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("shortcuts");

  const keyboardShortcuts: ShortcutSection[] = [
    {
      title: t("generalNavigationTitle"),
      shortcuts: [
        { keys: ["Tab"], description: t("generalNavNext") },
        { keys: ["Shift", "Tab"], description: t("generalNavPrevious") },
        { keys: ["Enter"], description: t("generalActivateFocused") },
        { keys: ["Espaço"], description: t("generalActivateButton") },
        { keys: ["Esc"], description: t("generalCloseModal") },
        { keys: ["?"], description: t("generalShowHelp") },
        { keys: ["Alt", "A"], description: t("generalOpenAccessibility") },
      ],
    },
    {
      title: t("listSelectionTitle"),
      shortcuts: [
        { keys: ["↓"], description: t("listNavDown") },
        { keys: ["↑"], description: t("listNavUp") },
        { keys: ["Enter"], description: t("listSelectItem") },
      ],
    },
    {
      title: t("modalsTitle"),
      shortcuts: [
        { keys: ["Tab"], description: t("modalsNav") },
        { keys: ["Esc"], description: t("modalsClose") },
        { keys: ["Enter"], description: t("modalsConfirm") },
      ],
    },
    {
      title: t("skipLinksTitle"),
      shortcuts: [
        {
          keys: ["Tab"],
          description: t("skipLinksDescription"),
        },
      ],
    },
  ];

  useEffect(() => {
    const handleToggle = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-shortcuts-help", handleToggle);
    return () => window.removeEventListener("toggle-shortcuts-help", handleToggle);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "?") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button
          aria-label={t("triggerAriaLabel")}
          className="fixed bottom-6 right-6 p-3 bg-lime-500 text-zinc-950 rounded-full shadow-lg hover:bg-lime-400 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-zinc-950 z-50"
        >
          <Keyboard size={24} />
        </button>
      }
    >
      <Dialog.Header
        title={t("headerTitle")}
        subtitle={t("headerSubtitle")}
      />
      <Dialog.Content>
        <div className={`${sShortcutsList()} pr-4`}>
          {keyboardShortcuts.map((section) => (
            <div key={section.title} className={sSection()}>
              <h3 className={sSectionTitle()}>{section.title}</h3>
              {section.shortcuts.map((shortcut, index) => (
                <div key={index} className={sShortcut()}>
                  <div className="flex gap-2">
                    {shortcut.keys.map((key) => (
                      <kbd key={key} className={sShortcutKey()}>
                        {key}
                      </kbd>
                    ))}
                  </div>
                  <span className={sShortcutDescription()}>
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};