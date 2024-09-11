"use client";

import { Button } from "@/src/components/primitives/Button/Button";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { AtSign, Plus, UserRoundCog } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Guest } from "../../Guest/Guest";
import { sBar, sEmpty, sGuest } from "./InviteMember.variants";

import { useMember } from "@/src/hooks/useMember";
import { useToast } from "@/src/providers/ToastProvider";
import {
  InviteMembersFormData,
  InviteMembersSchema,
} from "@/src/schemas/members/membersSchema";
import { useParams } from "next/navigation";
import { z } from "zod";

export interface InviteMembersProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onGuestsChange: (guest: string[]) => void;
  guests: string[];
  hideTrigger?: boolean;
}

export const InviteMembers = (props: InviteMembersProps) => {
  const { open, onOpenChange, onGuestsChange, guests, hideTrigger } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useParams();
  const { showToast } = useToast();

  const { mutateAsync: inviteMember } = useMember.Create();

  const handleInviteMembers = () => {
    const input = inputRef.current;
    if (input) {
      const newValue = input.value.trim();
      if (newValue) {
        try {
          InviteMembersSchema.parse({
            email: newValue,
          } as InviteMembersFormData);
          const newGuests = [...guests, newValue];
          onGuestsChange(newGuests);
          input.value = "";
          setError(null);
        } catch (e) {
          if (e instanceof z.ZodError) {
            setError(e.errors[0]?.message || "Erro de validação.");
          } else {
            console.error(e);
          }
        }
      }
    }
  };

  const handleCancelGuest = (guest: string) => {
    const list = guests.filter((item) => item !== guest);
    onGuestsChange(list);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleInviteMembers();
    }
  };

  const handleSubmit = async () => {
    const res = await inviteMember({
      formData: guests.map((email) => {
        return { email };
      }),
      tripId: router.id as string,
    });
    if (res) {
      onOpenChange(false);
      showToast("Operation Successful!", "success");
      return;
    }
    showToast("Operation Error!", "error");
  };

  useEffect(() => {
    onGuestsChange([]);
  }, [open]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      trigger={!hideTrigger ? (
        <Button colorScheme="secondary">
          <UserRoundCog width={20} /> Gerenciar convidados
        </Button>
      ) : undefined} 
    >
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
        {error && <div className="text-zinc-400">{error}</div>}{" "}
      </Dialog.Content>
      <Dialog.Footer>
        <div className="flex flex-col gap-2">
          <Input
            ref={inputRef}
            Icon={AtSign}
            placeholder="Digite o e-mail do convidado"
            onKeyDown={handleKeyDown}
            cta={
              <Button onClick={handleInviteMembers} className="w-fit" size="sm">
                Adicionar <Plus width={20} />
              </Button>
            }
          />
          {!hideTrigger && guests.length > 0 && (
            <Button onClick={handleSubmit}>Submeter</Button>
          )}
        </div>
      </Dialog.Footer>
    </Dialog.Root>
  );
};
