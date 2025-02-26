import type { Meta, StoryObj } from '@storybook/react';
import TextCallout, { type TextCalloutProps } from '../TextCallout';

const componentMeta: Meta<TextCalloutProps> = {
  title: 'Layout/TextCallout',
  component: TextCallout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<TextCalloutProps>;

export const Default: Story = {
  args: {
    copy: `hey did you uhh know that um, this text stands out? it's supposed to catch your eye, idk i'm just a prompt ♡⸜(˶˃ ᵕ ˂˶)⸝♡`,
    backgroundColor: 'citron',
    spacingTop: 'continuous',
    spacingBottom: 'continuous',
  },
};
