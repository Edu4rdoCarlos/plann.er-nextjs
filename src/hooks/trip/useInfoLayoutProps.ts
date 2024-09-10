import { useAttachmentsProps } from "../attachments/useAttachmentsProps";
import { useMembersProps } from "../members/useMembersProps";

export const useInfoLayoutProps = () => {
  const attachmentItems = useAttachmentsProps();

  const memberItems = useMembersProps();

  return {
    attachmentItems,
    memberItems,
  };
};
