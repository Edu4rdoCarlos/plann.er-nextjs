import React, { useEffect, useRef } from "react";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { AtSign, Plus, UserRoundCog } from "lucide-react";
import { Guest } from "../../Guest/Guest";
import { sBar, sEmpty, sGuest } from "./InviteMember.variants";
import { Button } from "@/src/components/primitives/Button/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  InviteMembersFormData,
  InviteMembersSchema,
} from "@/src/schemas/members/membersSchema";
import { useMember } from "@/src/hooks/useMember";
import { useParams } from "next/navigation";
import { useToast } from "@/src/providers/ToastProvider";

export interface InviteMembersProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onGuestsChange: (guest: string[]) => void;
  guests: string[];
}

export const InviteMembers = (props: InviteMembersProps) => {
  const { open, onOpenChange, onGuestsChange, guests } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { showToast } = useToast();
  const router = useParams();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InviteMembersFormData>({
    resolver: zodResolver(InviteMembersSchema),
    mode: "onBlur",
  });

  const { mutateAsync: inviteMember } = useMember.Create();

  const handleInviteMembers = () => {
    const input = inputRef.current?.value.trim();
    if (input) {
      const data = { email: input };
      try {
        InviteMembersSchema.parse(data);
        const newGuests = [...guests, input];
        onGuestsChange(newGuests);
        setValue("email", "");
      } catch (e) {
        if (e instanceof z.ZodError) {
          showToast(e.errors[0]?.message || "Erro de validação.", "error");
        } else {
          console.error(e);
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

  const onSubmit = async () => {
    const res = await inviteMember({
      formData: guests.map((email) => ({ email })),
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
    reset();
    onGuestsChange([]);
  }, [open, reset, onGuestsChange]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        <Button colorScheme="secondary">
          <UserRoundCog width={20} /> Gerenciar convidados
        </Button>
      }
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
      </Dialog.Content>
      <Dialog.Footer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                ref={(e) => {
                  inputRef.current = e;
                  field.ref(e);
                }}
                Icon={AtSign}
                placeholder="Digite o e-mail do convidado"
                onKeyDown={handleKeyDown}
                cta={
                  <Button
                    onClick={handleInviteMembers}
                    className="w-fit"
                    size="sm"
                  >
                    Adicionar <Plus width={20} />
                  </Button>
                }
                error={errors.email?.message}
              />
            )}
          />
          {guests.length > 0 && <Button type="submit">Submeter</Button>}
        </form>
      </Dialog.Footer>
    </Dialog.Root>
  );
};
