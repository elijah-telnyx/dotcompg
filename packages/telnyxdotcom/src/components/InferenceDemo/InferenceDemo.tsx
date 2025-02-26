import Section, { type SectionProps } from 'ui/components/Section';
import SectionHeader, { type SectionHeaderProps } from 'ui/components/Section/SectionHeader';
import Select from 'ui/components/ComboBox';
import Tooltip, { TooltipIcon } from 'ui/components/Tooltip';
import * as css from './InferenceDemo.styles';

import { Fragment, useRef, useState, type ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getAiResponse, type AIMessage } from 'services/telnyxApiService';
import Slider from 'ui/components/Input/Slider';

import Link from 'next/link';
import Loading from 'ui/components/Icons/Loading';
import Chat from './Chat';
import dynamic from 'next/dynamic';
import Prompt from './Prompt';
import { useFormBlock, useStreamEvent } from './hooks';
import { FieldHeight } from './Chat/Chat.styles';
import Grid from 'ui/components/Grid';
import Dialog from 'ui/components/Dialog';
import useMedia from 'ui/utils/hooks/useMedia';
import { config } from 'ui/styles';
import VisuallyHidden from 'ui/components/VisuallyHidden';

/**
 * When the user loads the page we check on the session storage to know if the user is blocked
 * if it is we show a message to the user.
 * We only want this message to appears when the user access the page already blocked
 * and not when it gets blocked while using the page.
 *
 * the below code prevents hydration error as it will runs only on the client side
 */
const ChatRoot = dynamic(
  () =>
    import('./Chat').then((comp) => {
      return comp.default.Root;
    }),
  {
    ssr: false,
  }
);

export interface InferenceDemoValues {
  aiModel: string;
  temperature: number;
  prompt?: string;
  messages?: AIMessage[];
  maxTokens: number;
}

export interface InferenceDemoProps extends SectionProps, SectionHeaderProps {
  modelOptions: { label: string; value: string }[];
  defaultValues?: InferenceDemoValues;
}

const DEFAULT_VALUES: Required<InferenceDemoValues> = {
  aiModel: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
  temperature: 0.9,
  messages: [],
  prompt: '',
  maxTokens: 1000,
};

export const REQUEST_STATUS = {
  idle: 'idle',
  pending: 'pending',
  streaming: 'streaming',
  error: 'error',
  success: 'success',
} as const;

export type REQUEST_STATUS = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];
const MAXIMUM_REQUESTS = 7;

export interface InferenceDemoFormProps extends Pick<InferenceDemoProps, 'modelOptions' | 'defaultValues'> {
  backgroundColor?: 'white';
  embed?: boolean;
  hero?: boolean;
}

