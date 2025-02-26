import type { AIMessage } from 'services/telnyxApiService';
import Markdown from 'ui/components/Markdown';
import * as css from './Chat.styles';
import { useLayoutEffect, useRef, useState, type MouseEvent, type PropsWithChildren, type ReactNode } from 'react';
import TrashIcon from 'ui/components/Icons/Trash';
import VisuallyHidden from 'ui/components/VisuallyHidden';
import { REQUEST_STATUS } from '../InferenceDemo';
import CopyButton from 'ui/components/CopyButton';

export interface RootProps {
  children: ReactNode;
  messageCount: number;
  status?: REQUEST_STATUS;
  embed?: boolean;
}

const Root = ({ children = [], status, messageCount, embed }: RootProps) => {
  const [hasGradient, setHasGradient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottomOfContainer = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  };

  const computeClientContainer = () => {
    const container = containerRef.current;
    if (!container) return;
    const isOnTop = container.scrollTop === 0;
    if (isOnTop) return setHasGradient(false);

    // give some space for the scroll behavior to kick in
    const scrollPadding = 20;
    setHasGradient(container.scrollHeight - scrollPadding > container.clientHeight);
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container?.addEventListener('scroll', computeClientContainer);
    return () => {
      container?.removeEventListener('scroll', computeClientContainer);
    };
  }, []);

  /**
   * required to scroll down when the user adds a new message
   * this won't work with the streaming bot response
   */
  useLayoutEffect(scrollToBottomOfContainer, [messageCount]);

  useLayoutEffect(() => {
    let timerRef: ReturnType<typeof setInterval> | null = null;
    if (status === REQUEST_STATUS.streaming) {
      // keep scrolling to the bottom of the container while it is streaming
      timerRef = setInterval(scrollToBottomOfContainer, 100);
    } else if (timerRef) {
      clearInterval(timerRef);
    }
    return () => {
      if (timerRef) clearInterval(timerRef);
    };
  }, [status]);

  return (
    <css.GradientWrapper showGradient={hasGradient}>
      <css.ChatWrapper ref={containerRef} embed={embed}>
        {children}
      </css.ChatWrapper>
    </css.GradientWrapper>
  );
};
Root.displayName = 'Chat.Root';

export interface MessageProps extends AIMessage {
  onDelete?: () => void;
  disabled?: boolean;
}

const Message = ({ role, content, onDelete, disabled }: MessageProps) => {
  const deleteMessage = (_event: MouseEvent<HTMLButtonElement>) => {
    if (onDelete) onDelete();
  };
  return (
    <css.MessageWrapper>
      <css.Role>{role}</css.Role>
      <css.MarkdownWrapper>
        <Markdown
          noStyles
          options={{
            forceInline: true,
            disableParsingRawHTML: true,
            overrides: {
              code: {
                component: ({ children, ...props }) => {
                  const isCodeBlock = children.trim().split('\n').length > 1;
                  if (isCodeBlock) {
                    return (
                      <css.CodeBlockContent>
                        <css.CopyButtonWrapper>
                          <CopyButton copy={children} isDark />
                        </css.CopyButtonWrapper>
                        <css.CodeWrapper>
                          <css.Code {...props}>{children}</css.Code>
                        </css.CodeWrapper>
                      </css.CodeBlockContent>
                    );
                  }
                  return <css.Code {...props}>{children}</css.Code>;
                },
              },
            },
          }}
        >
          {content}
        </Markdown>
      </css.MarkdownWrapper>
      {onDelete && (
        <css.ExcludeMessageButton type='button' onClick={deleteMessage} disabled={disabled}>
          <VisuallyHidden>Delete message</VisuallyHidden>
          <TrashIcon />
        </css.ExcludeMessageButton>
      )}
    </css.MessageWrapper>
  );
};
Message.displayName = 'Chat.Message';

export type EntryProps = Omit<React.ComponentProps<typeof css.Field>, 'rows' | 'cols'> &
  Pick<AIMessage, 'role'> & {
    addMessage?: () => void;
    value: string;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    backgroundColor?: 'white';
  };

const Entry = ({ role, addMessage, value, inputRef, backgroundColor, ...props }: EntryProps) => {
  const canAddMessage = value.trim().length !== 0 && !props.disabled;

  return (
    <>
      <css.MessageWrapper>
        <css.Role backgroundColor={backgroundColor}>{role}</css.Role>
        <css.Field {...props} ref={inputRef} value={value} />
      </css.MessageWrapper>

      {canAddMessage && (
        <css.AddMessageButton type='button' onClick={addMessage}>
          + Add message
        </css.AddMessageButton>
      )}
    </>
  );
};

Entry.displayName = 'Chat.Entry';

const Block = ({ children }: PropsWithChildren) => {
  return (
    <css.MessageWrapper css={{ borderBottomColor: 'transparent' }}>
      <css.Role>Assistant</css.Role>
      <css.MessageBlock>{children}</css.MessageBlock>
    </css.MessageWrapper>
  );
};
Block.displayName = 'Chat.Block';

const Chat = {
  Root,
  Message,
  Entry,
  Block,
};

export default Chat;
