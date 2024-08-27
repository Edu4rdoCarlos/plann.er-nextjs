import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Input, InputProps } from "./Input";
import { ArrowRight, AtSign } from "lucide-react";
import { Button } from "../Button/Button";

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
  <div style={{ width: 500 }}>
    <Input {...args} />
  </div>
);

export const Default = Template.bind({});

export const WithButton = Template.bind({});
WithButton.args = {
  cta: (
    <Button size="sm" className="w-fit">
      Confirmar viagem <ArrowRight width={20} />
    </Button>
  ),
};
