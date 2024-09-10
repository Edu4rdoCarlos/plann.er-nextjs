import { ContentProps } from "@/src/components/compounds/Attachments/Content/Content";
import {
  allMembers,
  attachmentItemsMock,
} from "@/src/components/compounds/Attachments/mock";
import { useAttachmentsProps } from "../attachments/useAttachmentsProps";
import { MemberLayoutProps } from "@/src/components/Layout/Trip/InfoLayout/MemberLayout";
import { useMembersProps } from "../members/useMembersProps";

export const useInfoLayoutProps = () => {
  const attachmentItems = useAttachmentsProps();

  const memberItems = useMembersProps();

  return {
    attachmentItems,
    memberItems,
  };
};
