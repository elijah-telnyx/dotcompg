import { styled } from '../../../styles';
import Section from '../../Section';

export const NetworkMapBackground = styled('div', {
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
});

export const FilterWrapper = styled('div', {
  borderRadius: '$large',
  backgroundColor: '$cream',
  boxShadow: '$blackBackgroundBlue',
  marginBlockStart: '$medium',
  position: 'relative',
  width: 'calc(100% - $space$large)',
  minHeight: 444,

  '@small': {
    minHeight: 332,
    marginBlockStart: '$medium',
    width: 'calc(100% - $space$xxl)',
  },

  '@medium': {
    minHeight: 253,
    marginBlockStart: '$medium',
    width: 'calc(100% - $space$xl)',
  },

  '@large': {
    marginBlockStart: '$xxl',
    marginInlineStart: '$large',
    marginInlineEnd: 0,
    width: 352,
    minWidth: 352,
    minHeight: 480,
  },

  '@xl': {
    marginBlockStart: '$xxl',
    marginInlineStart: '$large',
    width: 516,
    minWidth: 516,
    minHeight: 672,
  },
});

export const Loading = styled('div', {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translateX(-50%)',
});

export const SectionWrapper = styled(Section, {
  width: '100%',
  height: 696,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  gap: '$xs',
  overflow: 'hidden',

  '@small': {
    height: '100vh',
  },
  '@medium': {},
  '@large': {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  '@xl': {
    gap: '$medium',
  },

  variants: {
    transparent: {
      true: {
        backgroundColor: 'transparent',
      },
    },
  },
});
