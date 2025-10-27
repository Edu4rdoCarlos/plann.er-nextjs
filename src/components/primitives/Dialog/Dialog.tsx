import { X } from "lucide-react";
import { HtmlHTMLAttributes, PropsWithChildren, ReactNode, useEffect } from "react";
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
import { useFocusTrap } from "@/src/hooks/useFocusTrap";

export interface DialogProps extends HtmlHTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  trigger?: ReactNode;
  closable?: boolean;
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

const Dialog = ({
  open,
  children,
  onOpenChange,
  trigger,
  closable = true,
}: DialogProps) => {
  const focusTrapRef = useFocusTrap(open);

  // Fechar modal com tecla Escape
  useEffect(() => {
    if (!open || !closable) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, closable, onOpenChange]);

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {trigger && (
        <div
          onClick={() => onOpenChange(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenChange(true);
            }
          }}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
        >
          {trigger}
        </div>
      )}
      {open && (
        <div
          className={sWrapper()}
          onClick={() => closable && onOpenChange(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={focusTrapRef}
            className={sContainer()}
            onClick={(e) => e.stopPropagation()}
          >
            {closable && (
              <button
                className={sCloseButton()}
                onClick={() => onOpenChange(false)}
                aria-label="Fechar modal"
              >
                <X strokeWidth={1} width={22} />
              </button>
            )}
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
