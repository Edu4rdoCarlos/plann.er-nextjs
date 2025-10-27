import { cn } from "@/src/lib/utils/twMerge";
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
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

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
    if (options) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowDropdown(filtered.length > 0);
      setSelectedIndex(-1); // Reset seleção ao filtrar
    }
  }, [inputValue, options]);

  // Scroll automático para item selecionado
  useEffect(() => {
    if (selectedIndex >= 0 && listItemsRef.current[selectedIndex]) {
      listItemsRef.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
    onInputValue(option);
  };

  const handleInputBlur = () => {
    const handler = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
    return () => clearTimeout(handler);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleOptionSelect(filteredOptions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className={sWrapper()}>
      <Input
        ref={inputRef}
        Icon={MapPin}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Para aonde você vai?"
        onFocus={() => inputValue && setShowDropdown(true)}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={sSearch()}
        disabled={disabled}
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls="select-dropdown"
        aria-activedescendant={
          selectedIndex >= 0 ? `option-${selectedIndex}` : undefined
        }
        cta={
          <div className="flex justify-between md:justify-normal items-center gap-3">
            {calendar}
            <div className={sBar()} />
            {cta}
          </div>
        }
      />
      {showDropdown && (
        <ul
          id="select-dropdown"
          role="listbox"
          className={`${sDropdown()} ${newStyle}`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                ref={(el) => {
                  listItemsRef.current[index] = el;
                }}
                id={`option-${index}`}
                role="option"
                aria-selected={selectedIndex === index}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => setSelectedIndex(index)}
                style={{ cursor: "pointer" }}
                className={cn(
                  sItems(),
                  selectedIndex === index && "bg-lime-500/20"
                )}
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
