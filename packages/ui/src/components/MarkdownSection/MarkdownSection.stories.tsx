import type { StoryObj, Meta } from '@storybook/react';
import MarkdownSection, { type MarkdownSectionProps } from './MarkdownSection';

const componentMeta: Meta<MarkdownSectionProps> = {
  title: 'Components/MarkdownSection',
  component: MarkdownSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<MarkdownSectionProps>;

const markdown = `
# Heading1
## Heading2
### Heading3
Paragraph

*Italic*

[link](https://telnyx.com)
- list item 1
- list item 2

| Header      | Row         | Row
| ----------- | ----------- | ----------- |
| Table       | Row 1       | Row 1       |
| Table       | Row 2       | Row 2       |
`;

export const Default: Story = {
  args: { lead: markdown, copy: markdown },
};
