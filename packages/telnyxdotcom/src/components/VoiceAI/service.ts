import Api from 'lib/Api';
import constants from 'constants/env';
import type { ApiV2Response } from 'services/telnyxApiService';

export type VoiceAIDomainNumberResponse = {
  status: 'success' | 'processing' | 'queued';
  bought_phone_number: string;
};

const _voiceAiSetupApi = Api.create({ baseUrl: constants.api.VOICE_AI_SETUP_BASE_URL });
const voiceAiSetupApi = Api.create({ baseUrl: '/api/voice-ai' });

/**
 * @private should not be used from the browser
 */
const _getVoiceAIDomainNumber = async ({ domain }: { domain: string }) => {
  return _voiceAiSetupApi.get<ApiV2Response<VoiceAIDomainNumberResponse>>(`/${domain}`);
};

const getVoiceAIDomainNumber = async ({ domain, domaintoken }: { domain: string; domaintoken: string }) => {
  return voiceAiSetupApi.get<VoiceAIDomainNumberResponse>(`/domain/${domain}`, {
    queryParams: { domaintoken },
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
};

export const voiceAIService = {
  _getVoiceAIDomainNumber,
  getVoiceAIDomainNumber,
};
