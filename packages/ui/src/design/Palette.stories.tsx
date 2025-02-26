import type { CSSProperties } from 'react';
import { theme } from '../styles';

export default {
  title: 'Design/Palette',
  parameters: {
    layout: 'centered',
    options: {
      showPanel: false,
    },
    backgrounds: { default: 'Figma' },
  },
};

const paletteStyles = (color: string): CSSProperties => ({
  width: 272,
  height: 272,
  backgroundColor: color,
});

export const Palette = () => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.space.medium.value,
      padding: theme.space.large.value,
    }}
  >
    {Object.entries(theme.colors).map(([name, color]) => (
      <div key={name}>
        <div style={paletteStyles(color.value)}></div>
        <p style={{ textTransform: 'capitalize' }}>{name}</p>
      </div>
    ))}
  </div>
);
