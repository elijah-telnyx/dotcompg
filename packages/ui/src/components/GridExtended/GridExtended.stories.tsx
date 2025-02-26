import type { Meta, StoryObj } from '@storybook/react';

import { Container, Item, type GridExtendedItemProps } from './GridExtended';

const componentMeta: Meta<GridExtendedItemProps> = {
  title: 'Components/GridExtended',
  component: Item,
};

export default componentMeta;

const containerStyle: React.CSSProperties = {
  border: '1px solid hotpink',
};
const itemStyle: React.CSSProperties = {
  backgroundColor: 'hotpink',
  color: 'white',
  textAlign: 'center',
};

type Story = StoryObj<GridExtendedItemProps>;

export const GridExtendedItem: Story = {
  render: (args) => (
    <Container style={containerStyle}>
      <Item style={itemStyle} {...args}>
        item
      </Item>
    </Container>
  ),
  args: { xs: 2, small: 4, medium: 8, large: 0 },
};
