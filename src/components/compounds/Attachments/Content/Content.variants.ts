import { tv } from "tailwind-variants";

const contentVariants = tv({
  slots: {
    sWrapper: ["flex", "justify-between", "w-full", "items-center"],
    sContent: ["flex", "flex-col", "gap-1"],
    sInfo: ["text-xs", "text-zinc-400", "font-light"],
    sLabel: ["text-base", "font-medium"],
  },
});

export const { sWrapper, sContent, sInfo, sLabel } = contentVariants();
