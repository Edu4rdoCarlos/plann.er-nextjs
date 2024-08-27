import { tv } from "tailwind-variants";

const attachmentVariants = tv({
  slots: {
    sAttachment: ["flex", "flex-col", "gap-5"],
    sTitle: ["text-xl", "font-semibold", "text-zinc-50", "leading-none"],
    sAttachmentContent: ["flex", "flex-col", "gap-4"],
  },
});

export const { sAttachment, sTitle, sAttachmentContent } = attachmentVariants();
