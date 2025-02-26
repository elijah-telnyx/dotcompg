import { styled } from '../../styles';
import Section from '../Section';

export const SectionWrapper = styled(Section, {
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  '@large': {
    backgroundImage:
      'url(https://images.ctfassets.net/2vm221913gep/4ukTdiT75Wm6pPtYyoASi/1e1fe02158a6d45e264cac0ad75ec1f2/Homepage_G2-Banners-Winter-2025.png)',
  },
});

export const SectionHeader = styled('div', {
  maxWidth: 731,
  marginInline: 'auto',
});

export const CtaForm = styled('form', {
  display: 'grid',
  marginInline: 'auto',
  '@small': {
    gridTemplateColumns: 'minmax(304px, 543px) 160px',
    gridTemplateRows: '2',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'center',
  },
});

export const CtaButtonWrapper = styled('div', {
  width: 'fit-content',
  '& > button': {
    width: '100%',
  },

  '@xs': {
    marginInline: 'auto',
  },
  '@small': {
    display: 'none',
  },

  variants: {
    desktop: {
      true: {
        display: 'none',
        '@small': {
          width: '100%',
          display: 'block',
        },
      },
    },
  },
});

export const InputWrapper = styled('div', {
  color: '$cream',
  '& input': {
    borderRadius: '$xs',
    backgroundColor: '$grayHoverLightBackground',
    '&::placeholder': {
      color: '$cream',
    },
  },
  '@lessThanSmall': {
    marginBottom: '$small',
  },
  '@xl': {
    marginRight: 16,
  },
});

export const FooterCopyWrapper = styled('div', {
  color: '$cream',
  '@lessThanSmall': {
    marginBottom: '$xxl',
  },
  '& a span': {
    color: '$cream',
  },
  '@small': {
    gridColumn: '1',
    '& a span': {
      color: '$cream',
      '&:hover': {
        color: '$cream',
      },
    },
  },
});
