import type { Meta, StoryObj } from '@storybook/react';
import Markdown, { type MarkdownProps } from './Markdown';

const componentMeta: Meta<MarkdownProps> = {
  title: 'Components/Markdown',
  component: Markdown,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<MarkdownProps>;

const inlineTable = (className?: string) => `
<table ${className ? `className="${className}"` : ''}>
      <colgroup>
        <col span="1" style="width: 20%" />
        <col span="1" style="width: 40%" />
        <col span="1" style="width: 40%" />
      </colgroup>
      <caption>
        Telnyx vs. Twilio: Elastic SIP Trunking
      </caption>
      <thead>
        <tr>
          <th></th>
          <th>Telnyx</th>
          <th>Twilio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Network Type</td>
          <td>
            <strong>Private network</strong><br />
            Our global IP network was designed from the ground up for real-time
            voice and data communications, so your calls are crystal-clear and
            secure, with super low latency.
          </td>
          <td>
            <strong>Public internet</strong><br />
            The internet was not built for real-time communications, and it
            shows—with high latency, packet loss, and poor security causing
            endless call quality issues.
          </td>
        </tr>
        <tr>
          <td>Network Ownership</td>
          <td>
            <strong>Fully owned</strong><br />
            We control our infrastructure, so we control routing, quality, and
            traffic for high-quality calls and low post-dial delay.
          </td>
          <td>
            <strong>Network reseller</strong><br />
            Using other providers’ servers and middlemen for routing and
            telephony leads to persistent routing and quality issues.
          </td>
        </tr>
      </tbody>
    </table>
`;

const markdown = `
# Heading1
## Heading2
### Heading3
Paragraph

*Italic*

[link](https://telnyx.com)
- list item 1
- list item 2

| Header      | Row         |
| ----------- | ----------- |
| Table       | Row 1       |
| Table       | Row 2       |


> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

---

To mitigate quality concerns, customer engagement platforms must look for configurable video APIs that operate on private networks. Private networks bypass congestion on the public internet, resulting in secure, crystal clear calls.

<br>

Paragraph to show line breaks

This is an [external link](https://google.com) inside a paragraph

This is an [anchor link](#heading) inside a paragraph

<div class="highlight">
  This is an inline, markdown-inner highlight block
</div>

<div class="highlight blue">
  This is an inline, markdown-inner highlight block in blue
</div>

<div class="highlight citron">
  This is an inline, markdown-inner highlight block in citron
</div>

<div class="highlight green">
  This is an inline, markdown-inner highlight block in green
</div>

<div class="highlight tan">
  This is an inline, markdown-inner highlight block in tan
</div>

<br>

This is a use of the ***tooltip_tool tip definition_*** definition convention.
`;

const highlightMarkdown = `
## Heading2

To mitigate quality concerns, customer engagement platforms must look for configurable video APIs that operate on private networks. Private networks bypass congestion on the public internet, resulting in secure, crystal clear calls.
`;

export const Default: story = {
  args: { children: markdown },
};

export const BackgroundColorMarkdown: story = {
  args: { children: highlightMarkdown, backgroundColor: 'tan' },
};

export const InlineTableDefault: story = {
  args: { children: inlineTable() },
};
export const InlineTableBlue: story = {
  args: { children: inlineTable('bg-blue') },
};
export const InlineTableTan: story = {
  args: { children: inlineTable('bg-tan') },
};
export const InlineTableCitron: story = {
  args: { children: inlineTable('bg-citron') },
};

export const CaptionMarkdown: story = {
  args: {
    caption: true,
    children: `this is using caption
    [this is a link using caption](https://telnyx.com)`,
  },
};

export const LeadMarkdown: story = {
  args: {
    lead: true,
    children: `this is using lead
    [this is a link using lead](https://telnyx.com)`,
  },
};

export const ToolTipDefinition: story = {
  args: {
    children: `This is a use of the ***tooltip_tool tip definition_*** definition convention.`,
  },
};

export const HighlightMarkdown: story = {
  args: {
    children: `this is using highlight
    <div class="highlight green">
      This is an inline, markdown-inner highlight block
    </div>`,
  },
};
