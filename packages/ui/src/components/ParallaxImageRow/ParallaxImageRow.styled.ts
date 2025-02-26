import { css, styled } from '../../styles';

const columnGapCSS = css({
  columnGap: '$space$xxl',
  '@medium': { columnGap: '$space$huge' },
  '@large': { columnGap: '$space$xh' },
  '@xl': { columnGap: '$space$xxh' },
});

export const Root = styled('div', {
  width: '100%',
  overflow: 'hidden',
});

export const Center = styled('div', {
  transform: 'translateX(-50%)',
});

export const InnerWrapper = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
  },
  columnGapCSS
);

export const ImageContainer = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'row',
  },
  columnGapCSS
);

export const Image = styled('img', {
  height: 32,
  '@medium': { height: 56 },
});
