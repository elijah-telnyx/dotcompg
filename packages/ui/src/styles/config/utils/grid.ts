import type { CSSProperties } from '@stitches/react';
import theme from '../theme';

export const gridContainerWidth = (
  viewport: keyof typeof theme.viewports | 'base'
): CSSProperties => {
  return {
    gridTemplateColumns: `repeat(${theme.gridNumColums[viewport]}, ${theme.sizes.medium})`,
    maxWidth: theme.gridMaxWidth[viewport],
  };
};

export const gridItemWidth = (size: number | undefined): CSSProperties => {
  if (size) {
    return {
      display: 'block',
      gridColumn: `span ${size}`,
    };
  }

  if (typeof size === 'undefined') {
    return {
      display: 'block',
    };
  }

  return {
    display: 'none',
  };
};
