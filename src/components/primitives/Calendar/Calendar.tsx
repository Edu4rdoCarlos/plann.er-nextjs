import { getDate, getRangeDate } from "@/src/lib/utils/date";
import { cn } from "@/src/lib/utils/twMerge";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import {
  Calendar as ReactCalendar,
  CalendarProps as ReactCalendarProps,
} from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { VariantProps } from "tailwind-variants";
import { Button } from "../Button/Button";
import {
  calendarVariants,
  sCalendar,
  sCalendarWrapper,
  sWrapper,
} from "./Calendar.variants";

type ValuePiece = Date | null;
export type CalendarValue = ValuePiece | [ValuePiece, ValuePiece];

export type CalendarProps = ReactCalendarProps &
  VariantProps<typeof calendarVariants> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">;

const formatDate = (value: any) => {
  if (Array.isArray(value) && value[0] && value[1]) {
    return getRangeDate({
      startDate: new Date(value[0]),
      endDate: new Date(value[1]),
    });
  }

  if (value instanceof Date) {
    return getDate({ date: value });
  }
  return "";
};

export const Calendar = (props: CalendarProps) => {
  const t = useTranslations("newTrip");
  const [showCalendar, setShowCalendar] = useState(false);
  const { className, value, as, disabled, ...rest } = props;
  const calendarRef = useRef<HTMLDivElement>(null);

  const date = formatDate(value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className={sWrapper({ as })} ref={calendarRef}>
      <Button
        colorScheme="secondary"
        variants="ghost"
        className="font-normal text-sm md:text-lg"
        onClick={() => setShowCalendar((prev) => !prev)}
        disabled={disabled}
        type="button"
      >
        <CalendarIcon width={20} />
        {date || <>{t("date")}</>}
      </Button>
      {showCalendar && (
        <div className={sCalendarWrapper()}>
          <ReactCalendar
            className={cn(sCalendar({ className }))}
            value={value}
            {...rest}
          />
        </div>
      )}
    </div>
  );
};

Calendar.displayName = "Calendar";