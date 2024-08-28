import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ArrowRight, AtSign } from "lucide-react";
import { SelectWithSearch, SelectWithSearchProps } from "./SelectWithSearch";
import { countries } from "./mock";
import { Button } from "../Button/Button";
import { Calendar } from "../Calendar/Calendar";

export default {
  title: "Primitives/SelectWithSearch",
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Placeholder",
    Icon: AtSign,
    type: "email",
  },
} as Meta;

const Template: StoryFn<SelectWithSearchProps> = (args) => {
  const [options, setOptions] = useState<string[] | undefined>(undefined);

  const handleInput = (inputValue: string) => {
    const filteredOptions = countries.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  const button = (
    <Button size="sm" className="w-fit">
      Continuar <ArrowRight width={20} />
    </Button>
  );

  const calendar = <Calendar />;

  return (
    <div style={{ width: 800 }}>
      <SelectWithSearch
        onInputValue={handleInput}
        options={options}
        calendar={calendar}
        cta={button}
      />
    </div>
  );
};

export const Default = Template.bind({});