export const InferenceDemoForm = ({
  modelOptions,
  defaultValues,
  backgroundColor,
  embed,
  hero,
}: InferenceDemoFormProps) => {
  const initialValues = { ...DEFAULT_VALUES, ...defaultValues };

  const { register, handleSubmit, control } = useForm({
    criteriaMode: 'all',
    defaultValues: initialValues,
  });
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>(initialValues.messages);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { requestStatus, run } = useStreamEvent({
    onStream: (botResponse, { reader }) => {
      if (isBlocked) {
        reader.cancel();
        throw new Error('Please register to continue using the service.');
      }

      setMessages((currentMessages) => {
        const lastMessage = currentMessages.at(-1);
        if (lastMessage === undefined) return currentMessages;
        const botMessage: AIMessage = { role: 'assistant', content: botResponse };
        // hack to keep the bot response in the same message instead of creating a new one on each stream update
        if (botResponse.startsWith(lastMessage.content)) {
          return currentMessages.slice(0, -1).concat(botMessage);
        }
        return currentMessages.concat(botMessage);
      });
    },
  });

  const { isBlocked, isInitiallyBlocked } = useFormBlock({ requestStatus, maximumRequests: MAXIMUM_REQUESTS });

  const addMessage = () => {
    if (requestStatus === 'pending' || requestStatus === 'streaming') return;

    const message: AIMessage = { role: currentRole, content: messageInput };
    const currentMessages = messages.concat(message);
    setMessages(currentMessages);
    setMessageInput('');
    if (messageInputRef.current !== null) messageInputRef.current.style.height = FieldHeight + 'px';
    return currentMessages;
  };

  const adjustHeight = () => {
    const textarea = messageInputRef.current;
    if (!textarea) return;
    textarea.style.height = FieldHeight + 'px';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleEnterKeyOnMessageInput = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }
      event.preventDefault();
      const canAddMessage = messageInput.trim().length !== 0 && !isFormDisabled;
      if (canAddMessage) addMessage();
    }
  };

  const sendQuestion = async (data: InferenceDemoValues) => {
    if (isBlocked || requestStatus === 'pending' || requestStatus === 'streaming') return;
    const currentMessages = messageInput ? addMessage() : messages;

    const formData = {
      ...data,
      maxTokens: String(initialValues.maxTokens),
      temperature: String(Array.isArray(data.temperature) ? data.temperature?.at(-1) : initialValues.temperature),
      systemPrompt: data.prompt,
      model: data.aiModel,
      messages: currentMessages,
    };

    try {
      setErrorMessage('');
      run(() => getAiResponse(formData)).catch((error) => {
        if (error instanceof Error) setErrorMessage(error.message);
      });
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const currentRole = messages?.at(-1)?.role === 'user' ? 'assistant' : 'user';
  const isFormDisabled = requestStatus === 'pending' || requestStatus === 'streaming';

  const isMobile = useMedia(config.media.lessThanMedium, true);
  const ChatWrapper = isMobile ? Dialog.Content : css.ChatContainer;
  const chatWrapperProps = isMobile ? { Portal: Fragment } : { xs: 4, small: 8, medium: 7, backgroundColor };

  return (
    <Dialog.Root>
      <css.FormWrapper
        onSubmit={handleSubmit(sendQuestion)}
        backgroundColor={backgroundColor}
        embed={embed}
        hero={hero}
      >
        <css.AiSettingsContainer xs={4} small={8} medium={5} embed={embed}>
          <css.ModelInputWrapper>
            <css.Label>Model (Required)</css.Label>
            <Controller
              control={control}
              name='aiModel'
              render={({ field: { onChange, ref, ...fieldProps } }) => {
                return (
                  <css.SelectWrapper>
                    <Select
                      placeholder=''
                      onSelect={(option) => onChange(option.value)}
                      {...fieldProps}
                      disabled={isFormDisabled}
                      theme='dark'
                      options={modelOptions}
                    />
                  </css.SelectWrapper>
                );
              }}
            ></Controller>
          </css.ModelInputWrapper>

          <css.TemperatureInputWrapper>
            <css.Label id='temperature'>
              Temperature
              <Tooltip
                content='Higher values will make the output more random, while lower values will make it more focused and
            deterministic.'
              >
                <TooltipIcon />
              </Tooltip>
            </css.Label>

            <Controller
              control={control}
              name='temperature'
              render={({ field }) => {
                return (
                  <Slider
                    id='temperature-slider'
                    defaultValue={[0.9]}
                    describedBy='temperature'
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={field.onChange}
                    {...field}
                    ref={null}
                    disabled={isFormDisabled}
                    value={[field.value]}
                    theme='dark'
                  />
                );
              }}
            />
          </css.TemperatureInputWrapper>

          <css.PromptInputWrapper>
            <css.Label>System Prompt</css.Label>
            <Prompt
              placeholder='You are a helpful assistant that summarizes long bodies of text.'
              {...register('prompt')}
              disabled={isFormDisabled}
              theme='dark'
              embed={embed}
              hero={hero}
            />
          </css.PromptInputWrapper>

          <css.DialogTriggerButton as='div' embed={embed}>
            <Dialog.Trigger>Start chatting</Dialog.Trigger>
          </css.DialogTriggerButton>
        </css.AiSettingsContainer>

        <ChatWrapper {...chatWrapperProps}>
          <VisuallyHidden>
            <Dialog.Description>
              Chat with our AI assistant to generate text based on the model you selected. The assistant will generate
              text based on the prompt you provide.
            </Dialog.Description>
          </VisuallyHidden>
          <Dialog.Title asChild>
            <css.Label as='p'>Chat thread</css.Label>
          </Dialog.Title>
          <ChatRoot status={requestStatus} messageCount={messages.length} embed={embed}>
            {messages?.map((message, index) => {
              return (
                <Chat.Message
                  {...message}
                  key={'message-' + index}
                  onDelete={() => {
                    if (isFormDisabled) return;
                    setMessages(messages.filter((_, i) => i !== index));
                  }}
                  disabled={isFormDisabled}
                />
              );
            })}

            {isBlocked ? (
              <>
                {/* Free trial block message */}
                {isInitiallyBlocked.current && (
                  <css.Text>We&apos;re glad you&apos;re enjoying Telnyx Inference.</css.Text>
                )}
                <Chat.Block>
                  <Link href='/sign-up'>
                    To continue chatting, please sign up for a free account on our Telnyx Mission Control Portal{' '}
                    <css.BlockedMessageLink>here</css.BlockedMessageLink>.
                  </Link>
                </Chat.Block>
              </>
            ) : (
              <Chat.Entry
                inputRef={messageInputRef}
                placeholder='Enter text here'
                role={currentRole}
                addMessage={addMessage}
                onKeyDown={handleEnterKeyOnMessageInput}
                onKeyUp={(event) => {
                  // onKeyUp happens after onKeyDown, we need this so we can add the message before the form is submitted
                  if (event.key === 'Enter' && !event.shiftKey) handleSubmit(sendQuestion)();
                }}
                value={messageInput}
                onChange={(event) => {
                  setMessageInput(event.target.value);
                  adjustHeight();
                }}
                disabled={isFormDisabled}
                backgroundColor={backgroundColor}
              />
            )}

            {!isBlocked && (
              <>
                <SubmitButton requestStatus={requestStatus} disabled={messages.length === 0 && messageInput === ''}>
                  Send
                </SubmitButton>
                <css.Error>{errorMessage}</css.Error>
              </>
            )}
          </ChatRoot>
        </ChatWrapper>
      </css.FormWrapper>
    </Dialog.Root>
  );
};

const InferenceDemo = ({ heading, copy, tagline, modelOptions, defaultValues, ...props }: InferenceDemoProps) => {
  const initialValues = { ...DEFAULT_VALUES, ...defaultValues };

  const { register, handleSubmit, control } = useForm({
    criteriaMode: 'all',
    defaultValues: initialValues,
  });
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>(initialValues.messages);

  const [errorMessage, setErrorMessage] = useState<string>();

  const { requestStatus, run } = useStreamEvent({
    onStream: (botResponse, { reader }) => {
      if (isBlocked) {
        reader.cancel();
        throw new Error('Please register to continue using the service.');
      }

      setMessages((currentMessages) => {
        const lastMessage = currentMessages.at(-1);
        if (lastMessage === undefined) return currentMessages;
        const botMessage: AIMessage = { role: 'assistant', content: botResponse };
        // hack to keep the bot response in the same message instead of creating a new one on each stream update
        if (botResponse.startsWith(lastMessage.content)) {
          return currentMessages.slice(0, -1).concat(botMessage);
        }
        return currentMessages.concat(botMessage);
      });
    },
  });

  const { isBlocked, isInitiallyBlocked } = useFormBlock({ requestStatus, maximumRequests: MAXIMUM_REQUESTS });

  const addMessage = () => {
    if (requestStatus === 'pending' || requestStatus === 'streaming') return;

    const message: AIMessage = { role: currentRole, content: messageInput };
    const currentMessages = messages.concat(message);
    setMessages(currentMessages);
    setMessageInput('');
    if (messageInputRef.current !== null) messageInputRef.current.style.height = FieldHeight + 'px';
    return currentMessages;
  };

  const adjustHeight = () => {
    const textarea = messageInputRef.current;
    if (!textarea) return;
    textarea.style.height = FieldHeight + 'px';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleEnterKeyOnMessageInput = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }
      event.preventDefault();
      const canAddMessage = messageInput.trim().length !== 0 && !isFormDisabled;
      if (canAddMessage) addMessage();
    }
  };

  const sendQuestion = async (data: InferenceDemoValues) => {
    if (isBlocked || requestStatus === 'pending' || requestStatus === 'streaming') return;
    const currentMessages = messageInput ? addMessage() : messages;

    const formData = {
      ...data,
      maxTokens: String(initialValues.maxTokens),
      temperature: String(Array.isArray(data.temperature) ? data.temperature?.at(-1) : initialValues.temperature),
      systemPrompt: data.prompt,
      model: data.aiModel,
      messages: currentMessages,
    };

    try {
      setErrorMessage('');
      run(() => getAiResponse(formData)).catch((error) => {
        if (error instanceof Error) setErrorMessage(error.message);
      });
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const currentRole = messages?.at(-1)?.role === 'user' ? 'assistant' : 'user';
  const isFormDisabled = requestStatus === 'pending' || requestStatus === 'streaming';

  const isMobile = useMedia(config.media.lessThanMedium, true);
  const ChatWrapper = isMobile ? Dialog.Content : css.ChatContainer;
  const chatWrapperProps = isMobile ? { Portal: Fragment } : { xs: 4, small: 8, medium: 7 };

  return (
    <Section
      dynamicBackgroundColor={{
        '@initial': typeof props.backgroundColor === 'string' ? props.backgroundColor : 'black',
        '@medium': typeof props.backgroundColor === 'string' ? props.backgroundColor : 'cream',
      }}
      dynamicSpacingTop={{
        '@initial': typeof props.spacingTop === 'string' ? props.spacingTop : 'contrasting',
      }}
      dynamicSpacingBottom={{
        '@initial': 'none',
        '@medium': typeof props.spacingBottom === 'string' ? props.spacingBottom : 'contrasting',
      }}
      css={{
        // create overlapping effect on mobile
        [`& ${css.FormWrapper}`]: {
          bottom: '-$large',
          position: 'relative',
          marginBottom: '$large',
          marginTop: '-$large',
        },
      }}
    >
      <Grid.Container>
        <Grid.Item xs={4} small={6} medium={8}>
          <SectionHeader
            heading={heading}
            copy={copy}
            tagline={tagline}
            css={{ textAlign: 'left' }}
            isDark={{
              '@initial': 'true',
              '@medium': 'false',
            }}
          />
        </Grid.Item>
      </Grid.Container>

      <Dialog.Root>
        <css.FormWrapper onSubmit={handleSubmit(sendQuestion)}>
          <css.AiSettingsContainer xs={4} small={8} medium={5}>
            <css.ModelInputWrapper>
              <css.Label>Model (Required)</css.Label>
              <Controller
                control={control}
                name='aiModel'
                render={({ field: { onChange, ref, ...fieldProps } }) => {
                  return (
                    <css.SelectWrapper>
                      <Select
                        placeholder=''
                        onSelect={(option) => onChange(option.value)}
                        {...fieldProps}
                        disabled={isFormDisabled}
                        theme={{
                          '@initial': 'light',
                          '@medium': 'dark',
                        }}
                        options={modelOptions}
                      />
                    </css.SelectWrapper>
                  );
                }}
              ></Controller>
            </css.ModelInputWrapper>

            <css.TemperatureInputWrapper>
              <css.Label id='temperature'>
                Temperature
                <Tooltip
                  content='Higher values will make the output more random, while lower values will make it more focused and
                deterministic.'
                >
                  <TooltipIcon />
                </Tooltip>
              </css.Label>

              <Controller
                control={control}
                name='temperature'
                render={({ field }) => {
                  return (
                    <Slider
                      id='temperature-slider'
                      defaultValue={[0.9]}
                      describedBy='temperature'
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={field.onChange}
                      {...field}
                      ref={null}
                      disabled={isFormDisabled}
                      value={[field.value]}
                      theme={{
                        '@initial': 'light',
                        '@medium': 'dark',
                      }}
                    />
                  );
                }}
              />
            </css.TemperatureInputWrapper>

            <css.PromptInputWrapper>
              <css.Label>System Prompt</css.Label>
              <Prompt
                placeholder='You are a helpful assistant that summarizes long bodies of text.'
                {...register('prompt')}
                disabled={isFormDisabled}
                theme={{
                  '@initial': 'light',
                  '@medium': 'dark',
                }}
              />
            </css.PromptInputWrapper>

            <css.DialogTriggerButton as='div'>
              <Dialog.Trigger>Start chatting</Dialog.Trigger>
            </css.DialogTriggerButton>
          </css.AiSettingsContainer>

          <ChatWrapper {...chatWrapperProps}>
            <VisuallyHidden>
              <Dialog.Description>
                Chat with our AI assistant to generate text based on the model you selected. The assistant will generate
                text based on the prompt you provide.
              </Dialog.Description>
            </VisuallyHidden>
            <Dialog.Title asChild>
              <css.Label as='p'>Chat thread</css.Label>
            </Dialog.Title>
            <ChatRoot status={requestStatus} messageCount={messages.length}>
              {messages?.map((message, index) => {
                return (
                  <Chat.Message
                    {...message}
                    key={'message-' + index}
                    onDelete={() => {
                      if (isFormDisabled) return;
                      setMessages(messages.filter((_, i) => i !== index));
                    }}
                    disabled={isFormDisabled}
                  />
                );
              })}

              {isBlocked ? (
                <>
                  {/* Free trial block message */}
                  {isInitiallyBlocked.current && (
                    <css.Text>We&apos;re glad you&apos;re enjoying Telnyx Inference.</css.Text>
                  )}
                  <Chat.Block>
                    <Link href='/sign-up'>
                      To continue chatting, please sign up for a free account on our Telnyx Mission Control Portal{' '}
                      <css.BlockedMessageLink>here</css.BlockedMessageLink>.
                    </Link>
                  </Chat.Block>
                </>
              ) : (
                <Chat.Entry
                  inputRef={messageInputRef}
                  placeholder='Enter text here'
                  role={currentRole}
                  addMessage={addMessage}
                  onKeyDown={handleEnterKeyOnMessageInput}
                  onKeyUp={(event) => {
                    // onKeyUp happens after onKeyDown, we need this so we can add the message before the form is submitted
                    if (event.key === 'Enter' && !event.shiftKey) handleSubmit(sendQuestion)();
                  }}
                  value={messageInput}
                  onChange={(event) => {
                    setMessageInput(event.target.value);
                    adjustHeight();
                  }}
                  disabled={isFormDisabled}
                />
              )}

              {!isBlocked && (
                <>
                  <SubmitButton requestStatus={requestStatus} disabled={messages.length === 0 && messageInput === ''}>
                    Send
                  </SubmitButton>
                  <css.Error>{errorMessage}</css.Error>
                </>
              )}
            </ChatRoot>
          </ChatWrapper>
        </css.FormWrapper>
      </Dialog.Root>
    </Section>
  );
};

export default InferenceDemo;

type SubmitButtonProps = ComponentProps<typeof css.SubmitButton> & {
  requestStatus: REQUEST_STATUS;
};

const SubmitButton = ({ requestStatus, disabled, children, ...props }: SubmitButtonProps) => {
  switch (requestStatus) {
    case 'pending':
      return (
        <css.SubmitButton type='submit' disabled aria-label='Requesting data'>
          <Loading spin />
        </css.SubmitButton>
      );
    case 'streaming':
      return (
        <css.SubmitButton type='submit' disabled aria-label='Streaming data'>
          <Loading spin />
        </css.SubmitButton>
      );
    default:
      return (
        <css.SubmitButton type='submit' disabled={disabled} {...props}>
          {children}
        </css.SubmitButton>
      );
  }
};
