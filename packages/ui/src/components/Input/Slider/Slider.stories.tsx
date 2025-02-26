import type { Meta, StoryObj } from '@storybook/react';
import Slider, { type SliderProps } from './Slider';

const componentMeta: Meta<SliderProps> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

export default componentMeta;

type story = StoryObj<SliderProps>;

export const DarkSlider: story = {
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
        <div style={{ maxWidth: 500, width: '100%' }}>
          <Slider {...args} />
        </div>
      </div>
    );
  },
  args: {
    defaultValue: [50],
    theme: 'dark',
  },
};

export const LightSlider: story = {
  render(args) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100vh',
          width: '100vw',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <div style={{ maxWidth: 500, width: '100%' }}>
          <Slider {...args} />
        </div>
      </div>
    );
  },
  args: {
    defaultValue: [50],
    theme: 'light',
  },
};
