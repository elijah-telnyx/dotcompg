import { AnchorElement } from '../Link';
import { Base } from '../Typography/utils';
import Section from '../Section';
import TelnyxLogo from '../Icons/TelnyxLogo';
import { styled } from '../../styles';

const itemsGap = '$large';

export const Footer = styled(Section, {
  borderTop: '1px solid $tan',
});

export const NavigationLink = styled(AnchorElement, {
  typography: '$p.mobile',

  '@medium': {
    typography: '$p',
  },

  '&:hover, &:active': {
    color: '$grayHoverLightBackground',
    textDecoration: 'underline',
  },
});

export const Logo = styled(TelnyxLogo, {
  width: '100%',
  height: 'auto',
});

export const NavigationList = styled('ul', {
  listStyleType: 'none',
  padding: 0,
  margin: 0,

  display: 'grid',
  gap: itemsGap,
  '@lessThanSmall': {
    '&:not(:last-child)': {
      marginBottom: '$xxl',
    },
  },
});

export const CopyrightText = styled(Base('p'), {
  fontFamily: '$inter',
  fontStyle: 'normal',
  fontWeight: '$regular',
  fontSize: '$xs',
  lineHeight: '$xs',
  marginTop: itemsGap,
  '@large': {
    marginTop: '$xh',
  },
});

export const SocialNavigationList = styled('ul', {
  listStyleType: 'none',
  paddingInlineStart: 0,
  display: 'flex',
  gap: '$xs',
  maxHeight: '24px',
  marginBlock: 0,
});

export const SocialIconLink = styled('a', {
  '&:hover, &:active': {
    color: '$blue',
  },
});

export const NavigationLabel = styled('p', {
  typography: '$h2.category.mobile',
});

export const VisibleOnLarge = styled('div', {
  display: 'none !important',
  '@large': {
    display: 'block !important',
  },
});
