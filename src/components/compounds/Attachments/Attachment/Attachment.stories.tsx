import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Attachment, AttachmentProps } from "./Attachment";
import { Button } from "@/src/components/primitives/Button/Button";
import { Plus } from "lucide-react";
import { Content } from "../Content/Content";
import { attachmentItems } from "../mock";
import { useClipboard } from "@/src/hooks/useClipboard";

export default {
  title: "Components/Attachment",
  parameters: {
    layout: "centered",
  },
  args: {},
} as Meta;

const Template: StoryFn<AttachmentProps> = () => {
  const action = () => (
    <Button colorScheme="secondary">
      <Plus width={20} /> Cadastrar novo link
    </Button>
  );

  return (
    <div style={{ width: 320 }}>
      <Attachment title="Links Importantes" action={action()}>
        {attachmentItems.map((item) => {
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
  );
};

export const Primary = Template.bind({});
