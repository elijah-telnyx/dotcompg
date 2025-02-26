import Captcha from 'components/Captcha';
import { voiceAIService } from 'components/VoiceAI/service';
import type { VoiceAIFormMessage, VoiceAIFormProps, VoiceAIFormValues } from 'components/VoiceAIForm';
import VoiceAIForm from 'components/VoiceAIForm';
import constants from 'constants/env';
import featureFlippers from 'constants/featureFlippers';
import { useRef, useState } from 'react';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment';
import { initiateVoiceAISetup } from 'services/publicApiService';

const REQUEST_DOMAIN_INTERVAL = 20000;

export default function ControlledVoiceAIForm(form: Partial<VoiceAIFormProps>) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [hCaptchaToken, setHCaptchaToken] = useState<string>('');
  const [apiMessage, setApiMessage] = useState<VoiceAIFormMessage | undefined>();

  const [disabled, setDisabled] = useState<boolean>(false);

  const requestingDomainRef = useRef<boolean>(false);
  const setRequestingDomainRef = (value: boolean) => {
    requestingDomainRef.current = value;
  };

  const handleRequest = async (formValues: VoiceAIFormValues) => {
    setSubmitting(true);
    setApiMessage({
      message: 'Initiating setup...',
      type: 'info',
    });

    SegmentService.track(
      SEGMENT_TRACK_EVENT_NAMES.FORM_SUBMIT,
      { form_data: formValues, form_type: 'Voice AI' },
      {
        integrations: {
          All: true,
          'Marketo V2': false,
        },
      }
    );

    // initiate voice ai setup to create the domain bot
    await initiateVoiceAISetup({
      ...formValues,
      greeting: `Hi there. I'm an AI sales support agent that can help answer any of your questions about ${formValues.business_name}. Let me know what question you have and I'll do my best to get you an answer.`,
      token: hCaptchaToken,
    })
      .then(async (response) => {
        if (featureFlippers.DOTCOM_3903_VOICE_AI_DOMAIN_REQUEST) {
          if (response.domaintoken) {
            await handleDomainRequest(formValues, response.domaintoken);
            setSubmitting(false);
            return;
          } else {
            setApiMessage({
              message: `Failed to build AI Agent, from domain. Please try again.`,
              type: 'error',
            });
            return;
          }
        }
        // behavior with ff off
        setApiMessage({ type: 'success' });
        setDisabled(true);
      })
      .catch((error) => {
        setApiMessage({
          message: error?.message,
          type: 'error',
        });
        handleHCapchaExpire();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleDomainRequest = async (formValues: VoiceAIFormValues, domaintoken: string) => {
    const awaitTimer = (timer: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ awaited: true });
        }, timer);
      });
    };

    setRequestingDomainRef(true);
    while (requestingDomainRef.current) {
      try {
        const response = await voiceAIService.getVoiceAIDomainNumber({ domain: formValues.domain, domaintoken });
        if (response.status === 'success') {
          setRequestingDomainRef(false);
          setApiMessage({
            type: 'success',
            message: 'We have completed your request.',
            data: {
              agentNumber: response.bought_phone_number,
            },
          });
          setDisabled(true);
          setSubmitting(false);

          return;
        }
      } catch (error) {
        if (error instanceof Error) {
          setApiMessage({
            message: error?.message,
            type: 'error',
          });
        }
        handleHCapchaExpire();
        setSubmitting(false);
        return;
      }
      // await to do the next request
      await awaitTimer(REQUEST_DOMAIN_INTERVAL);
    }
  };

  const handleReturnClick = () => {
    setApiMessage(undefined);
    setDisabled(false);
  };
  const handleHCapchaChallenge = (token: string) => {
    setHCaptchaToken(token);
  };
  const handleHCapchaExpire = () => {
    window.hcaptcha.reset();
    setHCaptchaToken('');
  };

  const receiveAgentNumberWhenReady = () => {
    setDisabled(true);
    setApiMessage({ type: 'success' });
    setSubmitting(false);
    setRequestingDomainRef(false);
  };

  return (
    <VoiceAIForm
      {...form}
      onClickReturn={handleReturnClick}
      onSubmit={handleRequest}
      loading={submitting}
      disabled={disabled}
      apiMessage={apiMessage}
      receiveAgentNumberWhenReady={receiveAgentNumberWhenReady}
      successReturnLink={{
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
      }}
    >
      <Captcha
        sitekey={constants.hCaptcha.siteKey.telnyxdotcom}
        onVerify={handleHCapchaChallenge}
        onExpire={handleHCapchaExpire}
        executeOnLoad={false}
        lockPageScrollOnOpen={false}
      />
    </VoiceAIForm>
  );
}
