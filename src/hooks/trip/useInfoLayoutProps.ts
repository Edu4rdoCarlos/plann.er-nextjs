import { ContentProps } from "@/src/components/compounds/Attachments/Content/Content";
import { attachmentItemsMock } from "@/src/components/compounds/Attachments/mock";

export const useInfoLayoutProps = () => {
  const attachmentItems: Pick<ContentProps, "info" | "label">[] =
    attachmentItemsMock || [];
  return {
    attachmentItems,
  };
};
