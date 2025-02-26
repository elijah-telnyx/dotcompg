import { styled } from '@stitches/react';
import type { Meta, StoryObj } from '@storybook/react';

import Paragraph from '../Typography/Paragraph';
import CtaButton, { type CTAButtonProps } from './CtaButton';

const componentMeta: Meta<typeof CtaButton> = {
  title: 'Components/CTA Button',
  component: CtaButton,
};

export default componentMeta;

type Story = StoryObj<CTAButtonProps>;

const Wrapper = styled('div');

const render: Story['render'] = (args) => (
  <>
    <Paragraph css={{ marginBottom: '$medium' }}>
      Background color is only used to simulate the background of the section
      and how it changes the button
    </Paragraph>
    <Wrapper
      css={{
        backgroundColor: `$${args.backgroundColor}`,
        padding: '$medium',
      }}
    >
      <CtaButton {...args} />
    </Wrapper>
  </>
);

export const Button: Story = {
  render,
  args: {
    text: 'See pricing',
    href: '#',
    type: 'button',
    buttonKind: 'primary',
  },
};
export const Link: Story = {
  render,
  args: {
    text: 'See pricing',
    href: '#',
    type: 'link',
    linkKind: 'default',
  },
};
