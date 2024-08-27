import { ReactNode } from "react";
import { sAttachment, sAttachmentContent, sTitle } from "./Attachment.variants";

export interface AttachmentProps {
  className?: string;
  title: string;
  action: ReactNode;
  children: ReactNode;
}

export const Attachment = (props: AttachmentProps) => {
  const { action, title, children, className } = props;
  return (
    <div className={sAttachment()}>
      <h3 className={sTitle()}>{title}</h3>
      <div className={sAttachmentContent()}>{children}</div>
      {action}
    </div>
  );
};
