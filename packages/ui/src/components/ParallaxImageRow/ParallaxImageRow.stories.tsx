import type { Meta, StoryObj } from '@storybook/react';
import ParallaxImageRow, {
  type ParallaxImageRowProps,
} from './ParallaxImageRow';

const componentMeta: Meta<ParallaxImageRowProps> = {
  title: 'Components/ParallaxImageRow',
  component: ParallaxImageRow,
};

export default componentMeta;

type story = StoryObj<ParallaxImageRowProps>;

const Spacer = () => <div style={{ height: '40vh' }} />;

export const Default: story = {
  args: {
    images: [
      {
        src: 'https://images.ctfassets.net/taysl255dolk/6d4txBDiH6KMQ6qMaM4eis/923fe1e2f55e4962f3f039e5b1bdaf23/preview_logo.png',
        alt: 'logo',
      },
      {
        src: 'https://a-zperformance.com/pictures/1538395373-68369.png',
        alt: 'logo',
      },
      {
        src: 'https://searchvectorlogo.com/wp-content/uploads/2020/05/another-magazine-logo-vector.png',
        alt: 'logo',
      },
      {
        src: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/01104710/1267.png',
        alt: 'logo',
      },
      {
        src: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324',
        alt: 'logo',
      },
    ],
  },
  render: (args) => (
    <>
      <ParallaxImageRow {...args} />
      <ParallaxImageRow {...args} direction='Left' />
      <Spacer />
      <ParallaxImageRow {...args} speed={2} />
      <ParallaxImageRow {...args} direction='Left' speed={2} />
      <Spacer />
      <ParallaxImageRow {...args} speed={2} />
      <ParallaxImageRow {...args} direction='Left' speed={2} />
      <Spacer />
      <Spacer />
    </>
  ),
};
