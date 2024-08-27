import { tv } from "tailwind-variants";

const calendarVariants = tv({
  slots: {
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

export const { sCalendar } = calendarVariants();
