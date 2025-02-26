import AlienLoading, { type AlienLoadingProps } from './AlienLoading';
import type { Meta, StoryObj } from '@storybook/react';

const componentMeta: Meta<AlienLoadingProps> = {
  title: 'Components/Icons/AlienLoading',
  component: AlienLoading,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  render: (args) => {
    return (
      <div
        style={{
          padding: 48,
        }}
      >
        <AlienLoading {...args} />
      </div>
    );
  },
};

export default componentMeta;

type Story = StoryObj<AlienLoadingProps>;

export const Default: Story = {};
