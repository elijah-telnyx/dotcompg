export const SpacingOptions = {
  continuous: 'continuous',
  contrasting: 'contrasting',
  none: 'none',
} as const;

export type Spacing = keyof typeof SpacingOptions;
