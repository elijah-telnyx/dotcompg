import { styled } from '../../styles';

const Link = styled('span', {
  cursor: 'pointer',

  'b &, strong &': {
    fontWeight: 'bold',
  },

  variants: {
    dark: {
      true: {
        color: '$citron',
        '&:hover': {
          color: '$cream',
        },
      },
      false: {
        color: '$blue',
        '&:hover': {
          color: '$black',
        },
      },
    },
    lead: {
      true: {
        typography: '$link.lead.mobile',
        '@medium': {
          typography: '$link.lead',
        },
      },
      false: {
        typography: '$link.mobile',
        '@medium': {
          typography: '$link',
        },
      },
    },
    blog: {
      true: {
        color: '$blue',

        '&:hover, &:focus': {
          color: '$black',
        },
      },
    },
  },
  defaultVariants: {
    lead: false,
    dark: false,
  },
});

export default Link;
