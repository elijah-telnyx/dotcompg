import { useFormBlock, useStreamEvent } from 'components/InferenceDemo/hooks';
import { getAiResponse, type AIMessage, type ChatCompletionsApiParams } from 'services/telnyxApiService';
import type { InferenceDemoValues } from '../InferenceDemo';
import { useState } from 'react';
import { MAXIMUM_REQUESTS } from '../utils/constants';

export const useInferenceDemo = ({ initialValues }: { initialValues: InferenceDemoValues }) => {
  const [settings, setSettings] = useState<InferenceDemoValues>(initialValues);
  const [messages, setMessages] = useState<AIMessage[]>(initialValues.messages ?? []);
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

  const addMessage = (messageText: string) => {
    if (requestStatus === 'pending' || requestStatus === 'streaming') return;

    const message: AIMessage = { role: currentRole, content: messageText };
    const currentMessages = messages.concat(message);
    setMessages(currentMessages);
    return currentMessages;
  };

  const sendMessage = (messageText: string) => {
    if (isBlocked || requestStatus === 'pending' || requestStatus === 'streaming') return;

    const currentMessages = messageText ? addMessage(messageText) : messages;

    const formData: ChatCompletionsApiParams = {
      maxTokens: String(initialValues.maxTokens),
      temperature: String(settings.temperature),
      systemPrompt: settings.prompt,
      model: settings.aiModel,
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
  const isFormDisabled = requestStatus === 'pending' || requestStatus === 'streaming' || isBlocked;

  return {
    isFormDisabled,
    messages,
    sendMessage,
    isInitiallyBlocked,
    updateSettings: (newData: Partial<InferenceDemoValues>) =>
      setSettings((currentData) => ({ ...currentData, ...newData })),
    settings,
    errorMessage,
    isBlocked,
  };
};
