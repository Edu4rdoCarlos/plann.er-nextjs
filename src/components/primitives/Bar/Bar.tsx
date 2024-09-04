import { VariantProps } from "tailwind-variants";
import { buttonVariants, sBar } from "./Bar.variants";
import { HtmlHTMLAttributes } from "react";

export type BarProps = VariantProps<typeof buttonVariants> &
HtmlHTMLAttributes<HTMLDivElement>;

export const Bar = (props: BarProps) => {
  const {
    className,
    ...rest
  } = props;
  return (
    <div
      className={sBar()}
      {...rest}
    />
  );
};
