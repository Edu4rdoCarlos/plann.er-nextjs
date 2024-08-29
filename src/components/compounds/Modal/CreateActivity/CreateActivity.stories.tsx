import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { CreateActivity, CreateActivityProps } from "./CreateActivity";

export default {
  title: "Components/Modal/CreateActivity",
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<CreateActivityProps> = () => {
  const [open, setOpen] = useState(false);

  return <CreateActivity onOpenChange={setOpen} open={open} />;
};

export const Default = Template.bind({});
