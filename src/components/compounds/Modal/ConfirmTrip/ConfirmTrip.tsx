import { Button } from "@/src/components/primitives/Button/Button";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  confirmTripSchema,
  ConfirmTripFormData,
} from "@/src/schemas/trip/confirmTripSchema";

export interface ConfirmTripProps {
  date: string;
  location: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const ConfirmTrip = (props: ConfirmTripProps) => {
  const { location, date, open, onOpenChange } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmTripFormData>({
    resolver: zodResolver(confirmTripSchema),
    mode: "onBlur",
  });

  const handleConfirmTrip = async (data: ConfirmTripFormData) => {
    console.log(data);

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
        <form onSubmit={handleSubmit(handleConfirmTrip)}>
          <Input
            Icon={User}
            placeholder="Seu nome completo"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            Icon={Mail}
            type="email"
            placeholder="Seu e-mail"
            {...register("email")}
            error={errors.email?.message}
          />
          <Dialog.Footer>
            <Button type="submit">Confirmar minha presença</Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
