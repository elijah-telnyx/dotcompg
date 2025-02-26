import type { Meta, StoryObj } from '@storybook/react';
import Globe, { type GlobeProps } from './NetworkGlobe';
import { styled } from '@stitches/react';

const Wrapper = styled('div', {
  backgroundColor: '$black',
  width: '100vw',
  height: '100vh',
});

const componentMeta: Meta<GlobeProps> = {
  title: 'Components/Network Globe',
  component: Globe,
  args: {
    globeImageUrl:
      'https://images.ctfassets.net/2vm221913gep/71zMJnM3zRWu04Slh6GPrH/97ab6a889aa82937e1272ff600c1016f/Telnyx_Website_World_Map_For_Globe-fs8.png',
    visible: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<GlobeProps>;

export const WithGlobeImageUrl: Story = {
  render: (args) => (
    <Wrapper>
      <Globe {...args} />
    </Wrapper>
  ),
};
