import { ScrollDirection } from '../../../components/Header/HeaderContainer/useScrollDirection';
import * as headerConstants from '../../../components/Header/constants';
import type { ThemedCSS } from '../stitches.config';

const isVisible = `[data-header-direction="${ScrollDirection.DOWN}"]`;
const isNotVisible = `[data-header-direction="${ScrollDirection.UP}"]`;

export const topWithHeader = (value: number): ThemedCSS => ({
  transition: 'top 0.5s',
  [`${isVisible} ~ main &`]: {
    ...headerConstants.transition.down,
    top: value,
  },
  [`${isNotVisible} ~ main &`]: {
    ...headerConstants.transition.up,
    top: value + headerConstants.height.xs,
  },
  '@large': {
    [`${isNotVisible} ~ main &`]: {
      top: value + headerConstants.height.large,
    },
  },
});
