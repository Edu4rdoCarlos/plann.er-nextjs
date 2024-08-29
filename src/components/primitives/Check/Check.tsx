import { VariantProps } from "tailwind-variants";
import { checkVariants, sIcon } from "./Check.variants";
import { CircleCheck, CircleDashed, LucideProps } from "lucide-react";

export interface CheckProps
  extends VariantProps<typeof checkVariants>,
    LucideProps {
  className?: string;
}

export const Check = (props: CheckProps) => {
  const { checked, className, ...rest } = props;

  const Icon = checked ? CircleCheck : CircleDashed;
  return <Icon size={20} className={sIcon({ className, checked })} {...rest} />;
};
