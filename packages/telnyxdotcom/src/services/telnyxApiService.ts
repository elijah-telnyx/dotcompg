import Api from 'lib/Api';
import constants from 'constants/env';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import { generateURLWithSearchParams } from 'ui/utils/route/generateURLWithSearchParams';

const api = Api.create({ baseUrl: constants.api.BASE_URL });
const flowChatbotApi = Api.create({ baseUrl: constants.api.CHATBOT_BASE_URL });
const voiceAiApi = Api.create({ baseUrl: constants.api.VOICE_AI_BASE_URL });
const voiceAiSetupApi = Api.create({ baseUrl: constants.api.VOICE_AI_SETUP_BASE_URL });

type ApiV2Meta = {
  page_size: number;
  page_number: number;
  total_pages: number;
  total_results: number;
};

export type ApiV2Response<T> = {
  data: T;
  meta?: ApiV2Meta;
};

interface GoogleOAuthParameters {
  code: string;
  ga_client_id?: string;
  campaign_content?: string;
  campaign_medium?: string;
  campaign_name?: string;
  campaign_source?: string;
  referrer?: string;
  sift_session_id?: string;
  promo_code?: string;
  anonymous_id?: string;
}

export interface AuthResponse {
  credentials: {
    api_user: string;
    api_access_key: string;
    api_token: string;
    api_v2_token: string;
    created: true;
    user_role: string;
    user_id: string;
    Email: string;
    FirstName: string;
    LastName: string;
  };
  portal_redirect_token: string;
  message: string;
  requires_two_factor_verification: boolean;
  success: boolean;
  two_factor_auth_type: string;
  two_factor_exchange_token: string;
}

export interface RegistrationsParameters {
  organization_invitation_email?: string;
  organization_invitation_id?: string;
  organization_invitation_confirmation_token?: string;
  campaign?: object;
  referrer?: string;
  sift_session_id?: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  terms_and_conditions: boolean;
  promo_code?: string;
  subscription_opt_in?: boolean;
  g_recaptcha_response: string;
  g_recaptcha_version: string;
  anonymous_id: string;
  terms_and_conditions_url?: string;
  privacy_policy_url?: string;
}

export type RegistrationsInvitationFlowResponse = {
  session_type?: string;
  user_id?: string;
  sign_in_user?: boolean;
  portal_redirect_token?: string;
  ab_variants?: Array<string>;
  requires_two_factor_setup: false;
  two_factor_auth_type?: string;
  account_initialized_at?: string;
  oauth_provider?: string;
  // credentials JSON response from POST /sessions endpoint
  credentials?: {
    api_user?: string;
    api_token?: string;
    user_role?: string;
    user_id?: string;
  };
};
export type RegistrationsResponse = {
  success: boolean;
  message?: string;
  //Invitation flow response
} & RegistrationsInvitationFlowResponse;

export type StateNumbersResponse = ApiV2Response<
  {
    number_range: number;
    group_type: string;
    administrative_area: string;
    phone_number_type: string;
    coverage_type: string;
    group: string;
    record_type: string;
    count: string;
  }[]
>;

export interface AIModelResponse {
  object: string;
  data: AIModel[];
}

export interface FlowChatbotParams {
  service: 'devdocs' | 'dotcom';
  question: string;
  userId: string;
  sessionId: string;
  company_name?: string;
  company_domain?: string;
  company_confidence?: string;
}

// https://developers.telnyx.com/api/call-scripting/initiate-texml-call
export interface TexmlCallParams {
  // path param
  application_id: string;
  // Params are capitalized according to API
  From: string;
  To: string;
  Timeout?: number;
  Url?: string;
  StatusCallbackEvent?: string;
}

export interface TexmlCallResponse {
  data: {
    from: string;
    to: string;
    status: string;
    call_sid: string;
  };
}

export interface VoiceAiSetupParams {
  business_name: string;
  phone_number: string;
  email: string;
  domain: string;
  terms_and_conditions: boolean;
  greeting: string;
}

export interface VoiceAiSetupResponse {
  data: unknown;
  errors: unknown[];
}

export const authenticateTelnyxWithGoogle = (params: GoogleOAuthParameters) => {
  return api
    .post<AuthResponse>(
      `/users/auth/google_oauth2/callback`,
      Object.fromEntries(Object.entries(params).filter(([key, value]) => value))
    )
    .then((response) => response)
    .catch((error) => {
      errorLogger({
        error: new Error(`Failed to authenticate with Telnyx: ${JSON.stringify(error)}`),
      });
    });
};

export const register = ({ referrer, terms_and_conditions, ...values }: RegistrationsParameters) => {
  const xCreditReferrer = referrer || document.referrer;
  const termsOfService = Boolean(terms_and_conditions);

  const options: RequestInit = {};
  if (xCreditReferrer) {
    options.headers = {
      'x-credit-referrer': xCreditReferrer,
    };
  }

  return api.post<RegistrationsResponse>(
    '/registrations',
    {
      user_type: 0,
      terms_of_service: termsOfService,
      ...values,
    },
    options
  );
};

