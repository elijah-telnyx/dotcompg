import { styled } from 'ui/styles';
import Card from 'ui/components/Card';
import SectionComponent from 'ui/components/Section';

export const Section = styled(SectionComponent, {});

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'center',
  margin: '0 auto',
  maxWidth: '$gridMaxWidth$xs',

  '@small': {
    maxWidth: '$gridMaxWidth$small',
  },
  '@medium': {
    gap: '$medium',
    maxWidth: '$gridMaxWidth$medium',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    minHeight: 596,
  },

  '@large': {
    gap: '$xxl',
    minHeight: 756,
    maxWidth: '100%',
  },
});

export const HeaderWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',

  '@medium': {
    width: 464, // figma
  },

  '@large': {
    width: 564, // figma
  },

  '@xl': {
    width: 636, // figma
  },
});

export const VideoWrapper = styled('div', {
  padding: '$large',
  backgroundColor: '$citron',
  width: '100%',
  aspectRatio: '4/3',
  boxSizing: 'border-box',

  '@xs': {
    borderRadius: '$semilarge',
  },

  '@small': {
    padding: '$xxl',
    width: 624,
  },

  '@medium': {
    width: 464,
    aspectRatio: '1',
    padding: '$xl',
    marginTop: '-$xxl', // Negative margin to maintain the offset shown in the design.
  },

  '@large': {
    aspectRatio: '4/3',
    width: 800,
    padding: '$xxl',
    marginTop: 'initial',
  },

  '@xl': {
    width: 800,
    paddingInline: '$xh',
    paddingBlock: '$xxl',
  },
});

export const Video = styled('video', {
  maxWidth: '100%',
  maxHeight: '100%',

  height: '100%',
  width: '100%',

  variants: {
    isActive: {
      false: {
        zIndex: -1,
        top: 0,
      },
    },
    mobile: {
      true: {
        display: 'block',
        '@small': {
          display: 'none',
        },
      },
    },
    desktop: {
      true: {
        display: 'none',
        '@small': {
          display: 'block',
        },
      },
    },
  },
});

export const CaptionWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$xxs',

  '@small': {
    marginBottom: '-$xl',
    paddingInline: '$medium',
    paddingBlockStart: '$large',
    paddingBlockEnd: '$xl',
    backgroundColor: '$green',
    borderRadius: '$semilarge',
    width: 464,
  },

  '@large': {
    width: 514,
  },
});

export const FormCard = styled(Card, {
  '@lessThanSmall': {
    width: '100%',
  },
  borderRadius: '$semilarge',
  marginTop: '$medium',
  paddingBlock: '$xxl',

  variants: {
    embed: {
      true: {
        backgroundColor: 'white',
        borderRadius: '$medium',
        filter: 'drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.12))',
        height: '100%',
        paddingInline: '$large',
        paddingBlock: '$large',

        '@small': {
          borderRadius: '$semilarge',
          paddingInline: '$xxl',
          paddingBlock: '$xxl',
        },

        '@large': {
          borderRadius: '$semilarge',
          paddingInline: '$xxxl',
          paddingBlock: '$xxxl',
        },

        '@xl': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
    },
  },
});
