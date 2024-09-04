import { ContentProps } from "@/src/components/compounds/Attachments/Content/Content";
import {
  allMembers,
  attachmentItemsMock,
} from "@/src/components/compounds/Attachments/mock";
import { GuestsLayoutProps } from "@/src/components/Layout/Trip/InfoLayout/GuestLayout";

export const useInfoLayoutProps = () => {
  const attachmentItems: Pick<ContentProps, "info" | "label">[] =
    attachmentItemsMock || [];

  const guestItems: GuestsLayoutProps = { items: allMembers };
  return {
    attachmentItems,
    guestItems,
  };
};
