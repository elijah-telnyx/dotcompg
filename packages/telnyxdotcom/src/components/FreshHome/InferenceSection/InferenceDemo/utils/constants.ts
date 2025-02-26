import constants from 'constants/env';
import type { InferenceDemoValues } from '../InferenceDemo';

export const DEFAULT_VALUES: Required<InferenceDemoValues> = {
  /**
   * dev api doesn't support 70B model
   * @ref https://telnyx.slack.com/archives/C0179536KU7/p1731428170557069?thread_ts=1731089925.085209&cid=C0179536KU7
   */
  aiModel:
    constants.env !== 'production' ? 'meta-llama/Meta-Llama-3.1-8B-Instruct' : 'meta-llama/Meta-Llama-3.1-70B-Instruct',
  temperature: 0.9,
  messages: [],
  prompt: '',
  maxTokens: 1000,
};

export const MAXIMUM_REQUESTS = 3;

export const SUGGESTED_TOPICS = [
  'Draft a 10DLC messaging campaign',
  'What is an eSIM?',
  'What are some use cases of LLMs for real-time voice or messaging?',
  'How can bi-directional streaming improve my call center?',
];
