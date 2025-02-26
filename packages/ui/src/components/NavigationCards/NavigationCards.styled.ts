import { styled } from '../../styles';
import { addOpacityToHex, getColor } from '../../utils/styles';
import Grid from '../Grid';
import Heading from '../Typography/Heading';
import { Base } from '../Typography/utils';

const hex95opacity = addOpacityToHex(0.95);
export const Wrapper = styled('div', {});

export const NavigationCardItemLinkContainer = styled('div', {
  marginTop: '$xs',
  marginBottom: '$xs',
  borderRadius: '$medium',
  padding: '$large',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'background-color 0.2s ease-out',

  '@xs': {
    padding: '$medium',
  },
  '@small': {
    padding: '$medium',
  },

  variants: {
    backgroundColor: {
      green: {
        backgroundColor: hex95opacity(getColor('green')),
        '&:hover': {
          backgroundColor: '$greenCardHoverState',
        },
      },
      citron: {
        backgroundColor: hex95opacity(getColor('citron')),
        '&:hover': {
          backgroundColor: '$citronCardHoverState',
        },
      },
      blue: {
        backgroundColor: hex95opacity(getColor('blue')),
        '&:hover': {
          backgroundColor: '$blueCardHoverState',
        },
      },
      tan: {
        backgroundColor: hex95opacity(getColor('tan')),
        '&:hover': {
          backgroundColor: '$tanCardHoverState',
        },
      },
    },
  },
});

const NavigationCardItemLinkBoxSpacing = '$xs';
export const NavigationCardItemsContainer = styled('div', {
  marginTop: '$medium',
  marginBottom: `$xl - ${NavigationCardItemLinkBoxSpacing}`,
});

export const NavigationCardsGridItem = styled(Grid.Item, {
  marginBottom: '$huge',

  '@xs': {
    marginBottom: '$xxl',
  },
  '@small': {
    marginBottom: '$xxl',
  },
});

export const SubHeading = styled(Heading, {
  marginTop: '$xxl',
  marginBottom: '$small',

  '@xs': {
    marginTop: '$xl',
  },
  '@small': {
    marginTop: '$xl',
  },
});

export const ArrowIconWrapper = styled(Base('div'), {
  display: 'inline-block',
  transition: 'transform 0.5s ease-out',
  transform: `translate(-4px, 0px)`,
});

export const Link = styled(Base('a'), {
  [`&:hover ${ArrowIconWrapper}`]: {
    transform: `translate(0px, 0px)`,
  },
});
