import { tv } from "tailwind-variants";

export const calendarVariants = tv({
  slots: {
    sWrapper: ["relative", "[&>button]:font-light", "z-10"],
    sCalendarWrapper: ["absolute", "top-0", "translate-y-14"],
    sCalendar: [
      "[&.react-calendar]:bg-zinc-900",
      "[&.react-calendar]:rounded-lg",
      "[&.react-calendar]:border-zinc-800",
      "[&.react-calendar]:border-[1px]",
      "[&_button:hover]:!bg-zinc-800/80",
      "[&_button]:!rounded",
    ],
  },
  variants: {
    as: {
      input: {
        sWrapper: [
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
          "[&>button]:justify-start",
        ],
      },
    },
  },
});

export const { sWrapper, sCalendar, sCalendarWrapper } = calendarVariants();
