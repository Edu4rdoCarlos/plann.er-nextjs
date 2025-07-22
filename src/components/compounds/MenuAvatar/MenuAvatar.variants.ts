import { tv } from "tailwind-variants";

export const sMenuAvatar = tv({
  base: "relative inline-block",
});

export const sAvatar = tv({
  base: [
    "w-8 h-8 rounded-full",
    "overflow-hidden",
    "flex items-center justify-center",
    "transition-transform duration-200",
    "cursor-pointer",
    "hover:scale-105",
    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
    "border-2 border-white dark:border-zinc-700",
    "shadow-sm",
  ],
});

export const sDropdown = tv({
  base: [
    "absolute right-0 top-10 z-50",
    "w-64 bg-white dark:bg-zinc-800",
    "border border-zinc-200 dark:border-zinc-700",
    "rounded-lg shadow-lg",
    "py-1",
    "animate-in fade-in-0 zoom-in-95",
  ],
});

export const sMenuItem = tv({
  base: [
    "w-full px-4 py-2",
    "text-left text-sm",
    "flex items-center gap-3",
    "transition-colors duration-150",
    "cursor-pointer",
    "focus:outline-none",
  ],
  variants: {
    variant: {
      default: [
        "text-zinc-700 dark:text-zinc-300",
        "hover:bg-zinc-100 dark:hover:bg-zinc-700",
        "focus:bg-zinc-100 dark:focus:bg-zinc-700",
      ],
      danger: [
        "text-red-600 dark:text-red-400",
        "hover:bg-red-50 dark:hover:bg-red-900/20",
        "focus:bg-red-50 dark:focus:bg-red-900/20",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
