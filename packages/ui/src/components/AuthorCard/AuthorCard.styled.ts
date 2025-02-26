import { keyframes, styled } from '../../styles';
import CTA from '../Typography/CTA';
import LinkComponent from '../Link';
import Caption from '../Typography/Caption';

export const Wrapper = styled('div', {
  backgroundColor: '$tan',
  borderRadius: '$medium',
  padding: '$medium',

  '@small': {
    gap: '$medium',
    gridTemplateColumns: 'auto auto',
    gridTemplateAreas: `
    'picture name'
    'picture description'
  `,
  },

  '@medium': {
    borderRadius: '$semilarge',
    padding: '$xl',
  },
});

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$large',
});

export const NameWrapper = styled(CTA, {
  gridArea: 'name',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '$xxs',
  [`& ${Caption}`]: {
    marginTop: '$xxs',
    flexBasis: '100%',
  },
});
export const Name = styled('span');

export const LinkedinLink = styled('a', {
  textDecoration: 'none',
  height: 24,
  fontOffset: 'cta',
  marginLeft: '$xxs',

  '&:hover, &:active': {
    color: '$blue',
  },
});

export const Link = styled(LinkComponent, {
  display: 'inline',
  marginLeft: '$xxs',
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const FadeInText = styled('span', {
  opacity: 0,
  display: 'none',
});

export const DescriptionContent = styled('p', {
  display: 'inline',
});

export const DescriptionWrapper = styled('div', {
  flexBasis: '100%',
  marginTop: '$xl',
  marginBottom: '$medium',
  overflow: 'hidden',
  transition: 'max-height 0.3s ease-out',
  variants: {
    isExpanded: {
      true: {
        maxHeight: 'auto',
        [`& ${FadeInText}`]: {
          display: 'inline',
          opacity: 1,
          animation: `${fadeIn} 0.3s ease-out forwards`,
        },
        [`& ${Link}`]: {
          display: 'none',
        },
      },
    },
  },
});
