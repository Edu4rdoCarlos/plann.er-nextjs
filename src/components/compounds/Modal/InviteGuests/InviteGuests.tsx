import { Button } from "@/src/components/primitives/Button/Button";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { AtSign, Plus } from "lucide-react";
import { useRef } from "react";
import { Guest } from "../../Guest/Guest";
import { sBar, sEmpty, sGuest } from "./InviteGuests.variants";

export interface InviteGuestsProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onGuestsChange: (guest: string[]) => void;
  guests: string[];
}
export const InviteGuests = (props: InviteGuestsProps) => {
  const { open, onOpenChange, onGuestsChange, guests } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInviteGuests = () => {
    const input = inputRef.current;
    console.log(input?.value);
    if (input) {
      const newValue = input.value;
      const newGuests = [...guests, newValue];
      onGuestsChange(newGuests);
      console.log(guests);
      input.value = "";
    }
  };

  const handleCancelGuest = (guest: string) => {
    const list = guests.filter((item) => item !== guest);
    onGuestsChange(list);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleInviteGuests();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Header
        title="Selecionar convidados"
        subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem."
      />
      <Dialog.Content>
        {guests.length ? (
          <div className={sGuest()}>
            {guests.map((guest) => (
              <Guest
                key={guest}
                email={guest}
                onCancel={() => handleCancelGuest(guest)}
              />
            ))}
          </div>
        ) : (
          <div className={sEmpty()}>Nenhum convite inserido</div>
        )}
        <div className={sBar()} />
      </Dialog.Content>
      <Dialog.Footer>
        <Input
          ref={inputRef}
          Icon={AtSign}
          placeholder="Digite o e-mail do convidado"
          onKeyDown={handleKeyDown}
          cta={
            <Button onClick={handleInviteGuests} className="w-fit" size="sm">
              Convidar <Plus width={20} />
            </Button>
          }
        />
      </Dialog.Footer>
    </Dialog.Root>
  );
};
