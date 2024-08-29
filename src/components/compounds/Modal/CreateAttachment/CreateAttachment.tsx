import { Button } from "@/src/components/primitives/Button/Button";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { Link2, Plus, Tag } from "lucide-react";

export interface CreateAttachmentProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}
export const CreateAttachment = (props: CreateAttachmentProps) => {
  const { open, onOpenChange } = props;

  const handleCreateAttachment = () => {
    onOpenChange(false);
  };
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
      <Dialog.Content>
        <Input Icon={Tag} placeholder="Título do link" />
        <Input Icon={Link2} placeholder="URL" />
      </Dialog.Content>
      <Dialog.Footer>
        <Button onClick={handleCreateAttachment}>Salvar link</Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
};
