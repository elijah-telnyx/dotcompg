import type { Meta } from '@storybook/react';

import { styled } from '../../styles';
import * as Icons from '../../components/Icons';
import Input from '../../components/Input';

const Container = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
});

const IconItem = styled('div', {
  backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
  color: 'lightgrey',
  width: '150px',
  height: '150px',
  border: '1px solid grey',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '4px',
  gap: '8px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);',

  '&:hover': {
    boxShadow:
      '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
  },
});

export const Iconography = () => {
  const [filter, setFilter] = React.useState('');
  const iconList = Object.entries(Icons).map(([name, Icon]) => ({
    name,
    Icon,
  }));

  const filteredIconList = iconList.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        css={{ marginBottom: '$xl', maxWidth: 400 }}
      />
      <Container>
        {filteredIconList.map(({ name, Icon }) => {
          return (
            <IconItem key={name}>
              <Icon height='40' />
              <div>{name}</div>
            </IconItem>
          );
        })}
      </Container>
    </>
  );
};

const componentMeta: Meta<typeof Iconography> = {
  title: 'Design/Iconography',
  component: Iconography,
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

export default componentMeta;
