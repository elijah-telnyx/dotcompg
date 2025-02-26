import type { ReCAPTCHA } from 'components/Recaptcha/types';
import type { ReportAbuseFormValues } from 'components/ReportAbuseForm';
import type { RUNTIME_ENV } from 'env';
import Api from 'lib/Api';
import type { ArticlesResponse } from 'pages/api/articles';
import type { DomainLookupResponse } from 'pages/api/domain-lookup';
import type { HealthResponse } from 'pages/api/health';
import type { IntercomVerificationResponse } from 'pages/api/intercom-verification';
import type { LegalVersionResponse } from 'pages/api/legal-version';
import type { IoTSIMCardCalculatorApiResponse } from 'pages/api/pricing/iot-sim-card-calculator';
import type { SMSCalculatorApiResponse } from 'pages/api/pricing/sms-calculator';
import type { ValidateEmailResponse } from 'pages/api/validate-email';
import type { GoogleVerifyResponse } from 'pages/api/verify-captcha';
import type { VoiceAiDemoAPIParams, VoiceAiDemoAPIResponse } from 'pages/api/voice-ai/call';
import type { VoiceAiSetupAPIParams, VoiceAiSetupAPIResponse } from 'pages/api/voice-ai/setup';
import type { NumberLookup } from 'pages/api/number-lookup';
import type { CountryCode } from 'libphonenumber-js';
import type { AvailableNumbers } from 'pages/api/available-numbers';
import type { AIModel } from './telnyxApiService';
import type { OurNetworResponse } from 'pages/api/our-network';
import type { PricingPagesProps } from 'lib/Pricing/pages';
import type { SupportedCountry, PricingPage } from 'lib/Pricing/@types';
import type { SearchResponseProps } from 'pages/api/use-cases';
import type { CardProps } from 'ui/components/Cards';

const api = Api.create({ baseUrl: `/api` });

export const submitSubprocessorForm = async (email: string) => {
  return await api.post<{ job_id: string }>(`/subprocessor-subscription`, { email });
};

export const submitReleaseNotesForm = async (email: string) => {
  return await api.post<{ job_id: string }>(`/release-notes-subscription`, { email });
};

export const verifyCaptcha = async ({ token, version }: ReCAPTCHA) => {
  return api.post<GoogleVerifyResponse>('/verify-captcha', {
    token,
    version,
  });
};

export const validateEmail = (email: string) => {
  return api.post<ValidateEmailResponse>('/validate-email', { email });
};

export const domainLookup = (host: string) => {
  return api.post<DomainLookupResponse>('/domain-lookup', { host });
};

export const getRuntimeEnv = async () => {
  return await api
    .get<HealthResponse>('/health')
    .then((body: { status: string; environment: string }) => body.environment as typeof RUNTIME_ENV);
};

export const sendReportAbuseForm = async (formData: {
  form: ReportAbuseFormValues;
}): Promise<{ success: boolean; data: string; message?: string }> => {
  return await api.post('/report-abuse', formData);
};

export const initiateVoiceAICall = async (formData: VoiceAiDemoAPIParams) => {
  return await api.post<VoiceAiDemoAPIResponse>('/voice-ai/call', formData);
};

export const initiateVoiceAISetup = async (formData: VoiceAiSetupAPIParams) => {
  return await api.post<VoiceAiSetupAPIResponse>('/voice-ai/setup', formData);
};

export const getLegalVersion = (pages: string[]) => {
  return api.get<LegalVersionResponse>('/legal-version', { queryParams: { pages } });
};

export const getSMSCalculatorPricing = (): Promise<SMSCalculatorApiResponse> => {
  return api.get('/pricing/sms-calculator');
};

export const getIOTSIMCardPricing = () => {
  return api.get<IoTSIMCardCalculatorApiResponse>('/pricing/iot-sim-card-calculator');
};

export const getCountryZone = (countryAlpha2: string) => {
  return api.get<{ data: { zone: string } }>(`/pricing/country-zone/${countryAlpha2}`);
};

export const getArticles = (query: { category?: string; topic?: string; page?: string }) => {
  return api.get<ArticlesResponse>('/articles', { queryParams: query });
};

export const getUseCases = (query: {
  page?: string | undefined;
  search?: string | undefined;
  filterQuery?: { [key: string]: string | undefined };
}) => {
  return api.get<SearchResponseProps<CardProps>>('/use-cases', { queryParams: query });
};

export const getIntercomVerification = (query: { user_id?: string }) => {
  return api.get<IntercomVerificationResponse>('/intercom-verification', { queryParams: query });
};

export const getPhoneNumberLookup = (query: {
  searched_number: string;
  dialing_code: string;
  token: string;
  country_code: CountryCode;
}) => {
  return api.get<NumberLookup>('/number-lookup', { queryParams: query });
};

export const getAvailableNumbers = (query: {
  country_code: string;
  token: string;
  state_code?: string;
  phone_number?: string;
}) => {
  return api.get<AvailableNumbers>('/available-numbers', { queryParams: query });
};

/**
 * Passthrough for `telnyxApiService.getAIModels` API
 */
export const getAIModels = () => {
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

  return api.get<{ data: AIModel[]; object: string }>('/ai-models').then((data) => {
    return parseAIModels(data.data);
  });
};

export const getOurNetwork = () => {
  return api.get<OurNetworResponse>('/our-network');
};

export const getPricingTablesData = async (query: { countryCode: SupportedCountry; slug: PricingPage }) => {
  return await api.get<PricingPagesProps>(`/pricing/get-pricing-tables-data`, {
    queryParams: query,
  });
};
