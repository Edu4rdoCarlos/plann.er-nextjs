import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ArrowRight, Mail, User } from "lucide-react";
import { Dialog, DialogProps } from "./Dialog";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export default {
  title: "Primitives/Dialog",
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<DialogProps> = (args) => {
  const [open, setOpen] = useState(args.open);
  return (
    <Dialog.Root {...args} open={open} onOpenChange={setOpen}>
      <Dialog.Header
        title="Confirmar participação"
        subtitle={
          <>
            Você foi convidado(a) para participar de uma viagem para{" "}
            <span>Florianópolis, Brasil</span> nas datas de{" "}
            <span>16 a 27 de Agosto de 2024</span>.
          </>
        }
      />
      <Dialog.Content>
        <Input Icon={User} type="text" placeholder="Seu nome completo" />
        <Input Icon={Mail} type="email" placeholder="Seu e-mail" />
      </Dialog.Content>
      <Dialog.Footer>
        <Button onClick={() => setOpen(false)}>Confirmar minha presença</Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: true,
};

export const WithTrigger = Template.bind({});
WithTrigger.args = {
  trigger: <Button>Open Dialog</Button>,
};
