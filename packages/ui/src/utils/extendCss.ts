import { theme } from '../styles';
import type { ThemedCSS } from '../styles/config/stitches.config';
import { copyObjectWithoutReference } from './copyObjectWithoutReferences';

// merge styles of breakpoints
export const extendCss = ({
  customCss,
  css,
}: {
  customCss?: ThemedCSS;
  css: ThemedCSS;
}) => {
  if (!customCss) return css;
  const finalForm: ThemedCSS = copyObjectWithoutReference(css);
  const breakpointKeys = Object.keys(theme.viewports).map((key) => `@${key}`);
  Object.keys(customCss).forEach((key) => {
    if (breakpointKeys.includes(key)) {
      finalForm[key] = {
        ...Object(css)[key],
        ...Object(customCss)[key],
      };
    }
  });
  return { ...customCss, ...css, ...finalForm };
};
