import type { ThemedCSS } from './config/stitches.config';
import type { GridItemProps } from '../components/Grid';

export const basicColors = {
  black: 'black',
  cream: 'cream',
  blue: 'blue',
  green: 'green',
  citron: 'citron',
  tan: 'tan',
} as const;

export type basicColor = keyof typeof basicColors;

export const darkColors = {
  [basicColors.black]: basicColors.black,
  [basicColors.blue]: basicColors.blue,
};

export const isDarkColor = (color?: basicColor): boolean =>
  color ? color in darkColors : false;

type BreakpointSizes = Required<
  Pick<GridItemProps, 'xs' | 'small' | 'medium' | 'large' | 'xl'>
>;

export const generateHeroImageNextSectionTopSpace = (
  containerHeights: BreakpointSizes,
  paddingSpaces: BreakpointSizes,
  styles: ThemedCSS = {}
) => {
  return Object.keys(containerHeights).reduce<ThemedCSS>((css, breakPoint) => {
    const key = breakPoint as keyof typeof containerHeights;
    const space = containerHeights[key] / 2;
    const media = `@${breakPoint}`;
    css[media] = {
      ...(styles[media] || {}),
      marginTop: `${(space + paddingSpaces[key]) * -1}px !important`,
      paddingTop: `${space + paddingSpaces[key]}px !important`,
    };
    return styles;
  }, {});
};
