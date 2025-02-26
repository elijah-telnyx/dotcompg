export const CardThemeOptions = {
  blue: 'blue',
  citron: 'citron',
  green: 'green',
  tan: 'tan',
} as const;

export type CardTheme = keyof typeof CardThemeOptions;

export const DarkCardThemeOptions = {
  [CardThemeOptions.blue]: CardThemeOptions.blue,
};

export const isDarkCardTheme = (
  cardTheme?: keyof typeof CardThemeOptions
): boolean => (cardTheme ? cardTheme in DarkCardThemeOptions : false);
