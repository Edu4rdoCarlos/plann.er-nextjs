import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { CalendarProps } from "react-calendar";
import { Calendar, CalendarValue } from "./Calendar";

export default {
  title: "Primitives/Calendar",
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<CalendarProps> = (args) => {
  const [calendarValue, setCalendarValue] = useState<CalendarValue>(new Date());

  const handleCalendarChange = (value: CalendarValue) => {
    console.log("foi");
    setCalendarValue(value);
  };

  useEffect(() => {
    console.log(calendarValue);
  }, [calendarValue]);

  return (
    <Calendar onChange={handleCalendarChange} value={calendarValue} {...args} />
  );
};

export const Default = Template.bind({});
Default.args = {};
