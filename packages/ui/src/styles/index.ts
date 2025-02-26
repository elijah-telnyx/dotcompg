import stitches from './config/stitches.config';

export const getRawThemeValue = (value: string | number): number => {
  if (typeof value === 'string') {
    return Number(value.split('px')[0]);
  }
  return value;
};

export const {
  config,
  css,
  globalCss,
  styled,
  theme,
  createTheme,
  getCssText,
  keyframes,
  prefix,
  reset,
} = stitches;

export default stitches;
