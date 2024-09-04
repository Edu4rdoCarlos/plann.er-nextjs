import { useState } from "react";
import {
  Calendar as ReactCalendar,
  CalendarProps as ReactCalendarProps,
} from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { cn } from "@/src/utils/twMerge";
import {
  calendarVariants,
  sCalendar,
  sCalendarWrapper,
  sWrapper,
} from "./Calendar.variants";
import { Button } from "../Button/Button";
import { Calendar as CalendarIcon } from "lucide-react";
import { getDate, getRangeDate } from "@/src/utils/date";
import { VariantProps } from "tailwind-variants";

type ValuePiece = Date | null;
export type CalendarValue = ValuePiece | [ValuePiece, ValuePiece];

export type CalendarProps = ReactCalendarProps &
  VariantProps<typeof calendarVariants>;

const formatDate = (value: any) => {
  if (Array.isArray(value)) {
    return getRangeDate({
      startDate: new Date(value[0] || ""),
      endDate: new Date(value[1] || ""),
    });
  }


  
  return getDate({date: value});
};

export const Calendar = (props: CalendarProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { className, value, as, ...rest } = props;

  const date = formatDate(value);

  return (
    <div className={sWrapper({ as })}>
      <Button
        colorScheme="secondary"
        variants="ghost"
        className="font-normal"
        onClick={() => setShowCalendar((prev) => !prev)}
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
