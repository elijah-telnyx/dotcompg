import { createStitches, type CSS, type ScaleValue } from '@stitches/react';
import media from './media';
import theme from './theme';
import themeMap from './themeMap';
import * as utils from './utils';
import type Stitches from '@stitches/react/types/stitches';

const stitches = createStitches({
  theme,
  media,
  themeMap,
  utils,
});

export type StitchesConfig = Stitches<
  '',
  typeof media,
  typeof theme,
  typeof themeMap
>['config'];

// used for utils
export type ThemedCSS = CSS<StitchesConfig>;

export type CSSVariables<T> = ScaleValue<T, StitchesConfig>;

export default stitches;
