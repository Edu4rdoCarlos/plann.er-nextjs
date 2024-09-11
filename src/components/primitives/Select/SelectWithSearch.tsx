import { cn } from "@/src/utils/twMerge";
import { MapPin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ButtonProps } from "../Button/Button";
import { CalendarProps } from "../Calendar/Calendar";
import { Input } from "../Input/Input";
import {
  sBar,
  sDropdown,
  sItems,
  sNotFound,
  sSearch,
  sWrapper,
} from "./SelectWithSearch.variants";

export interface SelectWithSearchProps {
  options?: string[];
  onInputValue: (option: string) => void;
  cta?: React.ReactElement<ButtonProps>;
  calendar?: React.ReactElement<CalendarProps>;
  defaultValue?: string;
  disabled?: boolean;
  newStyle?: string;
}

export const SelectWithSearch = ({
  options,
  onInputValue,
  cta,
  calendar,
  defaultValue,
  disabled,
  newStyle
}: SelectWithSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const isInputFocused = () => {
    return document.activeElement === inputRef.current;
  };

  useEffect(() => {
    if (inputValue.length && isInputFocused()) {
      const handler = setTimeout(() => {
        onInputValue(inputValue);
      }, 300);
      return () => clearTimeout(handler);
    }
  }, [inputValue]);

  useEffect(() => {
    if (!options) return;

    setFilteredOptions(options);
    setShowDropdown(true);
  }, [options]);

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
  };

  const handleInputBlur = () => {
    const handler = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
    return () => clearTimeout(handler);
  };

  return (
    <div className={sWrapper()}>
      <Input
        ref={inputRef}
        Icon={MapPin}
        value={inputValue || defaultValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Para aonde você vai?"
        onFocus={() => inputValue && setShowDropdown(true)}
        onBlur={handleInputBlur}
        className={sSearch()}
        disabled={disabled}
        cta={
          <div className="flex justify-between md:justify-normal items-center gap-3">
            {calendar}
            <div className={sBar()} />
            {cta}
          </div>
        }
      />
      {showDropdown && (
        <ul className={`${sDropdown()} ${newStyle}`}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{ cursor: "pointer" }}
                className={sItems()}
              >
                {option}
              </li>
            ))
          ) : (
            <li className={cn(sItems(), sNotFound())}>
              Nenhum resultado encontrado
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
