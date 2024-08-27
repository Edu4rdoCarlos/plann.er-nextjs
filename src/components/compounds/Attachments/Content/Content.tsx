import { ReactNode } from "react";
import { sContent, sInfo, sLabel, sWrapper } from "./Content.variants";
import { trimWithEllipsis } from "@/src/utils/text";

export interface ContentProps {
  label: string;
  info: string;
  widget: ReactNode;
  className?: string;
  trimLimit?: number;
}

export const Content = (props: ContentProps) => {
  const { label, info, widget, className, trimLimit = 35 } = props;
  return (
    <div className={sWrapper({ className })}>
      <div className={sContent()}>
        <div className={sLabel()}>{label}</div>
        <div className={sInfo()}>{trimWithEllipsis(info, trimLimit)}</div>
      </div>
      {widget}
    </div>
  );
};
