import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  slots: {
    sBar: ["h-[1.5px]", "bg-zinc-900", "w-full", "my-6"],
  },
});

export const { sBar } = buttonVariants();
