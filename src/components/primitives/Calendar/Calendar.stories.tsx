import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar, CalendarValue } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Primitives/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleDate: Story = {
  args: {
    selectRange: false,
  },
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>(new Date());

    const handleChange = (newValue: CalendarValue) => {
      setValue(newValue);
      args.onChange?.(newValue as any);
    };

    return <Calendar {...args} value={value} onChange={handleChange} />;
  },
};

export const DateRange: Story = {
  args: {
    selectRange: true,
  },
  render: (args) => {
    const [value, setValue] = useState<CalendarValue>([
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 7)),
    ]);

    const handleChange = (newValue: CalendarValue) => {
      setValue(newValue);
      args.onChange?.(newValue as any);
    };

    return <Calendar {...args} value={value} onChange={handleChange} />;
  },
};

export const Disabled: Story = {
  args: {
    value: new Date(),
    disabled: true,
  },
};