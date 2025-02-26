// @ts-nocheck
/**
 * @link https://github.com/team-telnyx/frontend/blob/main/packages/customer-portal-app/src/reactApp/common/components/ChatWidget/useChatbot.jsx
 */

import { useEffect, useState } from 'react';

import type * as T from './@types';
import chatbotService from './ChatbotService';
import { EVENTSOURCE_TYPE } from './constants';
import { getTimestamp } from './utils';

/** A custom hook to receive message events from the AI chatbot endpoint */
export const useChatbot = ({ sessionId, userId, messages, setMessages }: any) => {
  const [feedback, setFeedback] = useState<any>(null);
  const [companyDetails, setCompanyDetails] = useState<{
    companyDomain?: string;
    companyName?: string;
    companyConfidence?: string;
  }>({});

  useEffect(() => {
    const unparsedCompanyDetails = window.localStorage.getItem('_6senseCompanyDetails');

    if (unparsedCompanyDetails) {
      const parsedCompanyDetails = JSON.parse(unparsedCompanyDetails);
      setCompanyDetails({
        companyName: parsedCompanyDetails.company.name,
        companyDomain: parsedCompanyDetails.company.domain,
        companyConfidence: parsedCompanyDetails.confidence,
      });
    }
  }, []);

  const lastMessage = messages[messages.length - 1];

  const addMessage = (id: any, message: any) => {
    const bot_message_id = crypto.randomUUID();
    const timestamp = getTimestamp();

    setMessages((prevState) => [
      ...prevState,
      {
        id: id,
        type: 'user',
        message: message,
        stopped: false,
        events: {
          classification: { action: null, input: null },
          timers: [],
          documents: [],
          matches: [],
        },
        timestamp,
      },
      {
        id: bot_message_id,
        source_id: id,
        type: 'bot',
        message: '',
        source: message,
        state: 'loading',
        events: {
          classification: { action: null, input: null },
          timers: [],
          documents: [],
          matches: [],
        },
      },
    ]);
  };

  /** this helper function can be used to add a streamed token to the message object */
  const addToken = (id: any, token: any) => {
    setMessages((prevState) =>
      prevState.map((item) => {
        if (item.source_id === id) return { ...item, message: item.message + token, state: 'streaming' };
        return item;
      })
    );
  };

  /** this helper function can be used to add relevant used documents to the message object */
  const addDocuments = (id, documents) => {
    setMessages((prevState) =>
      prevState.map((item) => {
        if (item.source_id === id) return { ...item, events: { ...item.events, documents } };
        return item;
      })
    );
  };

  /** this helper function can be used to display an error message in the message object */
  const setError = (id, error) => {
    setMessages((prevState) =>
      prevState.map((item) => {
        if (item.source_id === id) return { ...item, message: error.detail, state: 'error', code: error.code };
        return item;
      })
    );
  };
  /** this helper function can be used to update any field in the message object */
  const updateMessage = (id: any, field: any, value: any) => {
    const timestamp = getTimestamp();
    setMessages((prevState) =>
      prevState.map((item) => {
        if (value === 'complete')
          return {
            ...item,
            state: 'complete',
            timestamp,
          };
        if (item.source_id === id) return { ...item, [field]: value };
        return item;
      })
    );
  };

  const subscribe = async (data) => {
    const { messageId, question } = data;

    addMessage(messageId, question);
    let sendQuestionParams = { question, userId, sessionId };
    if (messages.length === 0) {
      /**
       * Send company details if it's the first message
       * @ref https://telnyx.slack.com/archives/CL0EKKQ3C/p1732532730373589?thread_ts=1730933317.125389&cid=CL0EKKQ3C
       */
      sendQuestionParams = { ...sendQuestionParams, ...companyDetails };
    }

    const events = chatbotService.flowSendQuestion(sendQuestionParams);

    events.onmessage = (event) => {
      try {
        const { type, value } = JSON.parse(event.data) as { value: T.EventSourceValue; type: T.EventSourceType };
        if (type === EVENTSOURCE_TYPE.error) {
          setError(messageId, value);
          return events.close();
        }

        if (type === EVENTSOURCE_TYPE.complete) {
          updateMessage(messageId, 'state', 'complete');
          return events.close();
        }

        // if relevant documents are sent over the event source
        if (type === EVENTSOURCE_TYPE.documents) {
          addDocuments(messageId, value);
        }

        // if an LLM response token is sent over the event source
        if (type === EVENTSOURCE_TYPE.token) {
          addToken(messageId, value);
        }
      } catch (e) {
        setError(messageId, 'An unexpected error occurred while parsing the streamed data.');
      }
    };

    events.onerror = (e) => {
      if (e.status === 429) {
        setError(
          messageId,
          'Sorry, but you have exceeded the maximum number of requests allowed per minute. Please try again shortly.'
        );
      } else {
        setError(
          messageId,
          'Sorry, but an unexpected error occurred while attempting to connect to the server. Please check your connection and try again. If the problem persists, feel free to reach out to our support team for further assistance.'
        );
      }
      return events.close();
    };
  };

  /** this is a helper function used to send a message to the LLM */
  const chat = (input) => {
    if (input.trim() === '') return;

    const messageId = crypto.randomUUID();
    subscribe({ messageId, question: input });
  };

  return {
    chat,
    messages,
    feedback,
    setMessages,
    setFeedback,
    lastMessage,
  };
};

export default useChatbot;
