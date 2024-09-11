import { Button } from "@/src/components/primitives/Button/Button";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { useMember } from "@/src/hooks/useMember";
import { useToast } from "@/src/providers/ToastProvider";
import {
  ConfirmTripFormData,
  confirmTripSchema,
} from "@/src/schemas/trip/confirmTripSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export interface ConfirmTripProps {
  date: string;
  location: string;
  open: boolean;
  tripId: string;
  email: string;
  onOpenChange: (value: boolean) => void;
}

export const ConfirmTrip = (props: ConfirmTripProps) => {
  const { location, date, open, onOpenChange, tripId, email } = props;
  const { mutateAsync: confirmTrip } = useMember.ConfirmPresence();
  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmTripFormData>({
    resolver: zodResolver(confirmTripSchema),
    mode: "onBlur",
    defaultValues: { email },
  });

  const handleConfirmTrip = async (data: ConfirmTripFormData) => {
    const formData = { name: data.name };
    const res = await confirmTrip({ formData, email: data.email, tripId });
    if (res) {
      onOpenChange(false);
      router.push(`/trip/${tripId}`);
      return;
    }
    showToast("Operation Error!", "error");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} closable={false}>
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
            className="mb-1"
          />
          <Input
            Icon={Mail}
            type="email"
            placeholder="Seu e-mail"
            {...register("email")}
            error={errors.email?.message}
            disabled
          />
          <Dialog.Footer>
            <Button type="submit">Confirmar minha presença</Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
