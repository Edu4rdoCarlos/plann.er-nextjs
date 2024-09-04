import { Attachment } from "@/src/components/compounds/Attachments";
import { Content, ContentProps } from "@/src/components/compounds/Attachments/Content/Content";
import { CreateAttachment } from "@/src/components/compounds/Modal/CreateAttachment/CreateAttachment";
import { Button } from "@/src/components/primitives/Button/Button";
import { useClipboard } from "@/src/hooks/useClipboard";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AttachmentLayoutProps {
  items: Pick<ContentProps,'info' |'label'>[]
}

export const AttachmentLayout = ({items}: AttachmentLayoutProps) => {
  const [open, setOpen] = useState(false);

  const action = () => (
    <CreateAttachment onOpenChange={setOpen} open={open} />
  );

  return (
    <div className="w-full">
      <Attachment title="Links Importantes" action={action()}>
        {items.map((item) => {
          const { Icon, copy } = useClipboard();

          return (
            <Content
              key={item.label}
              {...item}
              widget={
                <Button
                  className="w-fit"
                  variants="ghost"
                  colorScheme="secondary"
                  onClick={() => copy(item.info)}
                >
                  <Icon width={20} />
                </Button>
              }
            />
          );
        })}
      </Attachment>
    </div>
  )
}