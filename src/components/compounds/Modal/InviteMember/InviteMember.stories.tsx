import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { InviteMembers, InviteMembersProps } from "./InviteMember";

export default {
  title: "Components/Modal/InviteMembers",
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<InviteMembersProps> = (args) => {
  const [open, setOpen] = useState(args.open);
  const [guests, setGuests] = useState<string[]>([]);

  return (
    <InviteMembers
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
