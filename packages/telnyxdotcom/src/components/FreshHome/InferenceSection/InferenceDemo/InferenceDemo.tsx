import { useEffect, useState } from 'react';
import { type AIMessage } from 'services/telnyxApiService';
import * as Inference from 'ui/components/Inference';
import Heading from 'ui/components/Typography/Heading';
import Label from 'ui/components/Typography/Label';

import {
  AdvancedSettingsForm,
  type AdvancedSettingsFormValues,
} from 'components/FreshHome/InferenceSection/InferenceDemo/components/AdvancedSettingsForm';
import { MessageInput } from 'components/FreshHome/InferenceSection/InferenceDemo/components/MessageInput';
import { Checkmark } from 'ui/components/Icons';
import Link from 'ui/components/Link';
import { config, keyframes, styled } from 'ui/styles';
import { useInferenceDemo } from './hooks/useInferenceDemo';
import { DEFAULT_VALUES, SUGGESTED_TOPICS } from './utils/constants';
import useMedia from 'ui/utils/hooks/useMedia';
import { useLockScroll } from 'ui/utils/hooks/useLockScroll';

export interface InferenceDemoValues {
  aiModel: string;
  temperature: number;
  prompt?: string;
  messages?: AIMessage[];
  maxTokens: number;
}

export interface LlmModel {
  label: string;
  value: string;
}

export interface InferenceDemoProps {
  modelOptions: LlmModel[];
  defaultValues?: InferenceDemoValues;
}

export function InferenceDemo({ modelOptions = [], defaultValues }: InferenceDemoProps) {
  const initialValues = { ...DEFAULT_VALUES, ...defaultValues };

  const { sendMessage, isFormDisabled, messages, settings, updateSettings, isBlocked } = useInferenceDemo({
    initialValues,
  });

  const [isClient, setIsClient] = useState(false);
  const [isAdvancedSettingsMenuOpen, setIsAdvancedSettingsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  const isMobile = useMedia(config.media.lessThanSmall);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLockScroll({ lock: Boolean(isMobile) && isChatOpen });

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsChatOpen(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isChatOpen]);

  function handleSendMessage(messageText: string) {
    setIsChatOpen(true);
    sendMessage(messageText);
  }

  function handleAdvancedSettingsUpdate(newSettings: AdvancedSettingsFormValues) {
    setIsAdvancedSettingsMenuOpen(false);
    updateSettings(newSettings);
    setShowConfirmationMessage(true);
  }

  function handleSwitchModel() {
    setIsAdvancedSettingsMenuOpen(true);
  }

  return (
    <Inference.Root
      modal={Boolean(isMobile) && isChatOpen}
      css={
        isChatOpen
          ? {
              '@lessThanSmall': {
                borderRadius: '0px',
                maxHeight: '100vh',
              },
            }
          : {
              '@small': {
                maxHeight: 631,
              },
            }
      }
    >
      {isClient && (
        <AdvancedSettingsFormContainer>
          {showConfirmationMessage && (
            <ConfirmationMessage onAnimationEnd={() => setShowConfirmationMessage(false)}>
              <SuccessMessageIcon /> Success! Your controls have been set.
            </ConfirmationMessage>
          )}
          {isChatOpen && !showConfirmationMessage && (
            <div>
              <Box
                css={{
                  '@lessThanSmall': {
                    display: 'none',
                  },
                }}
              >
                Model {settings.aiModel} selected{' '}
                <LinkButton htmlAs='button' onClick={handleSwitchModel}>
                  Switch model
                </LinkButton>
              </Box>

              <LinkButton
                htmlAs='button'
                onClick={() => setIsChatOpen(false)}
                css={{
                  '@small': {
                    display: 'none',
                  },
                }}
              >
                Close chat
              </LinkButton>
            </div>
          )}
          <AdvancedSettingsForm
            showTooltipOnHover={!isChatOpen}
            isOpen={isAdvancedSettingsMenuOpen}
            onOpenChange={setIsAdvancedSettingsMenuOpen}
            modelOptions={modelOptions}
            isFormDisabled={isFormDisabled}
            initialValues={settings}
            onSubmit={handleAdvancedSettingsUpdate}
          />
        </AdvancedSettingsFormContainer>
      )}
      {isChatOpen ? (
        <ChatWrapper>
          <Inference.ChatContainer>
            {messages?.map((message) => {
              return (
                <Inference.ChatBubble variant={message.role === 'user' ? 'sender' : 'receiver'} key={message.id}>
                  {message.content}
                </Inference.ChatBubble>
              );
            })}
            {isBlocked && <Inference.ChatBubble variant='sender'>{BlockedMessage.content}</Inference.ChatBubble>}
          </Inference.ChatContainer>

          <ChatBottomContainer>
            <MessageInputContainer>
              <MessageInput onMessage={handleSendMessage} disabled={isFormDisabled} />
            </MessageInputContainer>

            <LinkButton
              htmlAs='button'
              onClick={() => setIsChatOpen(false)}
              css={{
                '@lessThanSmall': {
                  display: 'none',
                },
              }}
            >
              Close chat
            </LinkButton>
          </ChatBottomContainer>
        </ChatWrapper>
      ) : (
        <InitialMessageInputContainer>
          <Heading level={3}>What can I help with?</Heading>
          <MessageInputContainer>
            <MessageInput onMessage={handleSendMessage} />
            <LinkButton htmlAs='button' onClick={handleSwitchModel}>
              Choose model
            </LinkButton>
          </MessageInputContainer>

          <SuggestedTopicsLabel>Suggested topics</SuggestedTopicsLabel>
          <SuggestedTopicsContainer>
            {SUGGESTED_TOPICS.map((label) => (
              <Inference.SuggestionButton key={label} onClick={() => handleSendMessage(label)}>
                {label}
              </Inference.SuggestionButton>
            ))}
          </SuggestedTopicsContainer>
        </InitialMessageInputContainer>
      )}
    </Inference.Root>
  );
}

