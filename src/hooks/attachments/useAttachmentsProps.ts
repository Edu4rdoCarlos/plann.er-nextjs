import { useParams } from "next/navigation";
import { useAttachment } from "../useAttachment";

export const useAttachmentsProps = () => {
  const router = useParams();

  const { data } = useAttachment.ListAll(router.id as string);

  const attachments =
    data?.map((attachment) => {
      return {
        label: attachment.title,
        info: attachment.link,
        id: attachment.id,
        tripId: attachment.tripId,
      };
    }) || [];

  return attachments;
};
