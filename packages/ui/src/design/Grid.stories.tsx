import type { Meta } from '@storybook/react';
import { default as G } from '../components/Grid/index';

const containerStyle: React.CSSProperties = {
  border: '1px solid hotpink',
  marginBottom: '24px',
};
const itemStyle: React.CSSProperties = {
  backgroundColor: 'hotpink',
  color: 'white',
  textAlign: 'center',
};

export const Grid = () => (
  <>
    <G.Container style={containerStyle}>
      <G.Item style={itemStyle}>col 1</G.Item>
      <G.Item style={itemStyle}>col 2</G.Item>
      <G.Item style={itemStyle}>col 3</G.Item>
      <G.Item style={itemStyle}>col 4</G.Item>
      <G.Item style={itemStyle} xs={0}>
        col 5
      </G.Item>
      <G.Item style={itemStyle} xs={0}>
        col 6
      </G.Item>
      <G.Item style={itemStyle} xs={0}>
        col 7
      </G.Item>
      <G.Item style={itemStyle} xs={0}>
        col 8
      </G.Item>
      <G.Item style={itemStyle} xs={0} small={0}>
        col 9
      </G.Item>
      <G.Item style={itemStyle} xs={0} small={0}>
        col 10
      </G.Item>
      <G.Item style={itemStyle} xs={0} small={0}>
        col 11
      </G.Item>
      <G.Item style={itemStyle} xs={0} small={0}>
        col 12
      </G.Item>
    </G.Container>
    <G.Container style={containerStyle}>
      <G.Item style={itemStyle} xs={2}>
        xs: 2
      </G.Item>
      <G.Item style={itemStyle} xs={2}>
        xs: 2
      </G.Item>
    </G.Container>
    <G.Container style={containerStyle}>
      <G.Item style={itemStyle} xs={4}>
        xs: 4
      </G.Item>
    </G.Container>
    <G.Container style={containerStyle}>
      <G.Item style={itemStyle} xs={4}>
        always visible
      </G.Item>
      <G.Item style={itemStyle} xs={0} small={4}>
        hidden on xs
      </G.Item>
    </G.Container>
    <G.Container style={containerStyle}>
      <G.Item style={itemStyle} xs={4} small={8} medium={12}>
        always full width
      </G.Item>
    </G.Container>
    <G.Container style={containerStyle}>
      <G.Item style={itemStyle} xs={0} small={0} medium={0} large={9}>
        lg: 9
      </G.Item>
    </G.Container>
  </>
);

const componentMeta: Meta<typeof G.Container> = {
  title: 'Design/Grid',
  component: Grid,
  options: {
    showPanel: false,
  },
};

export default componentMeta;
