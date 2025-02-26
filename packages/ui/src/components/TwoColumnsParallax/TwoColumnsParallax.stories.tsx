import type { Meta, StoryObj } from '@storybook/react';
import TwoColumnsParallax, {
  type TwoColumnsParallaxProps,
} from './TwoColumnsParallax';
import CurlElement from './CurlElement';
import { disablePropList } from '../../utils/storybook';

const items = [
  { left: 'Left Content 1', right: 'Right Content 1', id: '1' },
  { left: 'Left Content 2', right: 'Right Content 2', id: '2' },
  { left: 'Left Content 3', right: 'Right Content 3', id: '3' },
];

const Main: Meta<TwoColumnsParallaxProps> = {
  title: 'Components/TwoColumnsParallax',
  component: TwoColumnsParallax,
  args: {
    items,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

type story = StoryObj<TwoColumnsParallaxProps>;

const style = {
  padding: 'var(--space-xl)',
  background: 'var(--colors-cream)',
};

export const WithContent: story = {
  args: {
    items: items.map(({ left, right, id }) => {
      return {
        id,
        left: (
          <div
            style={{
              ...style,
              height: '100vh',
              backgroundColor:
                Number(id) % 2 ? 'var(--colors-green)' : 'var(--colors-cream)',
              width: '100%',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {left}
          </div>
        ),
        right: (
          <div
            style={{
              ...style,
              backgroundColor:
                Number(id) % 2 ? 'var(--colors-cream)' : 'var(--colors-green)',
            }}
          >
            {right}
          </div>
        ),
      };
    }),
  },
};

export const CurlElementStory = (props: { reverse?: boolean }) => (
  <CurlElement {...props} />
);
CurlElementStory.storyName = 'Curl Element';
CurlElementStory.args = {
  reverse: false,
};
CurlElementStory.argTypes = {
  ...disablePropList([
    'items',
    'id',
    'hasOverflow',
    'spacingBottom',
    'spacingTop',
    'htmlAs',
    'backgroundColor',
  ]),
};
