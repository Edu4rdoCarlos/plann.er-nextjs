import React, { forwardRef } from "react";
import { VariantProps } from "tailwind-variants";
import { ComponentType, InputHTMLAttributes } from "react";
import { inputVariants, sInputWrapper, sInput } from "./Input.variants";
import { LucideProps } from "lucide-react";
import { ButtonProps } from "../Button/Button";

export interface InputProps
  extends VariantProps<typeof inputVariants>,
    InputHTMLAttributes<HTMLInputElement> {
  Icon: ComponentType<LucideProps>;
  Button?: React.ReactElement<ButtonProps>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { Icon, className, Button, type = "text", ...rest } = props;

  return (
    <div className={sInputWrapper({ className })}>
      <div className="min-w-5">
        <Icon strokeWidth={1.7} width={20} />
      </div>
      <input ref={ref} className={sInput()} type={type} {...rest} />
      {Button}
    </div>
  );
});
