"use client";

import { Button } from "@/src/components/primitives/Button/Button";
import { Calendar } from "@/src/components/primitives/Calendar/Calendar";
import { SelectWithSearch } from "@/src/components/primitives/Select/SelectWithSearch";
import { useTripProps } from "@/src/hooks/trip/useTripProps";
import { ArrowRight, Settings2 } from "lucide-react";
import { useState } from "react";

interface SelectLayoutProps {
  onContinueEdit: () => void;
}

export const SelectLayout = (props: SelectLayoutProps) => {
  const { onContinueEdit } = props;
  const {
    handleCalendarChange,
    calendarValue,
    handleInput,
    options,
    inputValue,
  } = useTripProps();
  const filled = Boolean(inputValue && calendarValue);
  const [inputDisabled, setInputDisabled] = useState(filled);

  const handleButton = () => {
    if (inputDisabled) {
      setInputDisabled(false);
    } else {
      onContinueEdit();
    }
  };

  const button = (
    <Button
      size="sm"
      colorScheme={inputDisabled ? "secondary" : "primary"}
      className="w-fit"
      onClick={handleButton}
    >
      {inputDisabled ? (
        <>
          Alterar local/data <Settings2 width={20} />
        </>
      ) : (
        <>
          Continuar <ArrowRight width={20} />
        </>
      )}
    </Button>
  );

  const calendar = (
    <Calendar
      onChange={handleCalendarChange}
      value={calendarValue}
      selectRange
      disabled={filled}
    />
  );
  return (
    <SelectWithSearch
      onInputValue={handleInput}
      options={options}
      calendar={calendar}
      cta={button}
      defaultValue={inputValue}
      disabled={filled}
    />
  );
};
