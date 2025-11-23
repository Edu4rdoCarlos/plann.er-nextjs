import { LucideProps } from "lucide-react";
import React, { ComponentType, forwardRef, InputHTMLAttributes } from "react";
import { VariantProps } from "tailwind-variants";
import { ButtonProps } from "../Button/Button";
import { inputVariants, sInput, sInputWrapper } from "./Input.variants";

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
    <div className="flex flex-col gap-2 w-full">
      <div className={sInputWrapper({ className })}>
        <div className="flex gap-2 w-full items-center">
          <div className="min-w-5">
            <Icon strokeWidth={1.7} width={20} />
          </div>
          <input ref={ref} className={`${sInput()} w-full bg-transparent outline-none`} type={type} {...rest} />
        </div>
        {cta}
      </div>
      {error && <div className="text-zinc-400 text-xs">{error}</div>}
    </div>
  );
});

Input.displayName = "Input";
