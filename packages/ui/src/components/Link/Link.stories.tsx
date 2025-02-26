import type { Meta, StoryObj } from '@storybook/react';
import LinkComponent, { type LinkProps } from './Link';
import Heading from '../Typography/Heading/Heading';

const componentMeta: Meta<LinkProps> = {
  title: 'Components/Link',
  component: LinkComponent,
};

export default componentMeta;

type story = StoryObj<LinkProps>;

const icon = {
  src: '',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:v="https://vecta.io/nano" viewBox="0 0 40 40" fill="none"><script xmlns=""/><g clip-path="url(#A)"><g fill-rule="evenodd" fill="currentColor"><path d="M4 3a1 1 0 0 0-1 1v4H0V2.5A2.5 2.5 0 0 1 2.5 0h35A2.5 2.5 0 0 1 40 2.5v35a2.5 2.5 0 0 1-2.5 2.5h-35A2.5 2.5 0 0 1 0 37.5V10h35v3H3v23a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4zm17.5 15a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 1 1 0 3h-9a1.5 1.5 0 0 1-1.5-1.5zm0 6a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 1 1 0 3h-9a1.5 1.5 0 0 1-1.5-1.5zm-15 7A1.5 1.5 0 0 1 8 29.5h24a1.5 1.5 0 1 1 0 3H8A1.5 1.5 0 0 1 6.5 31zm0-13A2.5 2.5 0 0 1 9 15.5h7a2.5 2.5 0 0 1 2.5 2.5v6a2.5 2.5 0 0 1-2.5 2.5H9A2.5 2.5 0 0 1 6.5 24v-6zm3 .5v5h6v-5h-6z"/></g><path d="M7.667 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 1 1 3 0zm4.222 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 1 1 3 0zm4.445 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 1 1 3 0z" fill="#000"/></g><defs><clipPath id="A"><path fill="#fff" d="M0 0h40v40H0z"/></clipPath></defs></svg>`,
  alt: 'external',
};

export const Default: story = { args: { href: '#link', children: 'Link' } };

const grid = {
  section: { display: 'grid', gap: 28 },
  container: { display: 'grid', gap: 4, marginLeft: 16 },
};

const Template = (args: LinkProps & { storyTitle?: string }) => (
  <div style={grid.section}>
    {args.storyTitle && (
      <Heading level={2} dark={args.dark}>
        {args.storyTitle}
      </Heading>
    )}
    <div>
      <Heading level={3} dark={args.dark}>
        Without Icon
      </Heading>
      <div style={grid.container}>
        <LinkComponent {...args} />
        <LinkComponent {...args} kind='cta' />
      </div>
    </div>
    <div>
      <Heading level={3}>With Icon</Heading>
      <div style={grid.container}>
        <LinkComponent {...args} icon={icon} />
        <LinkComponent {...args} kind='cta' icon={icon} />
      </div>
    </div>
  </div>
);

export const InternalLink: story = {
  render: (args) => <Template {...args} storyTitle='Internal Link' />,
  args: {
    href: 'https://telnyx.com',
    children: 'telnyx.com',
  },
};

export const ExternalLink: story = {
  render: (args) => <Template {...args} storyTitle='External Link' />,
  args: {
    href: 'https://www.developers.telnyx.com/',
    children: 'developers.telnyx.com',
  },
};

export const HashLink: story = {
  render: (args) => <Template {...args} storyTitle='Hash Link' />,
  args: {
    href: '#go-to-section',
    children: 'view full coverage',
  },
};

export const LinkDark: story = {
  render: Template,
  args: {
    ...ExternalLink.args,
    dark: true,
  },
  parameters: {
    backgrounds: { default: 'Dark' },
  },
};
