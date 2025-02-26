import type { Meta, StoryObj } from '@storybook/react';

import InfoTooltip, { type InfoTooltipProps } from './InfoTooltip';

const componentMeta: Meta<InfoTooltipProps> = {
  title: 'Components/InfoTooltip',
  component: InfoTooltip,
};

export default componentMeta;

type Story = StoryObj<InfoTooltipProps>;

export const Default: Story = {
  render: (args) => (
    <div style={{ marginInlineStart: 48, marginBlockStart: 128 }}>
      <InfoTooltip {...args} />
    </div>
  ),
  args: {
    children: 'Support virtually unlimited concurrent inbound calls.',
    triggerLabel: 'More info about Secure trunking',
  },
};
