import { tv } from "tailwind-variants";

export const sSkipLinkContainer = tv({
  base: "fixed top-0 left-0 z-[9999]",
});

export const sSkipLink = tv({
  base: [
    "absolute left-0 top-0",
    "px-4 py-2",
    "bg-lime-500 text-zinc-950",
    "font-medium",
    "transform -translate-y-full",
    "transition-transform duration-200",
    "focus:translate-y-0",
    "focus:outline-none focus:ring-2 focus:ring-lime-400",
  ],
});
