import { tv } from "tailwind-variants";

export const activityVariants = tv({
  slots: {
    sActivity: [
      "rounded-xl",
      "bg-zinc-900",
      "flex",
      "justify-between",
      "w-full",
      "px-4",
      "py-3",
      "items-center",
    ],
    sLabel: ["text-zinc-100"],
    sHour: ["text-zinc-400", "font-light", "text-sm"],
    sLabelWrapper: ["flex", "gap-3", "items-center"],
  },
  variants: {
    checked: {
      true: {
        sActivity: "opacity-60",
      },
    },
  },
});

export const { sActivity, sLabelWrapper, sLabel, sHour } = activityVariants();
