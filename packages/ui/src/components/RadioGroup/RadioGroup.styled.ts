import { styled } from '../../styles';
import * as ReactRadioGroup from '@radix-ui/react-radio-group';
import TypographyLabel from '../Typography/Label';

export const Label = styled(TypographyLabel, {
  '&:hover': {
    color: '$grayHoverLightBackground',
    cursor: 'pointer',
  },

  variants: {
    size: {
      small: {
        typography: '$label.mobile',
        '@medium': {
          typography: '$label',
        },
      },
      big: {
        typography: '$p.mobile',
        '@medium': {
          typography: '$p',
        },
      },
    },
    disabled: {
      true: {
        color: '$grayHoverLightBackground',
        cursor: 'not-allowed',
      },
    },
  },
});

export const Indicator = styled(ReactRadioGroup.Indicator, {
  backgroundColor: '$black',
  '&::before': {
    content: '',
    display: 'block',
    width: 8,
    height: 8,
    backgroundColor: '$green',
    borderRadius: '100%',
  },

  '&[data-disabled]': {
    backgroundColor: '$tan',
    '&::before': {
      backgroundColor: '$tan',
    },
  },
});

export const Item = styled(ReactRadioGroup.Item, {
  margin: 0,
  minWidth: 16,
  height: 16,
  width: 16,
  backgroundColor: '$tan',
  display: 'grid',
  placeContent: 'center',
  borderRadius: '100%',

  '&[data-state="checked"]': {
    backgroundColor: '$black',
  },

  '&[data-disabled]': {
    backgroundColor: '$tan',
    '&:focus, &:hover': {
      border: 'solid 1px $tan',
    },
  },

  '&:focus, &:hover': {
    border: 'solid 1px $black',
  },
});

export const ItemWrapper = styled('div', {
  display: 'flex',
  gap: '$xxs',
  alignItems: 'center',
});

export const RadioGroup = styled(ReactRadioGroup.Root, {
  display: 'flex',
  gap: '$small',
  flexWrap: 'wrap',

  variants: {
    orientation: {
      horizontal: {},
      vertical: {
        flexDirection: 'column',
      },
    },
  },
});
