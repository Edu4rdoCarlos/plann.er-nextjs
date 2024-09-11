import { tv } from "tailwind-variants";

const contentVariants = tv({
  slots: {
    sWrapper: ["flex", "justify-between", "w-full", "items-center"],
    sContent: ["flex", "flex-col", "gap-1", "group"],
    sInfo: ["text-xs", "text-zinc-400", "font-light"],
    sLabel: ["text-base", "font-medium", "flex", "gap-1", "items-center"],
  },
});

export const { sWrapper, sContent, sInfo, sLabel } = contentVariants();
