import { css, styled, theme } from '../../styles';
import { addOpacityToHex } from '../../utils/styles';
import Grid from '../Grid';

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@small': {
    rowGap: '$xxl',
  },
});

/**
 * Card Styles
 */
const hex95opacity = addOpacityToHex(0.95);

const getColor = (color: keyof typeof theme.colors) =>
  theme.colors[color].value;

const cardStyle = css({
  borderRadius: '$medium',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '$xxl $medium',
  position: 'relative',
  height: 264,
  width: 320,
  gap: '$medium',

  '& a::before': {
    content: ' ',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  '@medium': {
    borderRadius: '$large',
    height: 320,
    width: 480,
    gap: '$large',
    padding: '$xxl',
  },
  '@large': {
    width: 528,
  },
  '@xl': {
    width: 576,
  },
});

export const Card = styled('div', cardStyle, {
  backgroundColor: '$$color',
  translate: '-$space$large $space$small',

  '@small': {
    translate: '0 $space$large',
  },
});

export const CardAside = styled('div', cardStyle, {
  backgroundColor: '$black',
  boxShadow: '0 0 0 100vmax $black',
  clipPath: 'inset(0 -100vmax)',
  isolation: 'isolate',
  mixBlendMode: 'multiply',
  translate: '$space$xs -$space$small',

  '@small': {
    boxShadow: 'unset',
    clipPath: 'unset',
    translate: '0 -$space$large',
    position: 'absolute',
  },
});

export const CardWrapper = styled(Grid.Item, {
  display: 'flex !important',
  flexDirection: 'column-reverse',

  '@small': {
    position: 'relative',
    display: 'flex !important',
    flexDirection: 'row',
    [CardAside.toString()]: {
      right: 0,
    },
  },

  variants: {
    cardTheme: {
      green: {
        $$color: hex95opacity(getColor('green')),
        [Card.toString()]: {
          mixBlendMode: 'normal',
        },
      },
      citron: {
        $$color: hex95opacity(getColor('citron')),
      },
      blue: {
        $$color: hex95opacity(getColor('blue')),
        [Card.toString()]: {
          mixBlendMode: 'normal',
        },
      },
      tan: {
        $$color: hex95opacity(getColor('tan')),
      },
    },
  },
});

export const CtaButtonWrapper = styled('div', {
  alignSelf: 'center',
  marginBlockStart: 'auto',
});
