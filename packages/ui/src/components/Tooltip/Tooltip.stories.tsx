import type { Meta, StoryObj } from '@storybook/react';
import Tooltip, { type TooltipProps } from './Tooltip';

const Main: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    children: 'This is a tooltip.',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

type story = StoryObj<TooltipProps>;

export const Default: story = {
  render(args) {
    return (
      <div
        style={{
          backgroundColor: 'black',
          height: '100vh',
          width: '100vw',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Tooltip {...args} />
      </div>
    );
  },
};

export const Visible: story = {
  render(args) {
    return (
      <div
        style={{
          backgroundColor: 'black',
          height: '100vh',
          width: '100vw',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Tooltip {...args} />
      </div>
    );
  },
  args: {
    visible: true,
  },
};
