import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Toast, ToastProps } from "./Toast";
import { Button } from "../Button/Button";

export default {
  title: "Primitives/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  args: {},
} as Meta;

const Template: StoryFn<ToastProps> = (args) => {
  const [isToastOpen, setToastOpen] = React.useState(args.isOpen);

  const handleShowToast = () => {
    setToastOpen(true);
  };

  return (
    <div style={{ width: 500 }}>
      <Button onClick={handleShowToast}>Show Toast</Button>
      <Toast
        {...args}
        isOpen={isToastOpen}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  message: "Operation Successful!",
  type: "success",
  isOpen: false,
  duration: 3000,
};

export const Error = Template.bind({});
Error.args = {
  message: "Operation Error!",
  type: "error",
  isOpen: false,
  duration: 3000,
};
