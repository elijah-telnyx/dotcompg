import useSessionStorage from 'hooks/useSessionStorage';
import { useEffect, useRef, useState } from 'react';
import { errorLogger } from 'utils/errorHandler/errorLogger';

export const REQUEST_STATUS = {
  idle: 'idle',
  pending: 'pending',
  streaming: 'streaming',
  error: 'error',
  success: 'success',
} as const;

export type REQUEST_STATUS = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];

export const useFormBlock = ({
  requestStatus,
  maximumRequests = 2,
}: {
  requestStatus: REQUEST_STATUS;
  maximumRequests?: number;
}) => {
  const [submitRequests, setSubmitRequests] = useState(0);
  const [sessionBlock, setSessionBlock] = useSessionStorage('isBlocked', false);

  // controls if the page is accessed by a "blocked" user
  // so it shows a custom message on page load but not when the user gets blocked
  const isInitiallyBlocked = useRef<boolean>(sessionBlock);

  const isBlocked = submitRequests >= maximumRequests || sessionBlock;

  useEffect(() => {
    /**
     * safer in useEffect than on a successful submit, because the user can remove the disable from the button
     * and spam it to get unblocked
     */
    if (requestStatus === 'success' && !isBlocked) {
      setSubmitRequests((submitRequests) => submitRequests + 1);
    }
    if (isBlocked) {
      setSessionBlock(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlocked, requestStatus]);

  return {
    isBlocked,
    isInitiallyBlocked,
    blockForm: () => {
      setSubmitRequests(maximumRequests * 100);
    },
  };
};

/**
 * Parses the stream value and returns an array of parsed data objects.
 * If the stream value contains errors, it throws an error with the first error message.
 *
 * @param streamValue - The stream value to parse.
 * @returns An array of parsed data objects.
 * @throws Error if the stream value contains errors.
 */
const parseStreamValue = (streamValue: string) => {
  if (JSON.stringify(streamValue).includes('\\"errors\\": [')) {
    const { errors } = JSON.parse(streamValue);
    throw new Error(`Error: ${errors[0]?.title}. ${errors[0]?.detail}`);
  }

  const chunks = streamValue.trim().split('\n\n');

  return chunks.map((chunk) => {
    const jsonString = chunk.replace('data: ', '');
    const data = JSON.parse(jsonString);
    return data;
  });
};

interface useStreamEventProps {
  onStream: (
    data: string,
    { isDone, reader }: { isDone: boolean; reader: ReadableStreamDefaultReader<string> }
  ) => void;
  isBlocked?: boolean;
}

export const useStreamEvent = ({ onStream }: useStreamEventProps) => {
  const [requestStatus, setRequestStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.idle);
  const run = async (cb: () => Promise<{ body: ReadableStream<Uint8Array>; status: 429 | 200 }>) => {
    setRequestStatus(REQUEST_STATUS.pending);
    try {
      const response = await cb();

      if (response?.status === 429) {
        setRequestStatus(REQUEST_STATUS.error);
        throw new Error('Too many requests');
      }

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

      let streamDone = false;
      let botResponse = '';

      while (!streamDone) {
        setRequestStatus(REQUEST_STATUS.streaming);

        // read streaming response
        const { value, done } = await reader.read();

        if (done || value?.includes('[DONE]')) {
          streamDone = true;
          setRequestStatus(REQUEST_STATUS.success);
          return;
        }

        // parse streaming response
        const parsedValue = parseStreamValue(value);

        // used to get the bot response while not finished
        let streamingBotResponse = '';

        // only adds non-null values
        parsedValue.forEach((data) => {
          const messageContent = data.choices[0].delta.content;
          if (messageContent !== null) streamingBotResponse += messageContent;
        });

        // concat current response with the streaming one while not finished
        botResponse += streamingBotResponse;

        onStream(botResponse, { isDone: streamDone, reader });
      }
    } catch (error) {
      setRequestStatus(REQUEST_STATUS.error);
      if (error instanceof Error) errorLogger({ error, url: 'InferenceDemo.tsx' });
      if (typeof error === 'object' && error !== null && 'errors' in error && Array.isArray(error.errors)) {
        const { errors } = error;
        const mainError = errors[0];
        errorLogger({
          error: {
            name: mainError.title,
            message: mainError.detail,
          },
          data: { errors },
          url: 'InferenceDemo.tsx',
        });
      }
      throw Error('There was an error with your request, please try again');
    }
  };

  return { requestStatus, run };
};
