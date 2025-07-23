import { CalendarValue } from "@/src/components/primitives/Calendar/Calendar";
import { countriesMock } from "@/src/components/primitives/Select/mock";
import { useState } from "react";

export const useTripProps = () => {
  const countries: string[] = countriesMock || [];
  const [inputValue, setInputValue] = useState<string>(""); 
  const [options, setOptions] = useState<string[]>([]);
  const handleInput = (currentInput: string) => {
    setInputValue(currentInput); 

    if (currentInput) {
      const filteredOptions = countries.filter((option) =>
        option.toLowerCase().includes(currentInput.toLowerCase())
      );
      setOptions(filteredOptions);
    } else {
      setOptions([]); 
    }
  };
  const [calendarValue, setCalendarValue] = useState<CalendarValue>([
    null,
    null,
  ]);

  const handleCalendarChange = (value: CalendarValue) => {
    setCalendarValue(value);
  };
  
  return {
    handleInput,
    options,
    handleCalendarChange,
    calendarValue,
    inputValue, 
  };
};