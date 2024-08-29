import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { FormatLocation } from "@/src/utils/location";
import { getRangeDate } from "@/src/utils/date";
import { InviteGuests, InviteGuestsProps } from "./InviteGuests";

export default {
  title: "Components/Modal/InviteGuests",
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<InviteGuestsProps> = (args) => {
  const [open, setOpen] = useState(args.open);
  const [guests, setGuests] = useState<string[]>([]);

  return (
    <InviteGuests
      onOpenChange={setOpen}
      open={open}
      guests={guests}
      onGuestsChange={setGuests}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  open: true,
};
