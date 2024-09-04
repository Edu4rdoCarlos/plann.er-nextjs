import { Button } from "@/src/components/primitives/Button/Button";
import {
  Calendar,
  CalendarValue,
} from "@/src/components/primitives/Calendar/Calendar";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { Clock4, Plus, Tag, Timer } from "lucide-react";
import { useState } from "react";
import { sTimeWrapper } from "./CreateActivity.variants";

export interface CreateActivityProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}
export const CreateActivity = (props: CreateActivityProps) => {
  const { open, onOpenChange } = props;

  const handleCreateActivity = () => {
    onOpenChange(false);
  };

  const [calendarValue, setCalendarValue] = useState<CalendarValue>(new Date());

  const handleCalendarChange = (value: CalendarValue) => {
    setCalendarValue(value);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        <Button>
          <Plus width={20} /> Cadastrar atividades
        </Button>
      }
    >
      <Dialog.Header
        title="Cadastrar atividade"
        subtitle="Todos convidados podem visualizar as atividades."
      />
      <Dialog.Content>
        <Input Icon={Tag} placeholder="Qual atividade" />
        <div className={sTimeWrapper()}>
          <Calendar
            onChange={handleCalendarChange}
            value={calendarValue}
            as="input"
          />
          <Input Icon={Clock4} placeholder="Horário" />
        </div>
      </Dialog.Content>
      <Dialog.Footer>
        <Button onClick={handleCreateActivity}>Cadastrar</Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
};
