import { tv } from "tailwind-variants";

export const sShortcutsList = tv({
  base: "space-y-6 max-h-[60vh] overflow-y-auto",
});

export const sSection = tv({
  base: "space-y-3",
});

export const sSectionTitle = tv({
  base: "text-lg font-semibold text-lime-500 mb-3",
});

export const sShortcut = tv({
  base: "flex items-start justify-between gap-4 py-2 border-b border-zinc-800 last:border-0",
});

export const sShortcutKey = tv({
  base: [
    "px-2 py-1",
    "bg-zinc-800",
    "text-lime-400",
    "rounded",
    "font-mono text-sm",
    "border border-zinc-700",
    "shadow-sm",
  ],
});

export const sShortcutDescription = tv({
  base: "text-zinc-300 text-sm flex-1 text-right",
});
