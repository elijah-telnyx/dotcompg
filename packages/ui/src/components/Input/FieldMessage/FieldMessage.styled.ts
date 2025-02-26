import { styled } from '../../../styles';

export const Message = styled('div', {
  color: '$grayHoverLightBackground',
  display: 'flex',
  alignItems: 'center',
  gap: '$xxs',
  typography: '$label.mobile',
  fontWeight: '$medium',

  '@medium': {
    typography: '$label',
    fontWeight: '$medium',
  },

  '& svg': {
    color: '$cream',
    flexShrink: 0,
  },

  variants: {
    type: {
      error: {
        typography: '$error',
        color: '$redAlt',

        '& svg': {
          color: '$redAlt',
        },

        '@medium': {
          typography: '$error',
        },
      },
      info: {},
      success: {},
    },
    multiline: {
      true: {
        alignItems: 'flex-start',
        textWrap: 'pretty',
      },
    },
  },
});
