import { tv } from "tailwind-variants";

export const activityVariants = tv({
  slots: {
    sCollection: [
      "rounded-xl",
      "bg-zinc-900",
      "flex",
      "justify-between",
      "w-full",
      "px-4",
      "py-3",
    ],
    sLabel: ["text-zinc-100"],
    sHour: ["text-zinc-400"],
    sLabelWrapper: ["flex", "gap-3", "items-center"],
  },
  variants: {
    checked: {
      true: {
        sCollection: "opacity-60",
      },
    },
  },
});

export const { sCollection, sLabelWrapper, sLabel, sHour } = activityVariants();
