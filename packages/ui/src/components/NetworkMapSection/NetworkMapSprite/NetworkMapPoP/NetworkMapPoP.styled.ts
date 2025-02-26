import { styled } from '../../../../styles';

export const PoPPath = styled('path', {
  fillRule: 'evenodd',
  clipRule: 'evenodd',
  fill: '$green',
  pointerEvents: 'fill',

  '&:hover, &:active, &:focus': {
    cursor: 'pointer',
  },
});
