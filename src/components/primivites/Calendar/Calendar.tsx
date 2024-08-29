import { SyntheticEvent, useEffect, useState } from "react";
import {
  Calendar as ReactCalendar,
  CalendarProps as ReactCalendarProps,
} from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { cn } from "@/src/utils/twMerge";
import { sCalendar, sCalendarWrapper, sWrapper } from "./Calendar.variants";
import { Button } from "../Button/Button";
import { Calendar as CalendarIcon } from "lucide-react";
import { getRangeDate } from "@/src/utils/date";

type ValuePiece = Date | null;
export type CalendarValue = ValuePiece | [ValuePiece, ValuePiece];

export interface CalendarProps extends ReactCalendarProps {}

export const Calendar = (props: CalendarProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { className, value, ...rest } = props;

  const date = Array.isArray(value)
    ? getRangeDate({
        startDate: new Date(value[0] || ""),
        endDate: new Date(value[1] || ""),
      })
    : undefined;

  return (
    <div className={sWrapper()}>
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
