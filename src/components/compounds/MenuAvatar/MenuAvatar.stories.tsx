import type { Meta, StoryObj } from '@storybook/react';
import { MenuAvatar } from './MenuAvatar';

const meta = {
  title: 'Compounds/MenuAvatar',
  component: MenuAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof MenuAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'border border-gray-300 p-2',
  },
}; 