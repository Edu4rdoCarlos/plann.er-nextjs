import { Attachment } from "@/src/components/compounds/Attachments";
import {
  Content,
  ContentProps,
} from "@/src/components/compounds/Attachments/Content/Content";
import { CreateAttachment } from "@/src/components/compounds/Modal/CreateAttachment/CreateAttachment";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface AttachmentLayoutProps {
  items: Pick<ContentProps, "info" | "label">[];
}

export const AttachmentLayout = ({ items }: AttachmentLayoutProps) => {
  const [open, setOpen] = useState(false);

  const action = () => <CreateAttachment onOpenChange={setOpen} open={open} />;

  return (
    <div className="w-full">
      <Attachment title="Links Importantes" action={action()}>
        {items.length ? (
          items.map((item) => {
            return (
              <Content
                key={item.label}
                {...item}
                widget={
                  <Link href={item.info} className="w-fit" target="_blank">
                    <Link2 width={20} />
                  </Link>
                }
              />
            );
          })
        ) : (
          <div className="text-zinc-400">Nenhum link cadastrado</div>
        )}
      </Attachment>
    </div>
  );
};
