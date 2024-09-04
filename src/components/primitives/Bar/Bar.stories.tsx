import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Bar, BarProps } from "./Bar";

export default {
  title: "Primitives/Bar",
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<BarProps> = (args) => (
  <div style={{ width: 300 }}>
    <Bar {...args} />
  </div>
);

export const Primary = Template.bind({});
