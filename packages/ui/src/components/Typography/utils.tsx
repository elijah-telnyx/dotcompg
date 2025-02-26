import type { VariantProps } from '@stitches/react';
import { styled } from '../../styles';

export const Base = (tag: keyof JSX.IntrinsicElements) =>
  styled(tag, {
    variants: {
      dark: {
        true: {
          color: '$cream',
        },
        false: {
          color: '$black',
        },
      },
    },
  });

export interface BaseProps {
  /**
   * Uses dark background text color
   */
  dark?: boolean | VariantProps<ReturnType<typeof Base>>['dark'];
}
