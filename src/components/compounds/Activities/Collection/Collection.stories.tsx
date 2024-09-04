import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { CollectionProps, Collection } from "./Collection";
import { activitiesMock2 } from "./mock";

export default {
  title: "Components/Activities",
  parameters: {
    layout: "centered",
  },
  args: {
    activities: activitiesMock2,
    date: "2024-08-19T08:00:00.123Z",
  },
} as Meta;

const Template: StoryFn<CollectionProps> = (args) => (
  <div style={{ width: 600 }}>
    <Collection {...args} />
  </div>
);

export const Default = Template.bind({});

export const Empty = Template.bind({});
Empty.args = {
  activities: [],
};
