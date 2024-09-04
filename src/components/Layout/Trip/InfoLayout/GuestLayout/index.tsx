import { Attachment } from "@/src/components/compounds/Attachments";
import { Content, ContentProps } from "@/src/components/compounds/Attachments/Content/Content";
import { Button } from "@/src/components/primitives/Button/Button";
import {  UserRoundCog } from "lucide-react";
import { ReactNode } from "react";

interface GuestsItems extends Pick<ContentProps,'info' |'label'> {
  widget: ReactNode
}

export interface GuestsLayoutProps {
  items: GuestsItems[]
}

export const GuestsLayout = ({items}: GuestsLayoutProps) => {
  const action = () => (
    <Button colorScheme="secondary">
      <UserRoundCog width={20} /> Gerenciar convidados
    </Button>
  );

  return (
    <div className="w-full">
      <Attachment title="Links Importantes" action={action()}>
        {items.map((item) => {
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
        })}
      </Attachment>
    </div>
  )
}