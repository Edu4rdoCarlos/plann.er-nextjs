import { tv } from "tailwind-variants";

export const toastVariants = tv({
  slots: {
    sWrapper: [
      "fixed",
      "top-4",
      "right-4",
      "max-w-xs",
      "px-4",
      "py-2",
      "rounded-lg",
      "shadow-lg",
      "flex",
      "items-center",
      "space-x-2",
      "text-white",
    ],
    sIcon: ["w-5 h-5"],
    sButton: ["w-fit"],
  },
  variants: {
    type: {
      success: {
        sWrapper: ["bg-lime-300 text-lime-950"],
        sIcon: ["text-lime-950"],
        sButton: ["text-lime-950"],
      },
      error: { sWrapper: ["bg-red-500"] },
    },
  },
});

export const { sWrapper, sIcon, sButton } = toastVariants();
