import { styled, theme } from '../../styles';
import { addOpacityToHex } from '../../utils/styles';
import Grid from '../Grid';
import Section from '../Section';
import Statistics from '../Typography/Statistics';

export const SectionWrapper = styled(Section, {
  paddingInline: '$large',
});

/**
 * Card Styles
 */

const hex80opacity = addOpacityToHex(0.8);

const getColor = (color: keyof typeof theme.colors) =>
  theme.colors[color].value;

export const CardContent = styled('div', {
  backgroundColor: '$$color',
  paddingTop: '$large',
  paddingBottom: '$xxl',
  boxShadow: '0 0 0 100vmax $$color',
  clipPath: 'inset(0 -100vmax)',
  '@small': {
    alignItems: 'center',
    boxShadow: 'unset',
    clipPath: 'unset',
    borderRadius: '$medium',
    padding: '$medium $large',
    height: 246,
    width: 384,
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 64px)',
  },
  '@medium': {
    gridTemplateColumns: 'repeat(9, 64px)',
    height: 416,
    width: 704,
    padding: '$xxxl $xxl',
    borderRadius: '$large',
  },
  '@large': {
    width: 768,
  },
  '@xl': {
    width: 832,
  },
});

export const CardContentText = styled('div', {
  width: '100%',
  '@small': {
    gridColumn: 'span 4',
    maxWidth: 272,
  },
  '@medium': {
    gridColumn: 'span 6',
    maxWidth: 384,
  },
  '@large': {
    width: 448,
    maxWidth: 448,
  },
});

export const CardHighlight = styled('div', {
  color: '$black',
  textAlign: 'center',
  padding: '$large $medium',
  position: 'relative',
  isolation: 'isolate',
  borderRadius: '$medium',
  backgroundColor: '$$hiColor',
  translate: '0px -24px',
  mixBlendMode: 'multiply',
  '@small': {
    padding: '$xxl $large',
    translate: '0px 0px',
    height: 198,
    width: 304,
    position: 'absolute',
  },
  '@medium': {
    height: 320,
    width: 464,
    padding: '$xxxl $xxl',
    borderRadius: '$large',
  },
  '@large': {
    width: 504,
  },
  '@xl': {
    width: 514,
  },
});

export const StatisticsHighlight = styled(Statistics, {
  borderBottom: '2px solid',
  marginBottom: '$small',
  '@medium': {
    marginBottom: '$large',
  },
});
export const CardWrapper = styled(Grid.Item, {
  variants: {
    overlap: {
      true: {
        '@small': {
          position: 'relative',
          display: 'flex !important',
          alignItems: 'center',
          '&:nth-of-type(odd)': {
            flexDirection: 'row-reverse',
            [CardHighlight.toString()]: {
              left: 0,
            },
            [CardContentText.toString()]: {
              gridColumn: '2 / -1',
              '@medium': {
                gridColumn: '4 / -1',
                marginLeft: 31,
              },
            },
          },
          '&:nth-of-type(even)': {
            [CardHighlight.toString()]: {
              right: 0,
            },
          },
        },
      },
      false: {
        padding: '$xl $large',
        borderRadius: '$medium',
        textAlign: 'center',

        '@medium': {
          padding: '$xxl $large',
          borderRadius: '$large',
        },

        backgroundColor: '$$color',
        '&:nth-of-type(even)': {
          backgroundColor: '$$hiColor',
          color: '$black',
        },
      },
    },
    cardTheme: {
      green: {
        $$color: getColor('green'),
        $$hiColor: hex80opacity(getColor('citron')),
        [CardHighlight.toString()]: {
          mixBlendMode: 'normal',
        },
      },
      citron: {
        $$color: getColor('citron'),
        $$hiColor: hex80opacity(getColor('green')),
      },
      blue: {
        $$color: getColor('blue'),
        $$hiColor: hex80opacity(getColor('citron')),
        color: '$cream',
        [CardHighlight.toString()]: {
          mixBlendMode: 'normal',
        },
      },
      tan: {
        $$color: getColor('tan'),
        $$hiColor: hex80opacity(getColor('green')),
      },
    },
  },
});
