"use client";

import { Button } from "@/src/components/primitives/Button/Button";
import {
  Calendar,
  CalendarValue,
} from "@/src/components/primitives/Calendar/Calendar";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { Input } from "@/src/components/primitives/Input/Input";
import { useActivity } from "@/src/hooks/useActivity";
import { formatDateTime } from "@/src/lib/utils/date";
import { useToast } from "@/src/providers/ToastProvider";
import {
  CreateActivityFormData,
  createActivitySchema,
} from "@/src/schemas/activity/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock4, Plus, Tag } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sTimeWrapper } from "./CreateActivity.variants";
import { useTranslations } from "next-intl";

export interface CreateActivityProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const CreateActivity = (props: CreateActivityProps) => {
  const { open, onOpenChange } = props;
  const router = useParams();
  const t = useTranslations("modals");

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
      showToast(t("operationSuccess"), "success");
      return;
    }
    showToast(t("operationError"), "error");
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
          <Plus width={20} /> {t("registerActivities")}
        </Button>
      }
    >
      <Dialog.Header
        title={t("registerActivity")}
        subtitle={t("registerActivitySubtitle")}
      />
      <Dialog.Content>
        <form onSubmit={handleSubmit(handleCreateActivity)}>
          <Input
            Icon={Tag}
            placeholder={t("whatActivity")}
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
              placeholder={t("time")}
              {...register("activityTime")}
              error={errors.activityTime?.message}
            />
          </div>
          <Dialog.Footer>
            <Button type="submit">{t("register")}</Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
