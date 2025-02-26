import type { Meta, StoryObj } from '@storybook/react';

import Paragraph from '../Typography/Paragraph';
import Section, { type SectionProps } from './Section';
import SectionHeader, { type SectionHeaderProps } from './SectionHeader';

const componentMeta: Meta<SectionProps> = {
  title: 'Components/Section',
  component: Section,
};

export default componentMeta;

type Story = StoryObj<SectionProps>;

const render: Story['render'] = (args) => (
  <Section {...args}>
    <Paragraph dark={args.backgroundColor === 'black'}>
      Secure global connectivity for your IoT devices—simplified. Telnyx IoT SIM
      Cards offer flexible data coverage in 180+ countries and an API to manage
      and configure SIMs over the air.
    </Paragraph>
  </Section>
);

export const Default: Story = {
  render,
  args: {},
};

export const WithBlackBackground: Story = {
  render,
  args: {
    backgroundColor: 'black',
  },
};

export const SectionHeaderStory: StoryObj<SectionHeaderProps & SectionProps> = {
  name: 'Section Header',
  render: (args) => (
    <Section {...args}>
      <SectionHeader
        tagline={args.tagline}
        heading={args.heading}
        copy={args.copy}
        variant={args.variant}
      />
    </Section>
  ),
  args: {
    tagline: 'DEVELOPER FOCUS',
    heading: 'Build what you need—in a way that works for you',
    copy: 'Use our extensive developer documentation and SDKs to build a connectivity suite that works exactly how you need it to.',
  },
};

export const SectionHeaderAltStory: StoryObj<
  SectionHeaderProps & SectionProps
> = {
  name: 'Section Header - alt',
  render: (args) => (
    <Section {...args}>
      <SectionHeader
        tagline={args.tagline}
        heading={args.heading}
        copy={args.copy}
        variant={args.variant}
      />
    </Section>
  ),
  args: {
    tagline: 'DEVELOPER FOCUS',
    heading: 'Build what you need—in a way that works for you',
    copy: 'Use our extensive developer documentation and SDKs to build a connectivity suite that works exactly how you need it to.',
    variant: 'large',
  },
};
