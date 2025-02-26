/**
 * @overview Internal Chatbot API service
 * @Link https://github.com/team-telnyx/frontend/blob/main/packages/customer-portal-app/src/reactApp/common/services/chatbot.service.js
 */
import EventSource from 'eventsource';
import { generateURLWithSearchParams } from 'ui/utils/route/generateURLWithSearchParams';
import type * as T from './@types';
import constants from 'constants/env';
import Api from 'lib/Api';
import type { FlowChatbotParams } from 'services/telnyxApiService';

const baseUrl = `${constants.api.BASE_URL}/ai/chatbot`;
const ChatbotApi = Api.create({ baseUrl });
const flowBaseUrl = `${constants.protocol}://${constants.host}/api/flow-chatbot`;

/** Get status of openAI endpoint */
const getState = async () => {
  return ChatbotApi.get<T.ChatBotState>('/state');
};

/** Use hcaptcha token to generate a new one for our api
 * This is required because the duration of hpacptcha tokens is 2 minutes
 */
const generateBotToken = async (hcaptchaToken: string) => {
  return ChatbotApi.get<{ token: string }>('/hcaptcha', { queryParams: { token: hcaptchaToken } }).then(
    ({ token }) => token
  );
};

const sendQuestion = ({ question, messageId, userId, sessionId, token }: SendQuestionParams) => {
  const url = generateURLWithSearchParams({
    url: `${ChatbotApi.baseUrl}/completion/dotcom`,
    params: {
      question,
      user_id: userId,
      session_id: sessionId,
      message_id: messageId,
      model: 'gpt-4',
      token,
    },
  });

  const events = new EventSource(url);

  return events;
};

const flowSendQuestion = (params: FlowSendQuestionParams) => {
  const url = generateURLWithSearchParams({
    url: `${flowBaseUrl}`,
    params: {
      service: 'dotcom',
      ...params,
    },
  });

  const events = new EventSource(url);

  return events;
};

const chatbotService = {
  getState,
  sendQuestion,
  flowSendQuestion,
  generateBotToken,
};

export default chatbotService;

interface SendQuestionParams {
  question: string;
  messageId: string;
  userId: string;
  sessionId: string;
  token: string;
}

type FlowSendQuestionParams = Omit<FlowChatbotParams, 'service'>;
