import type { InteractiveCodeProps } from './InteractiveCode';
import type { InteractiveInferenceProps } from './InteractiveInference';
import type { InteractiveVoiceAIProps } from './InteractiveVoiceAI';
import type { InteractiveOurNetworkProps } from './InteractiveOurNetwork';
import { getAIModels, getOurNetwork } from 'services/publicApiService';
import { errorLogger } from 'utils/errorHandler/errorLogger';

export interface InteractiveType {
  code?: InteractiveCodeProps;
  inference?: InteractiveInferenceProps;
  'voice-ai'?: InteractiveVoiceAIProps;
  'our-network'?: InteractiveOurNetworkProps;
  error?: string;
}

export const INTERACTIVE_LOAD_DATA_MAP = {
  code: async (): Promise<InteractiveType> => {
    return Promise.resolve({
      code: {
        tagline: 'Built by developers, for developers',
        items: [
          {
            heading: 'cURL',
            code: '``` json\ncurl -X POST \\\n  --header "Content-Type: application/json" \\\n  --header "Accept: application/json" \\\n  --header "Authorization: Bearer YOUR_API_KEY" \\\n  --data \'{"connection_id": "uuid", "to": "+18005550199", "from": "+18005550100"}\' \\\n  https://api.telnyx.com/v2/calls\n```',
          },
          {
            heading: 'Python',
            code: '``` python\nimport telnyx\ntelnyx.api_key = "YOUR_API_KEY"\n\ntelnyx.Call.create(connection_id="uuid", to="+18005550199", from_="+18005550100")\n```',
          },
          {
            heading: 'Ruby',
            code: '``` ruby\nrequire "telnyx"\nTelnyx.api_key = "YOUR_API_KEY"\n\nTelnyx::Call.create(connection_id: "uuid", to: "+18005550199", from: "+18005550100")\n```',
          },
          {
            heading: 'Node',
            code: "``` Node\nconst telnyx = require('telnyx')('YOUR_API_KEY');\n// for Node 10:\nconst { data: call } = await telnyx.calls.create({ connection_id: 'uuid', to: '+18005550199', from: '+18005550100' });\n\n// In other environments\ntelnyx.calls.create(...).then(function(response){\n  const call = response.data;\n});\n```",
          },
          {
            heading: 'PHP',
            code: "``` PHP\n\\Telnyx\\Telnyx::setApiKey('YOUR_API_KEY');\n\n$call = Call::create([\n  'connection_id' => 'uuid',\n  'to' => '+18005550199',\n  'from' => '+18005550100'\n]);\n```",
          },
          {
            heading: '.NET',
            code: '``` .NET\nTelnyxConfiguration.SetApiKey(\'YOUR_API_KEY\');\nvar service = new CallControlAnswerService();\nvar options = new CallControlDialOptions {\n  To = "+18005550100 or SIP:username@sip.telnyx.com",\n  From = "+18005550101",\n  ConnectionId = "string"\n};\nservice.Dial(options);\n```',
          },
        ],
      },
    });
  },

  inference: async (): Promise<InteractiveType> => {
    try {
      const modelOptions = await getAIModels();

      return {
        inference: {
          form: {
            modelOptions,
          },
        },
      };
    } catch (error) {
      errorLogger({ error: new Error('Failed to fetch AI Models'), data: JSON.stringify(error), url: '/' });

      return {
        error: 'Unexpected error occurred. Please try again later.',
      };
    }
  },
  'voice-ai': async (): Promise<InteractiveType> => {
    return Promise.resolve({
      'voice-ai': {
        form: {
          heading: 'Receive a call from Telnyx',
          headingId: 'receive-voice-call',
          successHeading: 'Telnyx Voice AI will call you shortly.',
          successCopy: 'Please answer the call to start the demo.',
          successReturnLink: {
            href: '#receive-voice-call',
            text: 'Back to form',
            type: 'link',
            linkKind: 'cta',
            linkIcon: {
              src: '',
              svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_4646_1199)">
              <path d="M21 9L22 9L22 11L21 11L21 9ZM21 11L9.00002 11L9.00002 9L21 9L21 11Z" fill="currentColor" />
              <path
                  d="M2.78886 9.10557C2.05181 9.4741 2.05181 10.5259 2.78885 10.8944L9.55279 14.2764C10.2177 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 10.2177 5.39116 9.55279 5.72361L2.78886 9.10557Z"
                  fill="currentColor" />
          </g>
          <defs>
              <clipPath id="clip0_4646_1199">
                  <rect width="20" height="20" fill="white" />
              </clipPath>
          </defs>
      </svg>`,
              alt: 'back',
            },
            linkDirection: 'rtl',
          },
        },
      },
    });
  },

  'our-network': async (): Promise<InteractiveType> => {
    const ourNetworkData = await getOurNetwork();

    return { 'our-network': ourNetworkData };
  },
};
