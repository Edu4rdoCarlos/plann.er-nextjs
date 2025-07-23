import { Toast, ToastProps } from "@/src/components/primitives/Toast/Toast";
import { useState } from "react";

interface ToastLayoutProps {
  success: boolean;
}
export const Toastlayout = ({ success }: ToastLayoutProps) => {
  const [isToastOpen, setToastOpen] = useState(false);

  const args: Pick<ToastProps, "type" | "message"> = success
    ? {
        message: "Operation Successful!",
        type: "success",
      }
    : {
        message: "Operation Error!",
        type: "error",
      };

  return (
    <div style={{ width: 500 }}>
      <Toast
        {...args}
        duration={3000}
        isOpen={isToastOpen}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
};
