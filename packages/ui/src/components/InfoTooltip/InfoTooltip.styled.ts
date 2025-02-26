import { styled } from '../../styles';
import * as ReactPopover from '@radix-ui/react-popover';

export const Trigger = styled(ReactPopover.Trigger, {
  height: '20px', // match icon

  variants: {
    color: {
      black: {
        color: '$black',
      },
      blue: {
        color: '$blue',
      },
      citron: {
        color: '$citron',
      },
      cream: {
        color: '$cream',
      },
      green: {
        color: '$green',
      },
      tan: {
        color: '$tan',
      },
    },
  },
});

export const Content = styled(ReactPopover.Content, {
  backgroundColor: '$cream',
  borderRadius: '$medium',
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.12))',
  padding: '$large',
  maxWidth: 352,
});

export const Arrow = styled(ReactPopover.Arrow, {
  fill: '$cream',
});
