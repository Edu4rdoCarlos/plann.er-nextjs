export const attachmentItemsMock:Pick<ContentProps,'info' |'label'>[] = [
  {
    label: "Reserva do AirBnB",
    info: "https://www.airbnb.com.br/rooms/104700011",
  },
  {
    label: "Regras da casa",
    info: "https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000",
  },
];

import { Check } from "../../primitives/Check/Check";
import { ContentProps } from "./Content/Content";

export const member1 = {
  label: "Guilherme Barbosa",
  info: "guilhemebarbosa@gmail.com",
  widget: <Check />,
};

export const member2 = {
  label: "Eduardo Carlos",
  info: "eduardocarlos@gmail.com",
  widget: <Check checked />,
};

export const member3 = {
  label: "Victor Luan",
  info: "victorluan@gmail.com",
  widget: <Check checked />,
};

export const member4 = {
  label: "Samila Raphaela",
  info: "samila@gmail.com",
  widget: <Check />,
};


export const allMembers = [member1, member2, member3, member4]