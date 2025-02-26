import { styled } from '../../styles';

export const Wrapper = styled('div', {});

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
  '@lessThanSmall': {
    marginBottom: '$small',
  },
  '@xl': {
    marginRight: 16,
  },
});

export const FooterCopyWrapper = styled('div', {
  '@lessThanSmall': {
    marginBottom: '$xxl',
  },
  '& a span': {
    color: '$black',
  },
  '@small': {
    gridColumn: '1',
    '& a span': {
      color: '$black',
    },
  },
});
