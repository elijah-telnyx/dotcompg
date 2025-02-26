import { useForm } from 'react-hook-form';
import Input, { IconMessage, Message } from 'ui/components/Input';
import type { CTAButtonProps } from 'ui/components/CtaButton';
import Tooltip, { TooltipIcon } from 'ui/components/Tooltip';
import Paragraph from 'ui/components/Typography/Paragraph';
import { defaultErrorMessages, phoneNumber, domain, email } from 'ui/utils/validators';
import * as css from './VoiceAIForm.styled';
import Label from 'ui/components/Typography/Label';
import Heading from 'ui/components/Typography/Heading';
import Link from 'ui/components/Link';
import Button from 'ui/components/Button';
import { BackArrow } from 'ui/components/Icons';
import { formatPhoneNumber } from 'utils/phone/formatPhoneNumber';

export interface VoiceAIFormMessage {
  message?: string;
  type: 'success' | 'error' | 'info';
  data?: {
    agentNumber?: string;
  };
}

export interface VoiceAIFormProps {
  children?: React.ReactNode;
  heading?: string;
  successReturnLink?: CTAButtonProps;
  loading?: boolean;
  disabled?: boolean;
  apiMessage?: VoiceAIFormMessage;
  embed?: boolean;
  onClickReturn?: () => void;
  onSubmit: (values: VoiceAIFormValues) => void;
  receiveAgentNumberWhenReady: () => void;
}

export interface VoiceAIFormValues {
  business_name: string;
  phone_number: string;
  email: string;
  domain: string;
  terms_and_conditions: boolean;
}

