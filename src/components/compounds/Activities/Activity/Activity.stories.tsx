import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Activity, ActivityProps } from "./Activity";

export default {
  title: "Components/Activities/Item",
  parameters: {
    layout: "centered",
  },
  args: {
    date: "2024-08-26T14:00:00.123Z",
    label: "Corrida de Kart",
  },
} as Meta;

const Template: StoryFn<ActivityProps> = (args) => (
  <div style={{ width: 600 }}>
    <Activity {...args} />
  </div>
);

export const Default = Template.bind({});

export const Concluded = Template.bind({});
Concluded.args = {
  checked: true,
};
