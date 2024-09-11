import { Button } from "@/src/components/primitives/Button/Button";
import {
  Calendar,
  CalendarValue,
} from "@/src/components/primitives/Calendar/Calendar";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { Clock4, Plus, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { sTimeWrapper } from "./CreateActivity.variants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formatDateTime } from "@/src/utils/date";
import {
  CreateActivityFormData,
  createActivitySchema,
} from "@/src/schemas/activity/activitySchema";
import { useActivity } from "@/src/hooks/useActivity";
import { useParams } from "next/navigation";
import { useToast } from "@/src/providers/ToastProvider";

export interface CreateActivityProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const CreateActivity = (props: CreateActivityProps) => {
  const { open, onOpenChange } = props;
  const router = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateActivityFormData>({
    resolver: zodResolver(createActivitySchema),
  });

  const { mutateAsync: createActivity } = useActivity.Create();
  const [calendarValue, setCalendarValue] = useState<CalendarValue>(new Date());
  const { showToast } = useToast();

  const handleCalendarChange = (value: CalendarValue) => {
    setCalendarValue(value);
    setValue("activityDate", value as Date);
  };

  const handleCreateActivity = async (data: CreateActivityFormData) => {
    const formattedDateTime = formatDateTime(
      data.activityDate,
      data.activityTime
    );

    const formData = [
      {
        title: data.activityName,
        date: formattedDateTime,
      },
    ];

    const res = await createActivity({ formData, tripId: router.id as string });
    if (res) {
      onOpenChange(false);
      showToast("Operation Successful!", "success");
      return;
    }
    showToast("Operation Error!", "error");
  };

  useEffect(() => {
    reset();
    setCalendarValue(new Date());
  }, [open]);

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
        <form onSubmit={handleSubmit(handleCreateActivity)}>
          <Input
            Icon={Tag}
            placeholder="Qual atividade"
            {...register("activityName")}
            error={errors.activityName?.message}
          />
          <div className={sTimeWrapper()}>
            <Calendar
              onChange={handleCalendarChange}
              value={calendarValue}
              as="input"
            />
            <Input
              Icon={Clock4}
              placeholder="Horário"
              {...register("activityTime")}
              error={errors.activityTime?.message}
            />
          </div>
          <Dialog.Footer>
            <Button type="submit">Cadastrar</Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