export const VoiceAIForm = ({
  children,
  heading = 'Build your context-aware AI agent',
  successReturnLink,
  loading,
  disabled,
  apiMessage,
  embed,
  onClickReturn,
  onSubmit,
  receiveAgentNumberWhenReady,
}: VoiceAIFormProps) => {
  const agentNumber = apiMessage?.data?.agentNumber;

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      business_name: '',
      phone_number: '',
      domain: '',
      email: '',
      terms_and_conditions: false,
    },
  });
  const companyName = watch('business_name');

  const handleInternalSubmit = (data: VoiceAIFormValues) => {
    return onSubmit(data);
  };

  if (loading) {
    return (
      <css.LoadingContainer>
        <div>
          <Label>Generating your agent</Label>
          <css.LoadingBar />
        </div>
        <Heading level={3} htmlAs='p'>
          One moment please, your personal AI agent will be ready soon.
        </Heading>
        <div>
          <Paragraph>Don&apos;t want to wait?</Paragraph>
          <Link htmlAs='button' onClick={receiveAgentNumberWhenReady} kind='cta' underlineAlwaysVisible>
            Receive an SMS when ready
          </Link>
        </div>
      </css.LoadingContainer>
    );
  }

  if (apiMessage?.type === 'error') {
    return (
      <css.ErrorMessageContainer>
        <Message type={apiMessage.type} multiline>
          <IconMessage type={apiMessage.type} />
          {apiMessage.message}
        </Message>

        <css.ErrorContainerHeadingWrapper>
          <Heading level={3} htmlAs='h3'>
            Sorry, there was an error with your request.
          </Heading>
          <Link
            htmlAs='button'
            onClick={onClickReturn}
            kind='cta'
            Icon={<BackArrow width={20} height={20} />}
            direction='rtl'
          >
            Back to form
          </Link>
        </css.ErrorContainerHeadingWrapper>
        <Button href='/contact-us' kind='secondary' htmlAs='a'>
          Contact us
        </Button>
      </css.ErrorMessageContainer>
    );
  }

  if (apiMessage?.type === 'success' && !agentNumber) {
    return (
      <css.SuccessContent embed={embed}>
        <css.SuccessHeading level={3} htmlAs='h2'>
          Your personal AI voice agent will be ready shortly.
        </css.SuccessHeading>
        <Paragraph>
          Telnyx will send you an SMS with your personal AI Voice agent phone number. Call the number and ask the agent
          any questions about {companyName}.
        </Paragraph>
        {successReturnLink && <css.SuccessReturnLink {...successReturnLink} onClick={onClickReturn} />}
      </css.SuccessContent>
    );
  }

  if (apiMessage?.type === 'success' && agentNumber) {
    return (
      <css.SuccessContainer>
        <Message type={apiMessage.type} css={{ marginInline: 'auto' }}>
          <IconMessage type={apiMessage.type} />
          {apiMessage.message}
        </Message>

        <div>
          <css.SuccessHeading level={3} htmlAs='h2'>
            Your AI agent is ready!
          </css.SuccessHeading>
          <Paragraph>Call the number below to chat with your customized AI agent.</Paragraph>
        </div>
        <Link href={`tel:${agentNumber}`} kind='cta' underlineAlwaysVisible>
          Call {formatPhoneNumber(agentNumber)}
        </Link>
      </css.SuccessContainer>
    );
  }

  return (
    <>
      <css.Heading level={3} htmlAs='h2' id='build-your-ai-agent-with-telnyx'>
        {heading}
      </css.Heading>

      <css.FormContent
        onSubmit={handleSubmit(handleInternalSubmit)}
        aria-label='voice-ai-form'
        noValidate
        embed={embed}
      >
        <css.InputField
          id='business_name'
          label='Company name'
          placeholder='Bell Telephone Co.'
          disabled={disabled}
          {...register('business_name', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={{
            text: errors['business_name']?.message as string,
            type: 'error',
          }}
        />

        <css.InputField
          id='domain'
          label={
            <span>
              Domain{' '}
              <Tooltip content='Website domain used to build Voice Bot'>
                <TooltipIcon />
              </Tooltip>
            </span>
          }
          placeholder='company.com'
          pattern='^(https?:\/\/)?([a-z0-9\-]{1,61})\.([a-z0-9]{2,7})(\.([a-z0-9]{2,7}))?([a-z0-9\-\/]{1,100})?$'
          disabled={disabled}
          {...register('domain', {
            required: defaultErrorMessages.required.defaultMessage,
            validate: domain,
          })}
          message={{
            text: errors['domain']?.message as string,
            type: 'error',
          }}
        />

        <css.InputField
          id='phone_number'
          label={
            <span>
              Mobile phone{' '}
              <Tooltip content='number where we can text you when Bot is built'>
                <TooltipIcon />
              </Tooltip>
            </span>
          }
          type='tel'
          pattern='^[\+]?[1-9][0-9\(\) \-]{1,19}$'
          placeholder='+1 (123) 456-7899'
          disabled={disabled}
          {...register('phone_number', {
            required: defaultErrorMessages.required.defaultMessage,
            validate: phoneNumber,
          })}
          message={{
            text: errors['phone_number']?.message as string,
            type: 'error',
          }}
        />

        <css.InputField
          id='email'
          label='Email'
          type='email'
          placeholder='name@company.com'
          disabled={disabled}
          {...register('email', {
            required: defaultErrorMessages.required.defaultMessage,
            validate: email,
          })}
          message={{
            text: errors['email']?.message as string,
            type: 'error',
          }}
        />

        <Input
          id='terms_and_conditions'
          type='checkbox'
          {...register('terms_and_conditions', {
            required: defaultErrorMessages.acceptTermsAndConditions.defaultMessage,
          })}
          label={
            <span>
              I agree to Telnyx’s{' '}
              <css.CheckboxLink href='https://telnyx.com/terms-and-conditions-of-service' size='small' target='_blank'>
                Terms & Conditions
              </css.CheckboxLink>{' '}
              and{' '}
              <css.CheckboxLink href='https://telnyx.com/privacy-policy' size='small' target='_blank'>
                Privacy Policy
              </css.CheckboxLink>
              {'.'}
            </span>
          }
          labelSize='small'
          message={{
            text: errors['terms_and_conditions']?.message as string,
            type: 'error',
          }}
        />

        {children}

        <css.SubmitButton
          htmlAs='button'
          type='submit'
          loading={loading}
          disabled={loading || disabled}
          kind={embed ? 'secondary' : 'primary'}
        >
          Build my Voice Bot
        </css.SubmitButton>

        {apiMessage?.message && (
          <Message type={apiMessage.type} multiline>
            <IconMessage type={apiMessage.type} />
            {apiMessage?.message}
          </Message>
        )}
      </css.FormContent>
    </>
  );
};

export default VoiceAIForm;
