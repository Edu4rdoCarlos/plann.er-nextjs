import { tv } from "tailwind-variants";

const InviteMembersVariants = tv({
  slots: {
    sGuest: ["flex", "flex-wrap", "w-full", "gap-2.5"],
    sBar: ["w-full", "h-px", "bg-zinc-800", "my-1"],
    sEmpty: ["text-center", "italic", "text-zinc-600", "font-light"],
  },
});

export const { sBar, sGuest, sEmpty } = InviteMembersVariants();
