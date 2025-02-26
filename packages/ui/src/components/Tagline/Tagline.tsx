import type { VariantProps } from '@stitches/react';
import type { ReactNode } from 'react';

import { basicColors, isDarkColor, type basicColor } from '../../styles/utils';
import * as css from './Tagline.styled';
import type { ThemedCSS } from '../../styles/config/stitches.config';
export interface TaglineProps {
  children: ReactNode;
  /**
   * Adds padding and background color
   */
  color?: basicColor;
  /**
   * Only works to the default tagline
   */
  isDark?: boolean;
  variants?: Omit<VariantProps<typeof css.Tagline>, 'withColor'>;
  css?: ThemedCSS;
}

const Tagline = ({
  children,
  color,
  isDark,
  variants,
  css: cssStyles,
}: TaglineProps) => {
  if (color) {
    const bgColor = color === 'black' && isDark ? basicColors.cream : color;

    return (
      <css.Tagline
        css={{
          backgroundColor: `$${bgColor}`,
          ...cssStyles,
        }}
        withColor
        dark={isDarkColor(bgColor)}
        {...variants}
      >
        {children}
      </css.Tagline>
    );
  }

  return (
    <css.Tagline dark={isDark} css={cssStyles}>
      {children}
    </css.Tagline>
  );
};

export default Tagline;