const LinkButton = styled(Link);

const MessageInputContainer = styled('div', {
  marginInline: 'auto',
  width: '100%',
});

const InitialMessageInputContainer = styled('div', {
  width: '100%',
  textAlign: 'center',
  paddingTop: '$xxxl',
  overflow: 'hidden',

  '@small': {
    paddingTop: 156,
    paddingBottom: 'calc(156px - $large)', //reduce padding bottom to account for the chat container height
  },
  [`& ${LinkButton}`]: {
    '@lessThanMedium': {
      display: 'none',
    },
  },
  [`& ${MessageInputContainer}`]: {
    position: 'relative',
    display: 'grid',
    gap: '$large',
    width: 'fit-content',
    textWrap: 'nowrap',
    placeItems: 'center',
    marginBlock: '$xs $xxxl',
    '@lessThanSmall': {
      maxWidth: 454,
      width: '100%',
      paddingInline: '$small',
    },
    '@small': {
      gridTemplateColumns: '454px',
      marginBlock: '$xl',
      [`& > button`]: {
        position: 'absolute',
        left: '100%',
        marginLeft: '$large',
      },
    },
  },
});

const ChatBottomContainer = styled('div', {
  [`& ${MessageInputContainer}`]: {
    marginBottom: '$xl',
  },
});

const ChatWrapper = styled('div', {
  display: 'grid',
  gridTemplateRows: '65vh auto',
  gap: '$xl',
  width: '100%',
  '@small': {
    gridTemplateRows: '399px auto',
  },
});

const SuggestedTopicsLabel = styled(Label, {
  marginTop: '$large',
  marginBottom: '$xs',
  display: 'block',
  '@small': {
    marginBottom: '$xxs', // gap + margin should be 12px
  },
});

const SuggestedTopicsContainer = styled('div', {
  gap: '$xs',

  overflow: 'auto',
  maxWidth: '100%',
  display: 'flex',
  '@lessThanSmall': {
    maxWidth: '100%',
  },

  '@small': {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

const AdvancedSettingsFormContainer = styled('div', {
  justifySelf: 'right',
  display: 'flex',
  alignItems: 'center',
  gap: '$large',
});

const ConfirmationMessageFadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '20%': {
    opacity: 1,
  },
  '50%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

const ConfirmationMessage = styled('div', {
  position: 'absolute',
  top: 38,
  translate: '-50%',
  left: '50%',
  textWrap: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '$xs',
  animation: `${ConfirmationMessageFadeIn} 2.5s ease-out forwards`,
});

const SuccessMessageIcon = styled(Checkmark, {
  backgroundColor: '$green',
  borderRadius: '50%',
  padding: '$xxs',
  height: 20,
  width: 20,
});

const BlockedMessage = {
  role: 'user',
  content: `You’ve reached the maximum trial chats. To continue chatting, please sign up for a free account on our Telnyx Mission Control Portal [here](/sign-up).`,
  id: 'blocked-message',
};

const Box = styled('div');
