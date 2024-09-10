import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/primitives/Button/Button";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { Link2, Plus, Tag } from "lucide-react";
import {
  CreateAttachmentFormData,
  createAttachmentSchema,
} from "@/src/schemas/attachment/attachmentSchema";
import { useAttachment } from "@/src/hooks/useAttachment";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export interface CreateAttachmentProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const CreateAttachment = (props: CreateAttachmentProps) => {
  const { open, onOpenChange } = props;
  const { mutateAsync: createAttachment } = useAttachment.Create();
  const router = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAttachmentFormData>({
    resolver: zodResolver(createAttachmentSchema),
  });

  const handleCreateAttachment = async (data: CreateAttachmentFormData) => {
    const formData = [{ title: data.title, link: data.url }];
    const res = await createAttachment({
      formData,
      tripId: router.id as string,
    });
    if (res) {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    reset();
  }, [open]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        <Button colorScheme="secondary">
          <Plus width={20} /> Cadastrar novo link
        </Button>
      }
    >
      <Dialog.Header
        title="Cadastrar link"
        subtitle="Todos convidados podem visualizar os links importantes."
      />
      <form onSubmit={handleSubmit(handleCreateAttachment)}>
        <Dialog.Content>
          <div>
            <Input
              Icon={Tag}
              placeholder="Título do link"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-zinc-400">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Input Icon={Link2} placeholder="URL" {...register("url")} />
            {errors.url && (
              <p className="text-zinc-400">{errors.url.message}</p>
            )}
          </div>
        </Dialog.Content>
        <Dialog.Footer>
          <Button type="submit">Salvar link</Button>
        </Dialog.Footer>
      </form>
    </Dialog.Root>
  );
};
