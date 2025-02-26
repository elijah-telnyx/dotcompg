import * as Tabs from '@radix-ui/react-tabs';
import H from '../Typography/Heading';
import { keyframes, styled, theme } from '../../styles';
import Grid from '../Grid';

export const Container = styled(Grid.Container, {
  '@lessThanSmall': {
    maxWidth: '100%',
  },
});

export const TabsContainer = styled(Tabs.Root, {});

export const TriggersContainer = styled(Tabs.List, {
  display: 'grid',
  gridTemplateColumns: 'repeat($$numberOfItems, 1fr)',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '-ms-overflow-style': 'none' /* IE and Edge */,
  scrollbarWidth: 'none',
});

export const Trigger = styled(Tabs.Trigger, {
  typography: '$cta.mobile',
  padding: '$medium $small',
  whiteSpace: 'nowrap',
  '@medium': {
    typography: '$cta',
  },
  textAlign: 'center',
  color: '$black',
  borderBottom: '2px solid',
  borderColor: '$black',
  '&[data-state="active"]': {
    borderTop: '2px solid',
    borderBottom: '2px solid transparent',
    borderRadius: '$medium $medium 0 0',
    '&:not(:first-child)': {
      borderLeft: '2px solid',
    },
    '&:not(:last-of-type)': {
      borderRight: '2px solid',
    },
    '&:first-child': {
      borderTopLeftRadius: '0',
    },
    '&:last-of-type': {
      borderTopRightRadius: '0',
    },
  },
  '&:hover:not([data-state="active"])': {
    color: '$grayHoverLightBackground',
  },

  variants: {
    dark: {
      true: {
        color: '$cream',
        borderColor: '$cream',
        '&:hover:not([data-state="active"])': {
          color: '$grayHoverDarkBackground',
        },
      },
    },
  },
});

const fade = keyframes({
  to: {
    opacity: 1,
  },
});

export const Content = styled(Tabs.Content, {
  opacity: 0,
  animation: `${fade} 0.5s ease-in forwards`,
});

export const Heading = styled(H, {
  '@lessThanSmall': {
    margin: '0 auto $large',
    maxWidth: theme.gridMaxWidth.base.value,
  },

  marginBottom: '$large',
});

export const TabsWithMarkdownContentWrapper = styled('div', {
  display: 'grid',
  rowGap: '$large',
});
