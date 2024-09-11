import { useState } from "react";
import { Toast, ToastProps } from "../../primitives/Toast/Toast";

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
