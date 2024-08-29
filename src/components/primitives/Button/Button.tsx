import { VariantProps } from "tailwind-variants";
import { buttonVariants, sButton } from "./Button.variants";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = VariantProps<typeof buttonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  const {
    colorScheme = "primary",
    size = "md",
    children,
    variants = "default",
    className,
    ...rest
  } = props;
  return (
    <button
      className={sButton({ colorScheme, size, className, variants })}
      {...rest}
    >
      {children}
    </button>
  );
};
