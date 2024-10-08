import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  slots: {
    sButton: [
      "rounded-lg",
      "w-full",
      "flex",
      "justify-center",
      "items-center",
      "outline-none",
      "hover:opacity-90",
      "disabled:opacity-60",
      "disabled:cursor-not-allowed",
      "cursor-pointer",
      "transform",
      "duration-150",
      "text-nowrap",
    ],
  },
  variants: {
    colorScheme: {
      primary: { sButton: ["bg-lime-300 text-lime-950"] },
      secondary: { sButton: ["bg-zinc-800 text-zinc-200"] },
    },
    variants: {
      default: {},
      ghost: {},
    },
    size: {
      sm: {
        sButton: [
          "py-1.5",
          "px-4",
          "text-sm",
          "font-normal",
          "[&>svg]:!w-4",
          "[&>svg]:!h-4",
          "gap-1.5",
        ],
      },
      md: {
        sButton: [
          "px-5",
          "py-2.5",
          "text-lg",
          "font-medium",
          "[&>svg]:!w-5",
          "[&>svg]:!h-5",
          "gap-2",
        ],
      },
    },
  },
  compoundVariants: [
    {
      colorScheme: "primary",
      variants: "ghost",
      class: {
        sButton: ["bg-transparent", "text-lime-300"],
      },
    },
    {
      colorScheme: "secondary",
      variants: "ghost",
      class: {
        sButton: ["bg-transparent", "text-zinc-400", "p-0"],
      },
    },
  ],
});

export const { sButton } = buttonVariants();
