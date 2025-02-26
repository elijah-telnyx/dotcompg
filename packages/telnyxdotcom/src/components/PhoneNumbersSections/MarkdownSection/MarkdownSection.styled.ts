import { styled } from 'ui/styles';
import Grid from 'ui/components/Grid';

export const Container = styled(Grid.Container, {
  rowGap: '$large',

  '@small': {
    rowGap: '$xl',
  },

  '@medium': {
    rowGap: '$huge',
  },
});

export const MarkdownWrapper = styled('div', {
  position: 'relative',
  borderRadius: '$medium',
  backgroundColor: '$citron',
  padding: '$large $xl $xxl $xl',
  overflow: 'auto',
  maxHeight: '380px',
  '@medium': {
    maxHeight: '500px',
  },
});

export const Content = styled('div', {
  position: 'relative',
});

export const FadeOverlay = styled('div', {
  position: 'absolute',
  height: '64px',
  width: 'calc(100% - 2rem)',
  bottom: 0,
  left: '1rem',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, $citron 100%)',
  zIndex: 1,
});

export const Item = styled(Grid.Item, {
  '@medium': {
    alignContent: 'center',
  },
});
