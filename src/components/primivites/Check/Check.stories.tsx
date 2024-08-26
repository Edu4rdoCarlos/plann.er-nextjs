
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ArrowRight } from 'lucide-react';
import { Check, CheckProps } from './Check';

export default {
  title: 'Primitives/Check',
  parameters: {
    layout: 'centered'
  },
} as Meta;

const Template: StoryFn<CheckProps> = (args) => <Check {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Checked = Template.bind({});
Checked.args = {
  checked: true
};



