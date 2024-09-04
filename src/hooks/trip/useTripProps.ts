import { CalendarValue } from "@/src/components/primitives/Calendar/Calendar";
import { countriesMock } from "@/src/components/primitives/Select/mock";
import { useState } from "react";

export const useTripProps = () => {
  //request here
  const countries: string[] = countriesMock || [];
  const inputValue = countries[0];

  const currentDate = new Date();
  const previousMonthDate = new Date(currentDate);
  previousMonthDate.setMonth(currentDate.getMonth() - 1);

  const defaultCalendarValue: CalendarValue = [previousMonthDate, currentDate];

  const [options, setOptions] = useState<string[] | undefined>();
  const [calendarValue, setCalendarValue] = useState<CalendarValue>(new Date());

  const handleCalendarChange = (value: CalendarValue) => {
    setCalendarValue(value);
  };

  const handleInput = (inputValue: string) => {
    const filteredOptions = countries.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setOptions(filteredOptions);
  };
  return {
    handleInput,
    options,
    handleCalendarChange,
    calendarValue,
    inputValue,
    defaultCalendarValue,
  };
};
