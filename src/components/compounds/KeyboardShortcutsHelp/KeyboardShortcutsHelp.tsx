"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Keyboard } from "lucide-react";
import {
  sShortcut,
  sShortcutKey,
  sShortcutDescription,
  sShortcutsList,
  sSection,
  sSectionTitle,
} from "./KeyboardShortcutsHelp.variants";

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutSection {
  title: string;
  shortcuts: Shortcut[];
}

const keyboardShortcuts: ShortcutSection[] = [
  {
    title: "Navegação Geral",
    shortcuts: [
      { keys: ["Tab"], description: "Navegar para o próximo elemento" },
      { keys: ["Shift", "Tab"], description: "Navegar para o elemento anterior" },
      { keys: ["Enter"], description: "Ativar elemento focado" },
      { keys: ["Espaço"], description: "Ativar botão ou checkbox focado" },
      { keys: ["Esc"], description: "Fechar modal ou dropdown" },
      { keys: ["?"], description: "Mostrar esta ajuda" },
    ],
  },
  {
    title: "Listas e Seleções",
    shortcuts: [
      { keys: ["↓"], description: "Navegar para baixo na lista" },
      { keys: ["↑"], description: "Navegar para cima na lista" },
      { keys: ["Enter"], description: "Selecionar item da lista" },
    ],
  },
  {
    title: "Modais",
    shortcuts: [
      { keys: ["Tab"], description: "Navegar entre elementos do modal" },
      { keys: ["Esc"], description: "Fechar modal" },
      { keys: ["Enter"], description: "Confirmar ação (quando aplicável)" },
    ],
  },
  {
    title: "Skip Links (Atalhos de Navegação)",
    shortcuts: [
      {
        keys: ["Tab"],
        description: "No início da página, pressione Tab para acessar links de navegação rápida",
      },
    ],
  },
];

export const KeyboardShortcutsHelp = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-shortcuts-help", handleToggle);
    return () => window.removeEventListener("toggle-shortcuts-help", handleToggle);
  }, []);

  // Atalho Shift + ? para abrir/fechar
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
          aria-label="Atalhos de teclado"
          className="fixed bottom-6 right-6 p-3 bg-lime-500 text-zinc-950 rounded-full shadow-lg hover:bg-lime-400 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-zinc-950 z-50"
        >
          <Keyboard size={24} />
        </button>
      }
    >
      <Dialog.Header
        title="Atalhos de Teclado"
        subtitle="Navegue facilmente pela aplicação usando seu teclado"
      />
      <Dialog.Content>
        <div className={sShortcutsList()}>
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
