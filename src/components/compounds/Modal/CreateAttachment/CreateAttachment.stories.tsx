import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { CreateAttachment, CreateAttachmentProps } from "./CreateAttachment";

export default {
  title: "Components/Modal/CreateAttachment",
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<CreateAttachmentProps> = () => {
  const [open, setOpen] = useState(false);

  return <CreateAttachment onOpenChange={setOpen} open={open} />;
};

export const Default = Template.bind({});
