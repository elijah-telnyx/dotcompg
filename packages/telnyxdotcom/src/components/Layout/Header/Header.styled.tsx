import { styled } from 'ui/styles';

export const MenuButtonOpen = styled('button', {
  display: 'block',
  color: '$cream',
  transition: 'color 0.25s ease-out',
  '&:hover': {
    color: '$grayHoverDarkBackground',
  },
  right: 0,
  '@headerDesktop': {
    display: 'none',
  },
});

export const MenuButtonClose = styled('button', {
  position: 'absolute',
  zIndex: 1,
  top: 12,
  right: 28,
  color: '$black',
  '@headerDesktop': {
    display: 'none',
  },
});

export const HeaderContainer = styled('div', {
  width: '100%',
});

export const Content = styled('div', {
  position: 'relative',
  '@headerMobileOnly': {
    // display: 'none',
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    overflow: 'scroll',
    top: 0,
    left: 0,
    backgroundColor: '$green',
    paddingBlock: '$large',
    paddingInline: '$$inlinePadding',
    // desired size of the padding less the size of the button padding
    paddingTop: 'calc($huge - $medium)',
    transition: 'transform 0.5s ease-in-out, opacity 0.2s 0.2s linear',
    transform: 'translateY(-100%)',
    opacity: 0,
    '&[data-state="open"]': {
      transform: 'translateY(0%)',
      opacity: 1,
      display: 'block',
    },
  },
  '@headerDesktop': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const NavigationContent = styled('div', {
  display: 'flex',
  gap: '$large',

  '@headerMobileOnly': {
    flexDirection: 'column',
    marginBottom: '$large',
  },
  '@headerDesktop': {
    width: 'max-content',
    marginInline: 'auto',
  },
});

export const MobileHeaderButtonsWrapper = styled('div', {
  display: 'flex',
  gap: '$medium',
  marginLeft: 'auto',
  width: 'fit-content',
});

export const MobileHeaderSignUpButton = styled('div', {
  '@lessThanSmall': {
    display: 'none',
  },
  '@headerDesktop': {
    display: 'none',
  },
});
