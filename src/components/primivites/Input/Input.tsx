import { VariantProps } from "tailwind-variants";
import { ComponentType, InputHTMLAttributes } from "react";
import { inputVariants, sInputWrapper, sInput } from "./Input.variants";
import { LucideProps } from "lucide-react";

export interface InputProps
  extends VariantProps<typeof inputVariants>,
    InputHTMLAttributes<HTMLInputElement> {
  Icon: ComponentType<LucideProps>;
}

export const Input = (props: InputProps) => {
  const { Icon, className, ...rest } = props;

  return (
    <div className={sInputWrapper()}>
      <Icon strokeWidth={1.7} width={20} />
      <input className={sInput()} {...rest} />
    </div>
  );
};
