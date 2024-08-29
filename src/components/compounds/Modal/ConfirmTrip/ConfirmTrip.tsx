import { Button } from "@/src/components/primitives/Button/Button";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { Mail, User } from "lucide-react";
import { useState } from "react";

export interface ConfirmTripProps {
  date: string;
  location: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}
export const ConfirmTrip = (props: ConfirmTripProps) => {
  const { location, date, open, onOpenChange } = props;

  const handleConfirmTrip = () => {
    onOpenChange(false);
  };
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Header
        title="Confirmar participação"
        subtitle={
          <>
            Você foi convidado(a) para participar de uma viagem para{" "}
            <span>{location}</span> nas datas de <span>{date}</span>.
          </>
        }
      />
      <Dialog.Content>
        <Input Icon={User} placeholder="Seu nome completo" />
        <Input Icon={Mail} type="email" placeholder="Seu e-mail" />
      </Dialog.Content>
      <Dialog.Footer>
        <Button onClick={handleConfirmTrip}>Confirmar minha presença</Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
};
