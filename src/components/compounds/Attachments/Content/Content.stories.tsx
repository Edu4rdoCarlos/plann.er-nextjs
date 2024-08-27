import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Content, ContentProps } from "./Content";
import { Button } from "../../../primivites/Button/Button";
import { useClipboard } from "@/src/hooks/useClipboard";
import { member1, member2 } from "../mock";

export default {
  title: "Components/Attachment/Content",
  parameters: {
    layout: "centered",
  },
  args: {},
} as Meta;

const ClipBoardLayout: StoryFn<ContentProps> = () => {
  const { Icon, copy } = useClipboard();

  const label = "Reserva do AirBnB";
  const info =
    "https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000";
  const widget = (
    <Button colorScheme="secondary" variants="ghost" onClick={() => copy(info)}>
      <Icon width={22} />
    </Button>
  );

  return (
    <div style={{ width: 320 }}>
      <Content info={info} label={label} widget={widget} />
    </div>
  );
};

export const WithAction = ClipBoardLayout.bind({});

const MemberLayout: StoryFn<ContentProps> = () => {
  return (
    <div
      style={{
        width: 320,
        display: "flex",
        gap: "12px",
        flexDirection: "column",
      }}
    >
      <Content {...member1} />
      <Content {...member2} />
    </div>
  );
};

export const WithIcon = MemberLayout.bind({});
