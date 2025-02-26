import type { Meta, StoryObj } from '@storybook/react';
import CategoryHeader, { type CategoryHeaderProps } from './CategoryHeader';
import type { CategoryHeaderCardProps } from '../CategoryHeaderCard';

const componentMeta: Meta<CategoryHeaderProps> = {
  title: 'Components/CategoryHeader',
  component: CategoryHeader,
};

const storyItem: CategoryHeaderCardProps = {
  media: {
    src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
    alt: 'Healthcare',
  },
  title: 'Healthcare',
  icon: {
    src: '',
    svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    alt: 'Healthcare icon',
  },
  link: {
    text: 'Learn more',
    href: '/healthcare',
    type: 'link',
    linkKind: 'cta',
  },
};

const makeItems = (count: number) =>
  Array.from({ length: count }, () => storyItem);

export default componentMeta;

type Story = StoryObj<CategoryHeaderProps>;

export const Default: Story = {
  args: {
    items: makeItems(5),
  },
};
