import type { ThemedCSS } from '../config/stitches.config';

export const BackgroundColorOptions = {
  black: 'black',
  cream: 'cream',
  blue: 'blue',
  green: 'green',
  citron: 'citron',
  tan: 'tan',
} as const;

export type BackgroundColor = keyof typeof BackgroundColorOptions;

export const DarkBackgroundColorOptions = {
  [BackgroundColorOptions.black]: BackgroundColorOptions.black,
  [BackgroundColorOptions.blue]: BackgroundColorOptions.blue,
};

export const isDarkBackgroundColor = (
  backgroundColor?: keyof typeof BackgroundColorOptions
): boolean =>
  backgroundColor ? backgroundColor in DarkBackgroundColorOptions : false;

export const highlightBackgroundColor = (
  backgroundColor?: keyof typeof BackgroundColorOptions,
  dark?: boolean
): boolean =>
  backgroundColor
    ? dark
      ? backgroundColor !== BackgroundColorOptions.black
      : backgroundColor !== BackgroundColorOptions.cream
    : false;

export const backgroundColorVariants = {
  backgroundColor: Object.keys(BackgroundColorOptions).reduce(
    (variants, color) => {
      const bgColor = color as BackgroundColor;
      const isDark = isDarkBackgroundColor(bgColor);
      variants[bgColor] = {
        backgroundColor: '$' + bgColor,
        ...(isDark && {
          color: '$cream',
        }),
      };
      return variants;
    },
    {} as Record<BackgroundColor, ThemedCSS>
  ),
};
