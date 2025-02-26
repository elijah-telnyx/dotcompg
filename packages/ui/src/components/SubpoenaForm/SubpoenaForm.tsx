import * as css from './SubpoenaForm.styled';
import { useForm } from 'react-hook-form';
import { IconMessage, Message } from '../Input';
import type { HeadingTag } from '../Typography/Heading';
import { email } from '../../utils/validators';
import { defaultErrorMessages } from '../../utils/validators';
import Paragraph from '../Typography/Paragraph';

export type SubpoenaAPIMessage = {
  message?: string;
  type: 'success' | 'error';
};

export interface SubpoenaFormProps {
  heading?: string;
  headingTag?: HeadingTag;
  copy?: string;
  loading?: boolean;
  disabled?: boolean;
  apiMessage?: SubpoenaAPIMessage;
  onSubmit: (values: SubpoenaFormValues) => void;
}

export interface SubpoenaFormValues {
  full_name: string;
  agency: string;
  email: string;
  phone: string;
  fax: string;
  subscriber_info: boolean;
  cdrs: boolean;
  billing_info: boolean;
  target_numbers: string;
  request_start_date: string;
  request_end_date: string;
  relevant_files: HTMLInputElement['files'];
  notes: string;
}

const SubpoenaForm = ({
  heading,
  headingTag,
  copy,
  loading,
  disabled,
  apiMessage,
  onSubmit,
}: SubpoenaFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      full_name: '',
      agency: '',
      email: '',
      phone: '',
      fax: '',
      subscriber_info: false,
      cdrs: false,
      billing_info: false,
      target_numbers: '',
      request_start_date: '',
      request_end_date: '',
      relevant_files: null,
      notes: '',
    },
  });

  const handleInternalSubmit = (data: SubpoenaFormValues) => {
    return onSubmit(data);
  };

  return (
    <>
      {heading && (
        <css.Heading level={3} htmlAs={headingTag}>
          {heading}
        </css.Heading>
      )}

      {copy && <Paragraph>{copy}</Paragraph>}

      <css.FormContent
        onSubmit={handleSubmit(handleInternalSubmit)}
        aria-label='subpoena-form'
        noValidate
      >
        <css.InputField
          id='full_name'
          label='Full name'
          placeholder='First Last'
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
          id='agency'
          label='Authorized Agency / Department'
          disabled={disabled}
          {...register('agency', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={{
            text: errors['agency']?.message as string,
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

        <css.InputField
          id='phone'
          label='Your Phone Number'
          type='tel'
          pattern='^[\+]?[1-9]\d{1,14}$'
          placeholder='##########'
          disabled={disabled}
          {...register('phone', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={{
            text: errors['phone']?.message as string,
            type: 'error',
          }}
        />

        <css.InputField
          id='fax'
          label={
            <span>
              Your Fax Number <em>(optional)</em>
            </span>
          }
          type='tel'
          pattern='^[\+]?[1-9]\d{1,14}$'
          placeholder='##########'
          disabled={disabled}
          {...register('fax')}
          message={{
            text: errors['fax']?.message as string,
            type: 'error',
          }}
        />

        <css.InputContainer>
          <css.Label>Nature of Request (check all that apply)</css.Label>
          <css.InputField
            id='subscriber_info'
            label='Subscriber Info'
            type='checkbox'
            disabled={disabled}
            {...register('subscriber_info')}
            message={{
              text: errors['subscriber_info']?.message as string,
              type: 'error',
            }}
          />

          <css.InputField
            id='cdrs'
            label='CDRs'
            type='checkbox'
            disabled={disabled}
            {...register('cdrs')}
            message={{
              text: errors['cdrs']?.message as string,
              type: 'error',
            }}
          />

          <css.InputField
            id='billing_info'
            label='Billing Info'
            type='checkbox'
            disabled={disabled}
            {...register('billing_info')}
            message={{
              text: errors['billing_info']?.message as string,
              type: 'error',
            }}
          />
        </css.InputContainer>

        <css.InputField
          id='target_numbers'
          label='Target Telephone Number(s)'
          placeholder='comma-separated phone numbers'
          type='textarea'
          disabled={disabled}
          rows={5}
          {...register('target_numbers', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={{
            text: errors['target_numbers']?.message as string,
            type: 'error',
          }}
        />

        <css.InputField
          id='request_start_date'
          label='Request Start Date'
          type='datetime-local'
          disabled={disabled}
          {...register('request_start_date', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={{
            text: errors['request_start_date']?.message as string,
            type: 'error',
          }}
        />

        <css.InputField
          id='request_end_date'
          label='Request End Date'
          type='datetime-local'
          disabled={disabled}
          {...register('request_end_date', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={{
            text: errors['request_end_date']?.message as string,
            type: 'error',
          }}
        />

        <css.InputField
          id='relevant_files'
          label='Attach Subpoena, Court Order, or Warrant'
          type='file'
          accept='.png,.jpeg,.webp,.pdf,.doc,.docx'
          disabled={disabled}
          {...register('relevant_files', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={{
            text: errors['relevant_files']?.message as string,
            type: 'error',
          }}
        />

        <css.InputField
          id='notes'
          label={
            <span>
              Notes (Exigent Circumstances, Deadlines, etc.)<em>(optional)</em>
            </span>
          }
          type='textarea'
          disabled={disabled}
          rows={5}
          {...register('notes')}
          message={{
            text: errors['notes']?.message as string,
            type: 'error',
          }}
        />

        {apiMessage?.message && (
          <Message type={apiMessage.type}>
            <IconMessage type={apiMessage.type} />
            {apiMessage?.message}
          </Message>
        )}

        <css.SubmitButton
          htmlAs='button'
          type='submit'
          loading={loading}
          disabled={loading || disabled}
        >
          Submit
        </css.SubmitButton>
      </css.FormContent>
    </>
  );
};

export default SubpoenaForm;
