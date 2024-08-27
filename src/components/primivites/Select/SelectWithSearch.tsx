import React, { useState, useEffect, useRef } from "react";
import { Input } from "../Input/Input";
import { MapPin } from "lucide-react";
import {
  sDropdown,
  sItems,
  sSearch,
  sWrapper,
} from "./SelectWithSearch.variants";

export interface SelectWithSearchProps {
  options?: string[];
  onInputValue: (option: string) => void;
}

export const SelectWithSearch = ({
  options,
  onInputValue,
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Para aonde você vai?"
        onFocus={() => inputValue && setShowDropdown(true)}
        onBlur={handleInputBlur}
        className={sSearch()}
      />
      {showDropdown && (
        <ul className={sDropdown()}>
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
            <li>Nenhum resultado encontrado</li>
          )}
        </ul>
      )}
    </div>
  );
};
