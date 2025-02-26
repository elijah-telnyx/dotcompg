import type { ComponentProps } from '@stitches/react';
import { styled, theme } from '../../../../styles';
import { addOpacityToHex } from '../../../../utils/styles';
import {
  InferenceChatBubbleContent,
  type InferenceChatBubbleContentProps,
} from './InferenceChatBubbleContent';
import CopyButton from '../../../CopyButton';

export type InferenceChatBubbleProps = Omit<
  ComponentProps<typeof ChatBubble>,
  'children'
> &
  InferenceChatBubbleContentProps;

export const ChatBubble = styled('div', {
  position: 'relative',
  padding: '$small $medium',
  borderRadius: '$medium',
  maxWidth: '70%',
  width: 'fit-content',
  marginBottom: '$large',
  transition: 'transform 0.2s ease',
  color: '$grayHoverLightBackground',
  typography: '$p.mobile',
  '@medium': {
    typography: '$p',
    maxWidth: '50%',
  },

  variants: {
    variant: {
      sender: {
        backgroundColor: addOpacityToHex(0.2)(theme.colors.tan.value),
        marginLeft: 'auto',
      },
      receiver: {
        marginRight: 'auto',
      },
    },
  },

  defaultVariants: {
    variant: 'receiver',
  },
});

const CopyButtonWrapper = styled('div', {
  position: 'absolute',
  left: '$medium',
  bottom: '-$medium',

  '@lessThanMedium': {
    svg: {
      height: 16,
      width: 16,
    },
  },

  '@medium': {
    bottom: '-$large',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    '*:hover > &': {
      opacity: 1,
    },
  },
});

export function InferenceChatBubble({
  children,
  variant,
  ...props
}: InferenceChatBubbleProps) {
  return (
    <ChatBubble {...props} variant={variant}>
      <InferenceChatBubbleContent>{children}</InferenceChatBubbleContent>
      {variant === 'receiver' && (
        <CopyButtonWrapper>
          <CopyButton copy={children} buttonTextPosition='right' />
        </CopyButtonWrapper>
      )}
    </ChatBubble>
  );
}
