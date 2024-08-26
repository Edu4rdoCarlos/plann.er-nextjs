import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  slots: {
    sButton: [
      "rounded-lg",
      "w-full",
      "flex",
      "justify-center",
      "gap-2",
      "items-center",
      "outline-none",
      "hover:opacity-90",
      "disabled:opacity-60",
      "disabled:cursor-not-allowed",
      "cursor-pointer",
      "font-medium",
      "[&>svg]:!w-5",
      "[&>svg]:!h-5",
      "text-lg",
      "transform",
      "duration-150",
    ],
  },
  variants: {
    colorScheme: {
      primary: { sButton: ["bg-lime-300 text-lime-950"] },
      secondary: { sButton: ["bg-zinc-800 text-zinc-200"] },
    },
    size: {
      sm: {
        sButton: [""],
      },
      md: {
        sButton: ["px-5", "py-2.5"],
      },
    },
  },
});

export const { sButton } = buttonVariants();
