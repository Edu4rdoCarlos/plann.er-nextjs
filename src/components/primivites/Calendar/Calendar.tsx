import { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import style from "./Calendar.module.css";
import { cn } from "@/src/utils/twMerge";
import { sCalendar } from "./Calendar.variants";

export interface CalendarProps {}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendar = (props: CalendarProps) => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <ReactCalendar
        selectRange
        onChange={onChange}
        value={value}
        className={cn(sCalendar())}
      />
    </div>
  );
};
