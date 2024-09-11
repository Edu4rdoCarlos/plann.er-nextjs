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
  cta?: React.ReactElement<ButtonProps>;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { Icon, className, cta, type = "text", error, ...rest } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className={sInputWrapper({ className })}>
        <div className="min-w-5">
          <Icon strokeWidth={1.7} width={20} />
        </div>
        <input ref={ref} className={sInput()} type={type} {...rest} />
        {cta}
      </div>
      {error && <div className="text-zinc-400 text-xs">{error}</div>}
    </div>
  );
});
