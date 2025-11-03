import { tv } from "tailwind-variants";

export const inputVariants = tv({
  slots: {
    sInputWrapper: [
      "rounded-lg",
      "bg-zinc-950",
      "border-zinc-800",
      "outline-none",
      "text-zinc-400",
      "border-[1px]",
      "font-light",
      "py-3.5",
      "px-4",
      "text-lg",
      "flex",
      "items-center",
      "gap-2.5",
      "w-full",
      "focus-within:border-lime-300",
      "transform",
      "duration-150",
      "flex-wrap",
      "md:flex-nowrap",
      "justify-between",
      "min-h-[44px]", // Accessibility: minimum touch target
    ],
    sInput: [
      "bg-transparent",
      "outline-none",
      "w-full",
      "peer",
      "focus:text-zinc-100",
      "placeholder:text-zinc-400",
      "autofill:shadow-[inset_0_0_0px_1000px_rgb(9_9_11)]", // Force dark background on autofill
      "autofill:[-webkit-text-fill-color:rgb(244_244_245)]", // Force light text color on autofill
    ],
  },
});

export const { sInputWrapper, sInput } = inputVariants();
