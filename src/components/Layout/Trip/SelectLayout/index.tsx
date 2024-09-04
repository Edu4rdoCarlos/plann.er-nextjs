'use client'

import { Button } from "@/src/components/primitives/Button/Button";
import { Calendar } from "@/src/components/primitives/Calendar/Calendar";
import { SelectWithSearch } from "@/src/components/primitives/Select/SelectWithSearch";
import { useTripProps } from "@/src/hooks/trip/useTripProps";
import { ArrowRight, Settings2 } from "lucide-react";

export const SelectLayout = () => {
  const { handleCalendarChange, calendarValue, handleInput, options, inputValue} = useTripProps()

  const button = (
    <Button size="sm" colorScheme="secondary" className="w-fit">
    {inputValue && calendarValue ? (
      <>
        Alterar local/data <Settings2 width={20} />
      </>
    ) : (
      <>Continuar <ArrowRight width={20} /></>
    )}
  </Button>
  );

  const calendar = (
    <Calendar
      onChange={handleCalendarChange}
      value={calendarValue}
      selectRange
    />
  );
  return (
    <SelectWithSearch
      onInputValue={handleInput}
      options={options}
      calendar={calendar}
      cta={button}
      defaultValue={inputValue}
    />
  )
}