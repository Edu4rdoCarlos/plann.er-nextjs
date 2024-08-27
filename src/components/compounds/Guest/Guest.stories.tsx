import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Guest, GuestProps } from "./Guest";

export default {
  title: "Components/Guest",
  parameters: {
    layout: "centered",
  },
  args: {
    email: "eduardocarlos@gmail.com",
    onCancel: () => void 0,
  },
} as Meta;

const Template: StoryFn<GuestProps> = (args) => <Guest {...args} />;

export const Default = Template.bind({});
