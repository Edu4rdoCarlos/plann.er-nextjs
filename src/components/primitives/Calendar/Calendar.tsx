import { getDate, getRangeDate } from "@/src/utils/date";
import { cn } from "@/src/utils/twMerge";
import { Calendar as CalendarIcon } from "lucide-react";
import { ButtonHTMLAttributes, useState } from "react";
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
  if (Array.isArray(value)) {
    return getRangeDate({
      startDate: new Date(value[0] || ""),
      endDate: new Date(value[1] || ""),
    });
  }

  return getDate({ date: value });
};

export const Calendar = (props: CalendarProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { className, value, as, disabled, ...rest } = props;

  const date = formatDate(value);

  return (
    <div className={sWrapper({ as })}>
      <Button
        colorScheme="secondary"
        variants="ghost"
        className="font-normal text-sm md:text-lg"
        onClick={() => setShowCalendar((prev) => !prev)}
        disabled={disabled}
        type="button"
      >
        <CalendarIcon width={20} />
        {date || <>Quando?</>}
      </Button>
      {showCalendar && (
        <div
          className={sCalendarWrapper()}
          onBlur={() => setShowCalendar(false)}
        >
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
