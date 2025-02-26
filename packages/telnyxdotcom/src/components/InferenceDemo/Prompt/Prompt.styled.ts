import { styled } from 'ui/styles';

export const minHeightMobile = 56;
export const minHeightDesktop = 311;

export const Textarea = styled('textarea', {
  border: '1px solid transparent',
  padding: '$xs $small',
  resize: 'none',
  width: '100%',
  minHeight: minHeightMobile,
  fontFamily: '$inter',
  fontSize: '$xs',
  lineHeight: '$xs',
  overflow: 'hidden',
  '&:placeholder': {
    color: 'grayHoverDarkBackground',
  },
  '&:focus, &:active': {
    outline: 'none',
  },
  '@medium': {
    minHeight: minHeightDesktop,
    height: 311,
  },
  ['&:disabled']: {
    opacity: 0.4,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
  variants: {
    theme: {
      dark: {
        backgroundColor: '$black',
        color: '$cream',
        borderColor: '$grayHoverLightBackground',

        '&:focus, &:active': {
          borderColor: '$cream',
        },
      },
      light: {
        backgroundColor: '$cream',
        color: '$black',
        borderColor: '$grayHoverDarkBackground',

        '&:focus, &:active': {
          borderColor: '$blue',
        },
      },
    },
    embed: {
      true: {
        '@medium': {
          minHeight: 96,
          height: 96,
          maxHeight: 96,
        },

        '@xl': {
          minHeight: minHeightDesktop,
          height: minHeightDesktop,
          maxHeight: minHeightDesktop,
        },
      },
    },
    hero: {
      true: {
        '@xl': {
          // match hero height
          minHeight: 220,
          height: 220,
          maxHeight: 220,
        },
      },
    },
  },
});

export const CharacterCount = styled('p', {
  marginLeft: 'auto',
});
