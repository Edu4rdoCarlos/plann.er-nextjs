import { X } from "lucide-react";
import { HtmlHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import {
  sWrapper,
  sContainer,
  sCloseButton,
  sContentWrapper,
  sHeader,
  sTitle,
  sContent,
  sFooter,
  sSubtitle,
} from "./Dialog.variants";

export interface DialogProps extends HtmlHTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  trigger?: ReactNode;
}

interface HeaderProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  className?: string;
}

const Header = ({ title, className, subtitle }: HeaderProps) => {
  return (
    <div className={sHeader({ className })}>
      <h2 className={sTitle()}>{title}</h2>
      <p className={sSubtitle()}>{subtitle}</p>
    </div>
  );
};

const Content = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={sContent({ className })}>{children}</div>;
};
const Footer = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={sFooter({ className })}>{children}</div>;
};

const Dialog = ({ open, children, onOpenChange, trigger }: DialogProps) => {
  return (
    <>
      {trigger && (
        <div onClick={() => onOpenChange(true)} className="cursor-pointer">
          {trigger}
        </div>
      )}
      {open && (
        <div className={sWrapper()}>
          <div className={sContainer()}>
            <button
              className={sCloseButton()}
              onClick={() => onOpenChange(false)}
            >
              <X strokeWidth={1} width={22} />
            </button>
            <div className={sContentWrapper()}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

Dialog.Root = Dialog;
Dialog.Header = Header;
Dialog.Content = Content;
Dialog.Footer = Footer;

export { Dialog };
