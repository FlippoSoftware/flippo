import type { Meta, StoryObj } from '@storybook/react';

import Header from '../view/Header';

const meta: Meta = {
  component: Header,
  title: 'Modules/Header'
};

export default meta;

type HeaderStory = StoryObj<typeof Header>;

export const Default: HeaderStory = {};
