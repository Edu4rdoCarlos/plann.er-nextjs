
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from './Button';
import { ArrowRight } from 'lucide-react';

export default {
  title: 'Primitives/Button',
  parameters: {
    layout: 'centered'
  },
  args: {
    size: 'md',
    colorScheme: 'primary',
    children: <>Label <ArrowRight /></>,
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};


export const Secondary = Template.bind({});
Secondary.args = {
  colorScheme: 'secondary'
};

export const disabled = Template.bind({});
disabled.args = {
  disabled: true
};

