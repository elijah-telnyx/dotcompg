import { useState, useRef } from 'react';
import { voiceAIService } from 'components/VoiceAI/service';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment';
import { formatPhoneNumber } from 'utils/phone/formatPhoneNumber';
import { initiateVoiceAISetup } from 'services/publicApiService';
import type { VoiceAIFormMessage, VoiceAIFormValues } from 'components/VoiceAIForm';
import VoiceAiForm from 'components/VoiceAiHero/VoiceAiForm/VoiceAiForm';
import Captcha from 'components/Captcha';
import constants from 'constants/env';

import * as css from './VoiceAiFormContainer.styled';
import Heading from 'ui/components/Typography/Heading';
import Tagline from 'ui/components/Tagline';
import Link from 'ui/components/Link';
import Paragraph from 'ui/components/Typography/Paragraph';
import { IconMessage, Message } from 'ui/components/Input';
import { Success, Alert, BackArrow } from 'ui/components/Icons';

const REQUEST_DOMAIN_INTERVAL = 10000;

const VoiceAiFormContainer = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [hCaptchaToken, setHCaptchaToken] = useState<string>('');
  const [apiMessage, setApiMessage] = useState<VoiceAIFormMessage | undefined>();
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [callBackNumber, setCallBackNumber] = useState<string | null>(null);

  const [disabled, setDisabled] = useState<boolean>(false);

  const requestingDomainRef = useRef<boolean>(false);
  const setRequestingDomainRef = (value: boolean) => {
    requestingDomainRef.current = value;
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
          if (response.bought_phone_number) setCallBackNumber(response.bought_phone_number);
          setRequestingDomainRef(false);
          setApiMessage({ type: 'success' });
          setDisabled(true);
          setSubmitting(false);
          return;
        }
      } catch (error) {
        if ((error as any).status === 'error') {
          setApiMessage({
            message: error instanceof Error ? error.message : `Failed to successfully scan ${formValues.domain}`,
            type: 'error',
          });
        } else {
          setApiMessage({
            message: 'Failed to get voice ai domain number',
            type: 'info',
          });
        }
        setSubmitting(false);
        return;
      }

      // await to do the next request
      await awaitTimer(REQUEST_DOMAIN_INTERVAL);
    }
  };

  const handleRequest = async (formValues: VoiceAIFormValues) => {
    setSubmitting(true);

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

    await initiateVoiceAISetup({
      ...formValues,
      greeting: `Hi there. I'm an AI sales support agent that can help answer any of your questions about ${formValues.business_name}. Let me know what question you have and I'll do my best to get you an answer.`,
      token: hCaptchaToken,
    })
      .then(async (response) => {
        if (response.domaintoken) {
          await handleDomainRequest(formValues, response.domaintoken);
        } else {
          setApiMessage({
            message: `Failed to build AI Agent, from domain. Please try again.`,
            type: 'error',
          });
        }
        setDisabled(true);
      })
      .catch((error) => {
        setApiMessage({
          message: `Failed to build AI Agent. ${error?.message}. Please try again.`,
          type: 'error',
        });
        handleHCapchaExpire();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleForwardEnd = () => {
    setApiMessage({
      message: 'Requesting SMS notification...',
      type: 'info',
    });
    setSubmitting(false);
    setDisabled(false);
    setRequestingDomainRef(false);
  };

  const handleBackToBegining = () => {
    setApiMessage(undefined);
    setSubmitting(false);
    setDisabled(false);
  };

  const handleHCapchaChallenge = (token: string) => {
    setHCaptchaToken(token);
  };

  const handleHCapchaExpire = () => {
    window.hcaptcha.reset();
    setHCaptchaToken('');
  };

  return (
    <css.FormContainer>
      {!submitting && !apiMessage && (
        <css.ItemWrapper>
          <VoiceAiForm onSubmit={handleRequest} disabled={disabled} setCompanyName={setCompanyName}>
            <Captcha
              sitekey={constants.hCaptcha.siteKey.telnyxdotcom}
              onVerify={handleHCapchaChallenge}
              onExpire={handleHCapchaExpire}
              executeOnLoad={false}
              lockPageScrollOnOpen={false}
            />
          </VoiceAiForm>
        </css.ItemWrapper>
      )}
      {submitting && (
        <css.ItemWrapper>
          <css.ContentWrapper>
            <Tagline>Generating your agent</Tagline>
            <Heading level={3}>One moment please, your personal AI agent will be ready soon.</Heading>
            <css.LoadingBar />
            <css.DontWantToWait>
              <Paragraph>Don&apos;t want to wait?</Paragraph>
              <Link htmlAs='button' onClick={handleForwardEnd} kind='cta'>
                Receive an SMS when ready
              </Link>
            </css.DontWantToWait>
          </css.ContentWrapper>
        </css.ItemWrapper>
      )}
      {apiMessage?.type === 'success' && (
        <css.ItemWrapper>
          <css.ContentWrapper>
            <css.BackLink
              type='link'
              kind='cta'
              direction='rtl'
              Icon={<BackArrow />}
              onClick={handleBackToBegining}
              above={true}
            >
              Back to step 1
            </css.BackLink>
            <Tagline>
              <Success /> Request Complete
            </Tagline>
            <Heading level={3}>Your AI agent is ready.</Heading>

            {callBackNumber ? (
              <>
                <css.CallParagraph>Call the number below to chat with your customized AI agent.</css.CallParagraph>
                <css.CallNumber href={`tel:${callBackNumber}`} kind='cta' underlineAlwaysVisible>
                  Call {formatPhoneNumber(callBackNumber)}
                </css.CallNumber>
              </>
            ) : (
              <css.CallParagraph>
                You should receive a SMS with a number to contact your customized AI agent.
              </css.CallParagraph>
            )}
          </css.ContentWrapper>
        </css.ItemWrapper>
      )}
      {apiMessage?.type === 'info' && (
        <css.ItemWrapper>
          <css.ContentWrapper>
            <Tagline>Your personal AI voice agent will be ready shortly.</Tagline>
            <Paragraph>
              Telnyx will send you an SMS with your personal AI Voice agent phone number. Call the number and ask the
              agent any questions{`${companyName && ` about ${companyName}`}`}.
            </Paragraph>
          </css.ContentWrapper>
        </css.ItemWrapper>
      )}
      {apiMessage?.type === 'error' && (
        <css.ItemWrapper>
          <css.ContentWrapper>
            <Tagline>
              <Alert color='red' /> Request Not Completed
            </Tagline>
            <Heading level={3}>Sorry, there was an error with your request.</Heading>
            {apiMessage?.message && (
              <Message type={apiMessage.type} multiline>
                <IconMessage type={apiMessage.type} />
                {apiMessage?.message}
              </Message>
            )}
            <css.LastCtaWrapper>
              <css.BackLink type='link' kind='cta' direction='rtl' Icon={<BackArrow />} onClick={handleBackToBegining}>
                Back to step 1
              </css.BackLink>
              <css.ContactUsButton
                buttonKind='secondary'
                text='Contact Us'
                type='button'
                href='/contact-us'
                css={{ color: '$grayHoverDarkBackground' }}
                buttonVariant='header'
              />
            </css.LastCtaWrapper>
          </css.ContentWrapper>
        </css.ItemWrapper>
      )}
    </css.FormContainer>
  );
};

export default VoiceAiFormContainer;
