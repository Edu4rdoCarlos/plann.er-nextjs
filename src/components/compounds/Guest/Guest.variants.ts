import { tv } from "tailwind-variants";

const guestVariants = tv({
  slots: {
    sGuest: [
      "bg-zinc-800/70",
      "rounded-md",
      "py-2",
      "px-3",
      "flex",
      "items-center",
      "gap-3",
    ],
    sEmail: ["text-zinc-300"],
  },
});

export const { sGuest, sEmail } = guestVariants();
