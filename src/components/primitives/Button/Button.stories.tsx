import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "./Button";
import { ArrowRight } from "lucide-react";

export default {
  title: "Primitives/Button",
  parameters: {
    layout: "centered",
  },
  args: {
    size: "md",
    colorScheme: "primary",
    children: (
      <>
        Label <ArrowRight />
      </>
    ),
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => (
  <div style={{ width: 300 }}>
    <Button {...args} />
  </div>
);

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
  colorScheme: "secondary",
};

export const Ghost = Template.bind({});
Ghost.args = {
  variants: "ghost",
};

export const disabled = Template.bind({});
disabled.args = {
  disabled: true,
};
