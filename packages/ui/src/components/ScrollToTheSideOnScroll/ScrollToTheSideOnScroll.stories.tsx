import type { Meta, StoryObj } from '@storybook/react';
import useBrowserLayoutEffect from '../../utils/hooks/useBrowserLayoutEffect';
import ScrollToTheSideOnScroll, {
  type ScrollToTheSideOnScrollProps,
} from './ScrollToTheSideOnScroll';

const componentMeta: Meta<ScrollToTheSideOnScrollProps> = {
  title: 'Components/ScrollToTheSideOnScroll',
  component: ScrollToTheSideOnScroll,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<ScrollToTheSideOnScrollProps>;

export const Default: story = {};

export const WithContent: story = {
  render: function Render(args) {
    useBrowserLayoutEffect(() => {
      document.body.style.height = '300vh';
    }, []);

    return (
      <div style={{ marginTop: 300 }}>
        <ScrollToTheSideOnScroll {...args} />
      </div>
    );
  },
  args: {
    children: [1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        style={{
          aspectRatio: '4/3',
          width: 416,
          height: 312,
          backgroundColor: `rgb(${Math.random() * 255}, ${
            Math.random() * 255
          }, ${Math.random() * 255})`,
          display: 'grid',
          placeItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: 32,
        }}
      >
        {i}
      </div>
    )),
  },
};
