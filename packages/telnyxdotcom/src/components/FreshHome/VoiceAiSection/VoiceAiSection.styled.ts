import { styled } from 'ui/styles';
import Card from 'ui/components/Card';
import SectionComponent from 'ui/components/Section';

export const Section = styled(SectionComponent, {});

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
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

  '@large': {
    width: 564, // figma
  },

  '@xl': {
    width: 636, // figma
  },
});

export const FormWrapper = styled('div', {
  margin: 0,
  display: 'flex',
  flexDirection: 'column',

  '@small': {
    alignItems: 'center',
    borderRadius: '$semilarge',
    textAlign: 'center',
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

export const CtaWrapper = styled('div', {
  marginTop: '$xl',
  textAlign: 'center',

  '@small': {
    marginTop: '$xxl',
  },

  '@medium': {
    display: 'none',
  },
});
