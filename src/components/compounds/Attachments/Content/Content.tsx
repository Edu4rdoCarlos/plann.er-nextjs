import { Button } from "@/src/components/primitives/Button/Button";
import { trimWithEllipsis } from "@/src/lib/utils/text";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { sContent, sInfo, sLabel, sWrapper } from "./Content.variants";

export interface ContentProps {
  label: string;
  info: string;
  widget: ReactNode;
  className?: string;
  trimLimit?: number;
  onRemove?: () => void;
}

export const Content = (props: ContentProps) => {
  const { label, info, widget, className, trimLimit = 35, onRemove } = props;
  return (
    <div className={sWrapper({ className })}>
      <div className={sContent()}>
        <div className={sLabel()}>
          {label}
          {onRemove && (
            <Button
              variants="ghost"
              size="sm"
              className="w-fit group-hover:opacity-100 opacity-0"
              colorScheme="secondary"
              onClick={onRemove}
            >
              <X />
            </Button>
          )}
        </div>
        <div className={sInfo()}>{trimWithEllipsis(info, trimLimit)}</div>
      </div>
      {widget}
    </div>
  );
};
