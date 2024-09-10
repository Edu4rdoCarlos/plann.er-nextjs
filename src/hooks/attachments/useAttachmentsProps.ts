import { useParams } from "next/navigation";
import { useAttachment } from "../useAttachment";
import { ContentProps } from "@/src/components/compounds/Attachments/Content/Content";

export const useAttachmentsProps = () => {
  const router = useParams();

  const { data } = useAttachment.ListAll(router.id as string);

  const attachments: Pick<ContentProps, "info" | "label">[] =
    data?.map((attachment) => {
      return {
        label: attachment.title,
        info: attachment.link,
      };
    }) || [];

  return attachments;
};
