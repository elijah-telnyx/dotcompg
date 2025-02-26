import { keyframes, styled } from 'ui/styles';

export const Container = styled('div', {
  fontFamily: '$formula',
  display: 'block',
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: '$chatWidget',
  variants: {
    pageHasRecaptcha: {
      true: {
        bottom: 86,
      },
    },
  },
});

export const MenuItemsContainer = styled('div', {
  display: 'none',
  flexDirection: 'column-reverse',
  alignItems: 'flex-end',
  gap: 12,
  position: 'absolute',
  right: 0,
  bottom: 56,
  paddingBottom: 12,
  '&:hover': {
    display: 'flex',
  },
});

export const MenuButton = styled('div', {
  width: 56,
  height: 56,
  background: '$green',
  transition: 'transform 0.2s linear',
  borderRadius: '100%',
  '&:hover': {
    transform: 'scale(1.2)',
  },
  display: 'grid',
  placeItems: 'center',
  boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2)',
  cursor: 'pointer',

  [`&:hover + ${MenuItemsContainer}`]: {
    display: 'flex',
  },
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
    scale: 0,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
});

export const MenuItemButton = styled('button', {
  opacity: 0,
  animation: `${fadeIn} 0.1s ease-in-out forwards`,
  backgroundColor: '$black',
  color: '$cream',
  fontFamily: '$formula',
  fontSize: '14px',
  lineHeight: '20px',
  padding: '12px 12px 8px 12px',
  whiteSpace: 'nowrap',
  boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2)',

  '&:hover': {
    backgroundColor: '$grayHoverLightBackground',
  },

  width: 'fit-content',
  borderRadius: 20,
});
