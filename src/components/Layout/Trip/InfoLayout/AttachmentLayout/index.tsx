import { Attachment } from "@/src/components/compounds/Attachments";
import { AttachmentProps } from "@/src/components/compounds/Attachments/Attachment/Attachment";
import { Content, ContentProps } from "@/src/components/compounds/Attachments/Content/Content";
import { Button } from "@/src/components/primitives/Button/Button";
import { useClipboard } from "@/src/hooks/useClipboard";
import { Plus } from "lucide-react";

interface AttachmentLayoutProps {
  items: Pick<ContentProps,'info' |'label'>[]
}

export const AttachmentLayout = ({items}: AttachmentLayoutProps) => {
  const action = () => (
    <Button colorScheme="secondary">
      <Plus width={20} /> Cadastrar novo link
    </Button>
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