import type { CHATBOT_STATUS, EVENTSOURCE_TYPE } from './constants';

interface Document {
  title: string;
  tokens: number;
  url: string;
}

interface Match {
  title: string;
  certainty: number;
  tokens: number;
  type: string;
  url: string;
}

interface TypeFunction {
  actions: string;
  input: string;
}

interface Timer {
  name: string;
  duration: number;
}

interface Error {
  detail: string;
}

type Complete = string;

type Token = string;

export interface EventSourceValue {
  [EVENTSOURCE_TYPE.token]: Token;
  [EVENTSOURCE_TYPE.error]: Error;
  [EVENTSOURCE_TYPE.timer]: Timer;
  [EVENTSOURCE_TYPE.documents]: Document[];
  [EVENTSOURCE_TYPE.matches]: Match[];
  [EVENTSOURCE_TYPE.function]: TypeFunction;
  [EVENTSOURCE_TYPE.complete]: Complete;
}

export type EventSourceType = keyof EventSourceValue;

export interface ChatBotState {
  readonly status: keyof typeof CHATBOT_STATUS;
  notice?: string;
}
