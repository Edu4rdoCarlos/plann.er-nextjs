import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { sButton, sIcon, sWrapper, toastVariants } from "./Toast.variants";
import { VariantProps } from "tailwind-variants";
import { Button } from "../Button/Button";

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string;
  isOpen: boolean;
  duration?: number;
  onClose: () => void;
}

export const Toast = ({
  message,
  type,
  isOpen,
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className={sWrapper({ type })}>
      {type === "success" ? (
        <CheckCircle className={sIcon()} />
      ) : (
        <XCircle className={sIcon()} />
      )}
      <span>{message}</span>
      <Button onClick={onClose} variants="ghost" className={sButton({ type })}>
        &times;
      </Button>
    </div>
  );
};
