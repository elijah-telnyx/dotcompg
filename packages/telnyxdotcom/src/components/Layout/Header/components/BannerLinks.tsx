import { styled } from 'ui/styles';

export const BANNER_LINKS = [
  { href: 'https://seti.telnyx.com', target: '_blank', rel: 'noopener', copy: 'SETI' },
  { href: 'https://shop.telnyx.com', target: '_blank', rel: 'noopener noreferrer', copy: 'Shop' },
  { href: '/contact-us', copy: 'Contact us' },
  { href: 'https://portal.telnyx.com', target: '_blank', rel: 'noopener noreferrer', copy: 'Log in' },
];

export const MobileBannerLink = styled('a', {
  color: '$black',
  fontFamily: '$formula',
  fontSize: '$medium',
  fontWeight: '$extrabold',
  lineHeight: '$medium',
  textTransform: 'uppercase',
  display: 'block',
  paddingBlock: '$small',
  borderBottom: '1px solid $gray',
  '&:hover': {
    color: '$cream',
  },
  '@headerDesktop': {
    display: 'none',
  },
  '&:first-of-type': {
    marginTop: '-$small',
  },
  '&:last-of-type': {
    marginBottom: '$small',
  },
});
