import { Attachment } from "@/src/components/compounds/Attachments";
import {
  Content,
  ContentProps,
} from "@/src/components/compounds/Attachments/Content/Content";
import { InviteGuests } from "@/src/components/compounds/Modal/InviteGuests/InviteGuests";
import { Button } from "@/src/components/primitives/Button/Button";
import { ReactNode, useState } from "react";

interface GuestsItems extends Pick<ContentProps, "info" | "label"> {
  widget: ReactNode;
}

export interface MemberLayoutProps {
  items: GuestsItems[];
}

export const MemberLayout = ({ items }: MemberLayoutProps) => {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState<string[]>([]);

  const action = () => (
    <InviteGuests
      onOpenChange={setOpen}
      open={open}
      guests={guests}
      onGuestsChange={setGuests}
    />
  );

  return (
    <div className="w-full">
      <Attachment title="Links Importantes" action={action()}>
        {items.length ? (
          items.map((item) => {
            return (
              <Content
                key={item.label}
                {...item}
                widget={
                  <Button
                    className="w-fit"
                    variants="ghost"
                    colorScheme="secondary"
                  >
                    {item.widget}
                  </Button>
                }
              />
            );
          })
        ) : (
          <div className="text-zinc-400">Nenhum convite enviado</div>
        )}
      </Attachment>
    </div>
  );
};
