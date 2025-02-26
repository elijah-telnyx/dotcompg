import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { keyframes, styled } from '../../../styles';

import ChevronDown from '../../../components/Icons/ChevronDown';
import External from '../../Icons/External';
import Link from '../../../components/Link';
import { Content as LinkContent } from '../../../components/Link/Link.styled';
import { MainItem, mediaOnlyBelowMedium } from '../Header.styled';

const ANIMATION_DURATION = '.5s';
const ANIMATION_TRANSITION = 'cubic-bezier(0.87, 0, 0.13, 1)';

export const ItemLink = styled(Link, {
  paddingBottom: '$xs',
  fontSize: '$medium',
  lineHeight: '$medium',

  '@large': {
    [`& ${LinkContent}`]: {
      fontSize: '$xl',
      lineHeight: '$xl',
    },
  },
  [mediaOnlyBelowMedium]: {
    width: '100%',
    [`& ${LinkContent}`]: {
      color: '$cream',
    },
    /**
     * remove underline effect from link
     */
    [`&:hover, *:focus > &, &:focus, &:hover, &:active`]: {
      [`${LinkContent}`]: {
        color: '$grayHoverDarkBackground',
        '&:before': {
          all: 'unset',
        },
      },
    },
  },
  '& svg': {
    marginLeft: '$xxs',
    verticalAlign: 'middle',
    '@large': {
      verticalAlign: 'baseline',
      display: 'inline-block',
      width: 24,
      height: 24,
    },
  },
  variants: {
    isExternal: {
      true: {
        '& svg': {
          translate: '0 0',
          transition: 'translate 0.5s ease-out',
        },

        '&:hover svg': {
          transition: 'translate 0.5s ease-out',
          translate: '4px 0',
        },

        '& > span:before': {
          // This is the size of the arrow on right side of the link
          // 100% minus arrow margin minus arrow width
          width: 'calc(100% - var(--space-xxs) - var(--fontSizes-large))',
        },
      },
    },
  },
});

export const Menu = styled(DropdownMenuPrimitive.Root);

const slideDown = keyframes({
  '0%': { transform: 'scaleY(0)' },
  '100%': { transform: 'scaleY(1)' },
});

export const Content = styled(DropdownMenuPrimitive.Content, {
  width: '100%',
  zIndex: 2,
  transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',

  '&[data-state="open"]': {
    animation: `${slideDown} ${ANIMATION_DURATION} ${ANIMATION_TRANSITION}`,
  },

  '@large': {
    margin: '$medium auto 0',
    width: 'var(--gridMaxWidth-large)',
  },

  '@xl': {
    width: 'var(--gridMaxWidth-xl)',
  },
});

export const Trigger = styled(DropdownMenuPrimitive.Trigger, {
  display: 'flex',
  alignItems: 'center',
  [`${ChevronDown}`]: {
    // gets closer to text and move 1pixel top because of typography
    translate: '-3px -1px',
    width: 20,
    height: 20,
    transition: 'transform ease-in-out 0.25s',
    '@large': {
      translate: '-6px -1px',
    },
  },
  "&[data-state='open']": {
    [`& ${ChevronDown}`]: {
      transform: 'rotate(180deg)',
    },

    [`& ${LinkContent}::before`]: {
      height: '0.225em',
    },
  },
  '@large': {
    color: '$cream',
    '&:hover': {
      color: '$grayHoverDarkBackground',
    },
    "&[data-state='open']": {
      color: '$green',
    },
    [`${ChevronDown}`]: {
      width: 16,
      height: 16,
    },
  },
  [mediaOnlyBelowMedium]: {
    justifyContent: 'space-between',
    width: '100%',
  },
  '@medium': {
    [`&:hover, &:hover ${LinkContent}`]: {
      color: '$grayHoverDarkBackground',
    },
  },
});

export const TriggerContent = styled(MainItem);

export const ContentWrapper = styled('div', {
  backgroundColor: '$black',
  borderRadius: '$medium',
  padding: '$small',
  '@large': {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '$green',
    borderRadius: '$large',
    padding: '$xl 0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const SeeMoreLinkWrapper = styled(DropdownMenuPrimitive.Item, {
  '@large': {
    marginTop: '$large',
  },

  '&:hover': {
    outline: '0 none',
  },
});

export const ItemsWrapper = styled('div', {
  '@large': {
    color: '$black',
    margin: '0 auto',
    width: 'fit-content',
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 64px)',
    gridAutoFlow: 'row',
    gridGap: '$large',
  },
});

export const ItemContainer = styled(DropdownMenuPrimitive.Item, {
  display: 'flex',
  justifySelf: 'center',
  gridColumn: 'span 4',

  '&:hover': {
    outline: '0 none',
  },
});

export const Container = styled('div', {
  [mediaOnlyBelowMedium]: {
    width: '100%',
    // access the radix container, that we don't have access directly
    '& > div[data-radix-popper-content-wrapper]': {
      position: 'relative !important',
      transform: 'translateY(-8px) !important',
    },
  },
  '@large': {
    '& > div[data-radix-popper-content-wrapper]': {
      height: '100vh',
      width: '100vw',
      backgroundColor: '$black60percent',
      transition: 'visibility 0.1s linear 0s, opacity 0.1s linear 0s',
      maxWidth: '100%',
    },
  },
});

export const ExternalIcon = styled(External, {
  '@large': {
    width: 24,
    height: 24,
  },
});
