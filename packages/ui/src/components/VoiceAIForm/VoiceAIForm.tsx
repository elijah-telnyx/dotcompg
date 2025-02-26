import { useForm } from 'react-hook-form';
import { IconMessage, Message } from '../Input';
import type { CTAButtonProps } from '../CtaButton';
import Paragraph from '../Typography/Paragraph';
import { defaultErrorMessages, phoneNumber } from '../../utils/validators';
import * as css from './VoiceAIForm.styled';

export interface VoiceAIFormMessage {
  message?: string;
  type: 'success' | 'error' | 'info';
}

export interface VoiceAIFormProps {
  children?: React.ReactNode;
  heading: string;
  headingId: string;
  successHeading: string;
  successCopy: string;
  successReturnLink?: CTAButtonProps;
  loading?: boolean;
  disabled?: boolean;
  apiMessage?: VoiceAIFormMessage;
  embed?: boolean;
  onClickReturn?: () => void;
  onSubmit: (values: VoiceAIFormValues) => void;
}

export interface VoiceAIFormValues {
  full_name: string;
  phone_number: string;
  business_name: string;
}

export const VoiceAIForm = ({
  children,
  heading,
  headingId,
  successHeading,
  successCopy,
  successReturnLink,
  loading,
  disabled,
  apiMessage,
  embed,
  onClickReturn,
  onSubmit,
}: VoiceAIFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      full_name: '',
      phone_number: '',
      business_name: '',
    },
  });

  const handleInternalSubmit = (data: VoiceAIFormValues) => {
    return onSubmit(data);
  };

  if (apiMessage?.type === 'success') {
    return (
      <css.SuccessContent embed={embed}>
        <css.SuccessHeading level={3} htmlAs='h2'>
          {successHeading}
        </css.SuccessHeading>
        <Paragraph>{successCopy}</Paragraph>
        {successReturnLink && (
          <css.SuccessReturnLink
            {...successReturnLink}
            onClick={onClickReturn}
          />
        )}
      </css.SuccessContent>
    );
  }

  return (
    <>
      {heading && (
        <css.Heading level={3} htmlAs='h2' id={headingId}>
          {heading}
        </css.Heading>
      )}

      <css.FormContent
        onSubmit={handleSubmit(handleInternalSubmit)}
        aria-label='voice-ai-form'
        noValidate
        embed={embed}
      >
        <css.InputField
          id='full_name'
          label='Full name'
          placeholder='Alexander Graham Bell'
          disabled={disabled}
          {...register('full_name', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={{
            text: errors['full_name']?.message as string,
            type: 'error',
          }}
        />

        <css.InputField
          id='phone_number'
          label='Phone number?'
          type='tel'
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

        {children}

        <css.SubmitButton
          htmlAs='button'
          type='submit'
          loading={loading}
          disabled={loading || disabled}
          kind={embed ? 'secondary' : 'primary'}
        >
          Call Me
          <css.CallIcon />
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
