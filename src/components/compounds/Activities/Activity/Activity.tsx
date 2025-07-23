import { Check } from "@/src/components/primitives/Check/Check";
import { getHour } from "@/src/lib/utils/date";
import { VariantProps } from "tailwind-variants";
import {
    activityVariants,
    sActivity,
    sHour,
    sLabel,
    sLabelWrapper,
} from "./Activity.variants";

export interface ActivityProps extends VariantProps<typeof activityVariants> {
  className?: string;
  date: Date;
  label: string;
  checked: boolean;
}

export const Activity = (props: ActivityProps) => {
  const { checked, className, date, label } = props;
  const time = getHour({ date });

  return (
    <div className={sActivity({ className, checked })}>
      <div className={sLabelWrapper()}>
        <Check checked={checked} />
        <p className={sLabel()}>{label}</p>
      </div>
      <div className={sHour()}>{time}</div>
    </div>
  );
};
