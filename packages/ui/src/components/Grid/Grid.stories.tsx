import type { Meta, StoryObj } from '@storybook/react';

import { Container, Item, type GridItemProps } from './Grid';

const componentMeta: Meta<GridItemProps> = {
  title: 'Components/Grid',
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

type Story = StoryObj<GridItemProps>;

export const GridItem: Story = {
  render: (args) => (
    <Container style={containerStyle}>
      <Item style={itemStyle} {...args}>
        item
      </Item>
    </Container>
  ),
  args: { xs: 2, small: 4, medium: 8, large: 0 },
};
