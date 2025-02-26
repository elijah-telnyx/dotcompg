import { styled } from '../../../styles';

export const HeaderGroupLabel = styled('p', {
  typography: '$h2.category.mobile',
  textTransform: 'uppercase',
  borderBottom: '1px solid $black',
  width: '100%',
  '@headerDesktop': {
    paddingBottom: '$medium',
  },
  marginBottom: '$medium',
});

export const HeaderInnerGroupLabel = styled('p', {
  typography: '$p.caption.mobile',
  fontStyle: 'italic',
  paddingBottom: '$xs',
  '@headerMobileOnly': {
    color: '#969696',
  },
  '@headerDesktop': {
    paddingBottom: '$medium',
  },
});

export const LabelItem = styled('span', {
  translate: '0px 2px', //font bottom spacing
  fontFamily: '$formula',
  fontWeight: '$extrabold',
  fontSize: '$small',
  lineHeight: '$xs',
});

export const HeaderMenuLabelContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '@headerDesktop': {
    color: '$cream',
    padding: '$medium',
    outline: 0,
  },
});

export const HeaderMenuLabel = styled('span', {
  fontFamily: '$formula',
  fontWeight: '$extrabold',
  fontSize: '$xl',
  lineHeight: '$large',
  position: 'relative',

  [`&:before`]: {
    content: '',
    display: 'block',
    height: 0,
    width: '100%',
    position: 'absolute',
    bottom: '0px',
    transition: 'height 0.25s ease-out',
    backgroundColor: '$cream',
  },
  '@headerMobileOnly': {
    '[aria-expanded="true"] &:before, *:hover > &:before': {
      height: '0.225em',
    },
  },
  '@headerDesktop': {
    display: 'block',
    typography: '$h2.category.mobile',
    fontSize: '15px',
    textTransform: 'unset',
    'button:hover &, button:focus &, a:hover &, a:focus &, &:hover, &:focus': {
      [`&:before`]: {
        /* keep consistent across different font-sizes */
        height: '0.225em',
      },
    },
  },
});
