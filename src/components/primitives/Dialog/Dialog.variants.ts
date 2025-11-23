import { tv } from "tailwind-variants";

const dialogVariants = tv({
  slots: {
    sWrapper: [
      "fixed",
      "inset-0",
      "flex",
      "items-center",
      "justify-center",
      "bg-black/60",
      "z-[9999]",
      "backdrop-blur-[3px]",
    ],
    sContainer: [
      "bg-zinc-900",
      "rounded-t-3xl",
      "md:rounded-xl",
      "shadow-xl",
      "max-w-xl",
      "w-full",
      "md:relative",
      "absolute bottom-0 md:bottom-auto",
      "px-7",
      "py-5",
      "z-[10000]",
    ],
    sCloseButton: [
      "text-zinc-400",
      "hover:text-zinc-100",
      "focus:outline-none",
      "absolute",
      "right-5",
      "top-5",
      "transition",
      "duration-150",
    ],
    sContentWrapper: [""],
    sHeader: ["flex", "justify-between", "mb-5", "flex-col", "gap-1"],
    sTitle: ["text-xl", "text-accent-800", "font-semibold", "tracking-normal"],
    sFooter: ["flex", "flex-col", "gap-3", "mt-3"],
    sContent: ["mt-6", "w-full", "flex", "flex-col", "gap-2"],
    sSubtitle: [
      "[&>span]:text-zinc-100",
      "[&>span]:font-semibold",
      "text-zinc-400",
      "text-base",
      "font-light",
    ],
  },
});

export const {
  sWrapper,
  sContainer,
  sCloseButton,
  sContentWrapper,
  sHeader,
  sTitle,
  sFooter,
  sContent,
  sSubtitle,
} = dialogVariants();
