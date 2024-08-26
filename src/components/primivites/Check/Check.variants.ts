import { tv } from "tailwind-variants";

export const checkVariants = tv({
  slots: { sIcon: ["text-zinc-400"] },
  variants: { checked: { true: { sIcon: ["text-lime-300"] } } },
});

export const { sIcon } = checkVariants();
