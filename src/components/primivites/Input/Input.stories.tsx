import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Input, InputProps } from "./Input";
import { ArrowRight, AtSign } from "lucide-react";

export default {
  title: "Primitives/Input",
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Placeholder",
    Icon: AtSign,
    type: "email",
  },
} as Meta;

const Template: StoryFn<InputProps> = (args) => (
  <div style={{ width: 400 }}>
    <Input {...args} />
  </div>
);

export const Default = Template.bind({});
