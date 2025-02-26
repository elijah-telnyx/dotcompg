import Glider from 'react-glider';
import { styled } from '../../styles';
import { Base } from '../Typography/utils';

export const CarouselTriggerWrapper = styled(Base('div'), {
  display: 'flex',
  placeContent: 'center',
  variants: {
    dark: {
      true: {
        '& button': {
          '&:hover': {
            color: '$grayHoverDarkBackground',
          },
          '&:disabled, &[aria-disabled="true"]': {
            cursor: 'not-allowed',
            color: '$grayHoverLightBackground',
          },
        },
      },
      false: {
        '& button': {
          '&:hover': {
            color: '$grayHoverLightBackground',
          },
          '&:disabled, &[aria-disabled="true"]': {
            cursor: 'not-allowed',
            color: '$grayHoverDarkBackground',
          },
        },
      },
    },
    isHidden: {
      true: {
        display: 'none',
      },
    },
  },
});

export const BaseCarouselWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  scrollBehavior: 'smooth',
  width: '100%',
});

export const BaseCarouselItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  listStyle: 'none',
  marginInline: '$xxs',

  '@small': {
    marginInline: '$xs',
  },
  '@medium': {
    marginInline: '$small',
  },
  '@xl': {
    marginInline: '$medium',
  },
  '&': {
    transition: 'ease-out scale 0.25s',
  },
});

export const BaseCarouselTrigger = styled('button', {
  padding: '$xs',
  marginInline: '$xs',
  svg: {
    width: 24,
    height: 24,
  },
});

export const GliderWrapper = styled(Glider, {
  '.glider-track': {
    alignItems: 'stretch',
    paddingBlock: '$xl',
    marginInline: 'auto',
  },
  '@medium': {
    '.glider-track': {
      paddingBlock: '$xxl',
    },
  },
});
