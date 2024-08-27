import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { CalendarProps } from "react-calendar";
import { Calendar } from "./Calendar";

export default {
  title: "Primitives/Calendar",
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<CalendarProps> = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {};
