import { styled } from '../../styles';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import { interactiveElementsSelector } from '../../utils/styles';

export const chipCheckedStyle: ThemedCSS = {
  color: '$cream',
  backgroundColor: '$black',
  borderColor: '$black',
};

export const chipHoverStyle: ThemedCSS = {
  color: '$grayHoverLightBackground',
};

export const Chip = styled('div', {
  userSelect: 'none',
  typography: '$h2.category',
  height: 48,
  borderRadius: 30,
  border: '2px solid $grayHoverDarkBackground',
  backgroundColor: '$cream',
  display: 'inline-block',
  padding: '$medium $small',
  [interactiveElementsSelector]: {
    cursor: 'pointer',
    '&:hover': chipHoverStyle,
  },
  '&[data-state="checked"]': chipCheckedStyle,
});

export const Content = styled('div', {
  fontOffset: 'h2.category',
});
