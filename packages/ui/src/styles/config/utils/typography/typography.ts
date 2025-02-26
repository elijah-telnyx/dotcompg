import type { ThemedCSS } from '../../stitches.config';
import { typographyMap } from './typographyMap';

export const typography = (value: keyof typeof typographyMap): ThemedCSS => {
  if (typographyMap[value]) {
    return typographyMap[value];
  }
  return {};
};