export const getStateNumbers = (stateAlpha2: string) => {
  const endpoint = `/v2/inventory_coverage?filter[country_code]=US&filter[groupBy]=national_destination_code&filter[phone_number_type]=local&filter[administrative_area]=${stateAlpha2}&filter[count]=true`;

  return api
    .get<StateNumbersResponse>(endpoint, { includeV2AuthHeader: true })
    .then((res) => res.data)
    .catch((error) => {
      errorLogger({
        error: new Error(`Failed to fetch state number info for ${stateAlpha2}: ${JSON.stringify(error)}`),
      });
    });
};

export const getCountryNumbers = (countryAbbr: string) => {
  const endpoint = `/v2/inventory_coverage?filter[country_code]=${countryAbbr}&filter[groupBy]=national_destination_code&filter&filter[count]=true`;

  return api
    .get<StateNumbersResponse>(endpoint, { includeV2AuthHeader: true })
    .then((res) => res.data)
    .catch((error) => {
      errorLogger({
        error: new Error(`Failed to fetch state number info for ${countryAbbr}: ${JSON.stringify(error)}`),
      });
    });
};

export const getLLMModelData = () => {
  const endpoint = `/v2/ai/models`;

  return api.get<AIModelResponse>(endpoint, { includeV2AuthHeader: true }).then((res) =>
    res.data.map((model, i) => {
      if (model.organization === 'cognitivecomputations') {
        return { ...model, organization: 'cognitive computations', index: i };
      }
      return { ...model, index: i };
    })
  );
};

type AIModelLanguages = 'en' | 'fr' | 'es' | 'ge' | 'it' | 'multilingual';

export interface AIModel {
  id: string;
  object: string;
  created: string;
  owned_by: 'Telnyx' | 'openai';
  organization: string;
  task: string;
  context_length: number;
  languages: AIModelLanguages[];
  parameters: number;
  parameters_str: string;
  tier: string;
  license: string;
}

export const getAIModels = ({ parse = true }: { parse: boolean } = { parse: true }) => {
  const parseAIModels = (models: AIModel[]) => {
    return (
      models
        /**
         * remove openai -- require an API key
         * @link https://telnyx.slack.com/archives/C073YNEJSCB/p1716217053182449?thread_ts=1716216837.443169&cid=C073YNEJSCB
         */
        .filter(({ owned_by }) => owned_by !== 'openai')
        .map((model) => {
          return {
            label: model.id,
            value: model.id,
          };
        })
        .sort((a, b) => {
          return a.label.localeCompare(b.label);
        })
    );
  };

  return api.get<{ data: AIModel[]; object: string }>('/v2/ai/models', { includeV2AuthHeader: true }).then((data) => {
    if (parse) return parseAIModels(data.data);
    return data;
  });
};

/**
 * Get AI response for Storage bucket contents
 *
 */
export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id?: string;
}

export interface ChatCompletionsApiParams {
  bucket?: string;
  model: string;
  openAiApiKey?: string;
  maxTokens?: string;
  temperature: string;
  systemPrompt?: string;
  messages?: AIMessage[];
}
export const getAiResponse = async ({
  bucket,
  model,
  openAiApiKey,
  maxTokens,
  temperature,
  systemPrompt,
  messages = [],
}: ChatCompletionsApiParams) => {
  let messagesArray = [];

  if (model !== 'mistralai/Mistral-7B-Instruct-v0.1') {
    messagesArray = [...messages];

    if (systemPrompt) messagesArray.unshift({ role: 'system', content: systemPrompt });
  } else {
    messagesArray = messages.map((message, i) => {
      if (i === 0)
        return {
          ...message,
          content: systemPrompt?.concat(' ', message.content),
        };
      return message;
    });
  }

  const params: Record<string, any> = {
    messages: messagesArray,
    model,
    max_tokens: maxTokens,
    temperature,
    stream: true,
  };

  if (bucket) params['tools'] = [{ type: 'retrieval', retrieval: { bucket_ids: [bucket] } }];

  if (openAiApiKey) params['openai_api_key'] = openAiApiKey;

  return api.post<{ body: ReadableStream<Uint8Array>; status: 429 | 200 }>(
    `/v2/ai/anonymous/chat/completions`,
    params,
    undefined,
    {
      redirect: true,
    }
  );
};

export const getFlowChatbotResponse = async ({ service, ...params }: FlowChatbotParams) => {
  const endpoint = generateURLWithSearchParams({
    url: `/${service}`,
    params,
  });

  return flowChatbotApi.getRaw(endpoint);
};

export const getTexmlCallResponse = async ({ application_id, ...params }: TexmlCallParams) => {
  return voiceAiApi.post<TexmlCallResponse>(`/${application_id}`, params, {
    headers: {
      Authorization: `Bearer ${process.env.PORTAL_VOICE_AI_API_V2_KEY as string}`,
    },
  });
};

export const getVoiceAiSetupResponse = async (params: VoiceAiSetupParams) => {
  return voiceAiSetupApi.post<VoiceAiSetupResponse>(
    '',
    params,
    {
      headers: {
        Accept: 'application/json',
      },
    },
    { emptyResponse: true }
  );
};
