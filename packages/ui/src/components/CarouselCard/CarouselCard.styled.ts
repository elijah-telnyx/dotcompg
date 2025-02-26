import { styled } from '../../styles';
import Media from '../Media';
import H from '../Typography/Heading';

export const Wrapper = styled('div', {});

export const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: '$medium',
  '@medium': { gap: '$large' },
});

const interactiveWrapperSelector = `${CardWrapper}[data-is-interactive="true"]:not(:disabled)`;

export const Heading = styled(H, {
  width: 'fit-content',
  [`${interactiveWrapperSelector}:hover &`]: {
    textDecoration: 'underline',
  },
  variants: {
    dark: {
      true: {
        color: '$cream',
        [`${interactiveWrapperSelector}:hover &`]: {
          color: '$citron',
        },
      },
      false: {
        [`${interactiveWrapperSelector}:hover &`]: {
          color: '$blue',
        },
      },
    },
  },
});

export const BaseCardMediaWrapper = styled('div', {
  borderRadius: '$medium',
  position: 'relative',
  overflow: 'hidden',

  '@small': {
    borderRadius: '$semilarge',
  },
  '@medium': {
    borderRadius: '$large',
  },
});

export const BaseCardMedia = styled(Media, {
  aspectRatio: '16/9',
  transition: 'transform 600ms ease 0ms',
  transformOrigin: 'left bottom',
  [`${interactiveWrapperSelector}:hover &`]: {
    transform: 'scale(1.2)',
  },
  width: '100%',
  height: '100%',
  objectPosition: 'center',
});

export const AuthorWrapper = styled('div', {
  marginTop: 'auto',
});
