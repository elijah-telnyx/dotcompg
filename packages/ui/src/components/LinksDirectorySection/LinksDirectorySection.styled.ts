import { keyframes, styled, theme } from '../../styles';
import Link from '../Link';
import * as Tabs from '@radix-ui/react-tabs';

const LinkCopy = styled(Link, {
  width: 'fit-content',
  textTransform: 'uppercase',
  ['&[aria-disabled="true"] > span']: {
    color: '$grayHoverDarkBackground !important',
    cursor: 'default',
  },
  '@small': {
    fontSize: '$large',
    lineHeight: '$xs',
  },
});

const TabsWrapper = styled('div', {
  $$containerInlinePadding: theme.space.xl,
  boxShadow: '0px 12px 24px 0px #9D9D9D3D',

  marginTop: '$xl',
  backgroundColor: '$cream',
  borderRadius: '$medium',
  paddingTop: '$xl',
  paddingBottom: '$xxl',
  paddingInline: '$$containerInlinePadding',
  border: '1px solid $tan',
  '@lessThanSmall': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 'none',
    width: 'calc(100% + (100vw - 100%)/2)',
    paddingRight: 'calc($$containerInlinePadding + $small)',
  },
  '@medium': {
    paddingBlock: '$xl',
    $$containerInlinePadding: theme.space.xxl,
  },
});

const TabsContainer = styled(Tabs.Root, {
  position: 'relative',
});

const Trigger = styled(Tabs.Trigger, {
  fontFamily: '$formula',
  fontSize: '$xs',
  lineHeight: '$xs',
  fontWeight: '$extrabold',

  textAlign: 'center',
  color: '$grayHoverDarkBackground',
  border: '1px solid',
  borderColor: 'transparent',
  width: 44,
  height: 44,
  // to prevent flex item from shrinking
  flexShrink: 0,
  borderRadius: '$round',

  '&[data-state="active"]': {
    color: '$black',
    borderColor: '$tan',
    transition: 'border-color 0.3s ease-in-out',
  },
  '&:hover:not([data-state="active"])': {
    color: '$grayHoverLightBackground',
  },
  '& span': {
    display: 'block',
    // font offset
    transform: 'translateY(2px)',
  },
});

const Content = styled(Tabs.Content, {
  marginTop: '$xl',
  // to align with the trigger
  paddingLeft: '$large',
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});
const LinksContainer = styled('div', {
  rowGap: '$xs',
  columnGap: '$medium',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(225px, 1fr))',
  gridTemplateRows: 'repeat(8, 1fr)',
  gridAutoFlow: 'column',
  opacity: 0,
  animation: `${fadeIn} .3s .1s ease-in-out forwards`,
});

export const styles = {
  LinkCopy,
  TabsWrapper,
  TabsContainer,
  Trigger,
  Content,
  LinksContainer,
};
