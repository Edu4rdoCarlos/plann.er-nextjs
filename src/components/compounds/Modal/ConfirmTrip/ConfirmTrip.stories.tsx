import { getRangeDate } from "@/src/lib/utils/date";
import { FormatLocation } from "@/src/lib/utils/location";
import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { ConfirmTrip, ConfirmTripProps } from "./ConfirmTrip";

export default {
  title: "Components/Modal/ConfirmTrip",
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<ConfirmTripProps> = (args) => {
  const startDate = new Date("2024-08-09T14:00:00.123Z");
  const endDate = new Date("2024-08-26T14:00:00.123Z");

  const [open, setOpen] = useState(args.open);

  const location = FormatLocation({ city: "são paulo", acronym: "al" });
  const rangeDate = getRangeDate({ startDate, endDate });

  return (
    <ConfirmTrip
      onOpenChange={setOpen}
      open={open}
      location={location}
      date={rangeDate} tripId={""} email={""}/>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: true,
};
