import { styled } from '../../../styles';
import { FullWidthItem } from '../../Grid/Grid';

export const CellContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$xxs',
});

export const TablesContainer = styled(FullWidthItem, {
  '& + &': {
    marginTop: '$xxl',
    '@medium': {
      marginTop: '$huge',
    },
  },
});

export const InnerTablesWrapper = styled('div', {
  overflow: 'hidden',
  height: 0,
  transition: 'height 0.5s',
});

export const InnerTablesContainer = styled('div', {});

export const InnerTableContainer = styled('div', {
  marginTop: '$xl',
});

export const TabsContentWrapper = styled('div', {
  marginTop: '$xxl',
  variants: {
    onlyOne: {
      false: {
        '@medium': {
          marginTop: '$huge',
        },
      },
    },
  },
});

export const ToggleButtonCopy = styled('span', {
  marginInline: '$xxs',
});
