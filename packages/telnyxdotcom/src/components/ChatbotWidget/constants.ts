export const CHATBOT_STATUS = {
  operational: 'operational',
  degraded: 'degraded',
  maintenance: 'maintenance',
  offline: 'offline',
} as const;

export const EVENTSOURCE_TYPE = {
  token: 'token',
  error: 'error',
  timer: 'timer',
  documents: 'documents',
  matches: 'matches',
  function: 'function',
  complete: 'complete',
} as const;

export const INVALID_TOKEN_ERROR_CODE = '10009';
