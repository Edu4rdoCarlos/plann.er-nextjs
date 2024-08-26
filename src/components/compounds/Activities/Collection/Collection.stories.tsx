
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CollectionProps, Collection } from './Collection';

export default {
  title: 'Components/Activities',
  parameters: {
    layout: 'centered'
  },
  args: {
    date: '2024-08-26T14:00:00.123Z',
    label: 'Corrida de Kart',
  }
} as Meta;

const Template: StoryFn<CollectionProps> = (args) => <Collection className='w-[600px]' {...args} />;

export const Default = Template.bind({});
Default.args = {};



