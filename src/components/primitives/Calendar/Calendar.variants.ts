import { tv } from "tailwind-variants";

const calendarVariants = tv({
  slots: {
    sWrapper: ["relative"],
    sCalendarWrapper: ["absolute", "top-0", "translate-y-10"],
    sCalendar: [
      "[&.react-calendar]:bg-zinc-900",
      "[&.react-calendar]:rounded-lg",
      "[&.react-calendar]:border-zinc-800",
      "[&.react-calendar]:border-[1px]",
      "[&_button:hover]:!bg-zinc-800/80",
      "[&_button]:!rounded",
    ],
  },
});

export const { sWrapper, sCalendar, sCalendarWrapper } = calendarVariants();
