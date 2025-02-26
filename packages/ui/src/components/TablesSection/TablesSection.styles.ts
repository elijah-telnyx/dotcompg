import Markdown from '../Markdown';
import H from '../Typography/Heading';
import { styled } from '../../styles';
import Grid from '../Grid';

export const TextWrapper = styled('div', {
  marginBottom: '$xxl',
  '@medium': {
    marginBottom: '$huge',
  },
});
export const Heading = styled(H);
export const Copy = styled(Markdown);
export const CopyWrapper = styled('div', {
  marginTop: '$medium',
  '@medium': {
    marginTop: '$large',
  },
});

export const SelectContainer = styled(Grid.Item, {
  marginBottom: '$xxl',
  gridRowStart: '-1',

  '@small': {
    justifySelf: 'end',
  },
  '@medium': {
    gridRowStart: 'auto',
    marginBottom: 0,
  },
});

export const SelectContainerWrapper = styled('div', {
  display: 'flex',
  gap: '$xs',
  flexWrap: 'wrap',
});

export const SelectWrapper = styled('div', {
  minWidth: 304,
  '@small': {
    minWidth: 274,
  },
});

export const SmallSelectWrapper = styled('div', {
  width: 98,
});
