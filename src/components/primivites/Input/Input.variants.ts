import { tv } from "tailwind-variants";

const inputVariants = tv({
  slots: {
    sInputWrapper: [
      "rounded-lg",
      "bg-zinc-950",
      "border-zinc-800",
      "outline-none",
      "text-zinc-400",
      "border-[1px]",
      "font-normal",
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
    ],
    sInput: [
      "bg-transparent",
      "outline-none",
      "w-full",
      "peer",
      "focus:text-zinc-100",
      "placeholder:text-zinc-400",
    ],
  },
});

export const { sInputWrapper, sInput } = inputVariants();
