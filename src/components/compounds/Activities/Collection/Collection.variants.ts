import { tv } from "tailwind-variants";

export const activityVariants = tv({
  slots: {
    sCollectionWrapper: ["flex", "flex-col", "gap-2"],
    sHeading: ["flex", "items-end", "gap-2.5"],
    sDay: ["text-xl", "text-zinc-50", "font-semibold"],
    sDayOfWeek: ["text-sm", "text-zinc-500", "font-light", "capitalize"],
    sActivities: ["flex", "flex-col", "gap-2.5", "mt-1.5"],
    sEmpty: ["text-zinc-500", "font-light", "text-sm"],
  },
});

export const {
  sCollectionWrapper,
  sHeading,
  sDay,
  sDayOfWeek,
  sActivities,
  sEmpty,
} = activityVariants();
