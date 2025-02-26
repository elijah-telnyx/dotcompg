import { keyframes, styled } from '../../styles';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const contentShowMobile = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});
const contentHideMobile = keyframes({
  from: { transform: 'translateY(0)' },
  to: { transform: 'translateY(100%)' },
});

const contentShow = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});
const contentHide = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export const Content = styled(DialogPrimitive.Content, {
  '@lessThanMedium': {
    zIndex: '$dialog',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: '$large',
    backgroundColor: '$cream',
    padding: '$large',
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: '100vh',
    overflow: 'hidden',
    '@supports (height: 100dvh)': {
      height: '100dvh',
    },
    '@media (prefers-reduced-motion: no-preference)': {
      '&[data-state="open"]': {
        animation: `${contentShowMobile} 700ms cubic-bezier(0.16, 1, 0.3, 1)`,
      },
      '&[data-state="closed"]': {
        animation: `${contentHideMobile} 1000ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      },
    },
  },

  '@medium': {
    zIndex: '$dialog',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: 0,
    backgroundColor: '$cream',
    borderRadius: '$small',
    border: 'solid 1px $grayStroke',
    paddingBlock: '$small',
    paddingInline: '$medium',
    position: 'fixed',
    top: '25%',
    bottom: 0,
    right: 0,
    left: '50%',
    height: '50vh',
    width: '75vw',
    overflow: 'hidden',
    transform: 'translateX(-50%)',

    '@supports (height: 50dvh)': {
      height: '50dvh',
    },

    '&[data-state="open"]': {
      animation: `${contentShow} 350ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${contentHide} 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    },
  },

  variants: {
    variant: {
      darkSeti: {
        backgroundColor: '$grayEmbed',
      },
    },
  },
});

export const Overlay = styled(DialogPrimitive.Overlay, {
  variants: {
    overlay: {
      true: {
        backgroundColor: '$black60percent',
        position: 'fixed',
        inset: 0,
        animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1`,
        zIndex: '$overlay',
      },
    },
  },
});

export const ContentChildWrapper = styled('div', {
  overflow: 'auto',
});

export const CloseButton = styled(DialogPrimitive.Close, {
  marginLeft: 'auto',
  padding: '$xs',
  // because of the padding, this is required to align it to the right
  transform: 'translate($space$xs, 0)',
});
