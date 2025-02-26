import { useState, useEffect, type FocusEventHandler } from 'react';
import { useForm } from 'react-hook-form';

import { IconMessage, Message, type InputProps } from '../Input';

import CtaButton from '../CtaButton';
import { OptionalLabel } from '../Input';
import * as css from './SignUpForm.styled';

import {
  passwordOneNumber,
  passwordOneSymbol,
  passwordUpperCase,
  passwordLowerCase,
  passwordMinLength,
} from '../../utils/validators';
import { defaultErrorMessages } from '../../utils/validators';

export type SignUpAPIMessage = {
  message?: string;
  success: boolean;
  reasons: {
    email?: string[];
    first_name?: string[];
    last_name?: string[];
    password?: string[];
    terms_and_conditions?: string[];
    promo_code?: string[];
  };
};

export type SignUpEmailMessage = InputProps['message'];

export type SignUpFormInitialValues = {
  email?: string;
  organization_invitation_email?: string;
  organization_invitation_id?: string;
  organization_invitation_confirmation_token?: string;
  campaign?: object;
  referrer?: string;
  sift_session_id: string;
} & SignUpFormValues;

export interface SignUpFormProps {
  initialValues: SignUpFormInitialValues;
  loading?: boolean;
  apiMessage?: SignUpAPIMessage;
  emailMessage?: SignUpEmailMessage;
  signInLink?: string;
  termsAndConditionsUrl: string;
  privacyPolicyUrl: string;
  onEmailBlur: (email: string) => void;
  onSubmit: (values: SignUpFormValues) => void;
}

export interface SignUpRecaptchaValues {
  g_recaptcha_response: string;
  g_recaptcha_version: string;
}

export interface SignUpFormValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  terms_and_conditions: boolean;
  promo_code?: string;
  subscription_opt_in?: boolean;
}

const SignUpForm = ({
  initialValues,
  loading,
  apiMessage,
  emailMessage,
  termsAndConditionsUrl,
  privacyPolicyUrl,
  onEmailBlur,
  onSubmit,
}: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isDirty },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      ...initialValues,
    },
  });

  const [showPromoCodeInput, setShowPromoCodeInput] = useState<boolean>(false);
  const [validatedEmail, setValidatedEmail] = useState<string>('');

  /**
   * https://react-hook-form.com/api/useform
   * Need reset to load the inital values on input form
   * defaultValues are cached. If you want to reset the defaultValues, you should use the reset api.
   */
  useEffect(() => {
    reset({
      organization_invitation_confirmation_token:
        initialValues.organization_invitation_confirmation_token,
      organization_invitation_email:
        initialValues.organization_invitation_email,
      organization_invitation_id: initialValues.organization_invitation_id,
      promo_code: initialValues.promo_code,
      email: initialValues.organization_invitation_email || initialValues.email,
    });
  }, [
    initialValues.organization_invitation_confirmation_token,
    initialValues.organization_invitation_email,
    initialValues.organization_invitation_id,
    initialValues.promo_code,
    initialValues.email,
    reset,
  ]);

  /**
   * Open or not the promo code inputbased on the initial values
   */
  useEffect(() => {
    const shouldShowPromoCodeInput = Boolean(
      !initialValues?.organization_invitation_id && initialValues.promo_code
    );

    setShowPromoCodeInput(shouldShowPromoCodeInput);
  }, [initialValues?.organization_invitation_id, initialValues.promo_code]);

  const handleInternalSubmit = (data: SignUpFormValues) => {
    return onSubmit(data);
  };

  const handleInternalEmailBlur: FocusEventHandler<HTMLInputElement> = async (
    e
  ) => {
    // avoid triggering the validation if the email input is already validated
    if (e.target.value === validatedEmail) {
      return;
    }

    const isValid = await trigger('email');

    if (isValid) onEmailBlur(e.target.value);

    setValidatedEmail(e.target.value);
  };

  const generatePasswordErrorProps = () =>
    apiMessage?.reasons['password'] || errors['password']
      ? {
          'aria-invalid': true,
          'aria-errormessage': 'password_message',
        }
      : {
          'aria-describedby': 'password_message',
          showMessageOnActive: isDirty,
        };

  const generatePasswordErrorList = () => {
    if (apiMessage?.reasons['password']) {
      const labelledBy = apiMessage.reasons['password'].reduce(
        (acc, _curr, index) => `${acc} reason${index + 1}`,
        ''
      );

      return (
        <css.MessagesWrapper>
          <Message
            type='error'
            id='password_message'
            aria-labelledby={labelledBy.trimStart()}
          >
            <IconMessage type='error' />
            Password:
          </Message>
          <css.ErrorMessagesContainer>
            {apiMessage.reasons['password'].map((reason, index) => {
              const id = `reason${index + 1}`;
              return (
                <Message type='error' id={id} key={id}>
                  {reason}
                </Message>
              );
            })}
          </css.ErrorMessagesContainer>
        </css.MessagesWrapper>
      );
    }

    if (!errors['password'] || !errors['password'].types) {
      return (
        <css.MessagesWrapper showMessageOnActive>
          <Message type='info' id='password_message'>
            Password must be at least 12 characters long and contain at least
            one number, one symbol, and one upper-case letter.
          </Message>
        </css.MessagesWrapper>
      );
    }

    const labelledBy = Object.keys(errors['password'].types).reduce(
      (acc, key) => `${acc} ${key}`,
      ''
    );

    return (
      <css.MessagesWrapper>
        <Message
          type='error'
          id='password_message'
          aria-labelledby={labelledBy.trimStart()}
        >
          <IconMessage type='error' />
          Password must:
        </Message>
        <css.ErrorMessagesContainer>
          {Object.keys(errors['password'].types).map((key) => {
            if (
              !errors['password'] ||
              !errors['password'].types ||
              !errors['password'].types[key]
            ) {
              return null;
            }

            return (
              <Message type='error' id={key} key={key}>
                {errors['password'].types[key]}
              </Message>
            );
          })}
        </css.ErrorMessagesContainer>
      </css.MessagesWrapper>
    );
  };

  const generateError = (
    field: keyof SignUpAPIMessage['reasons']
  ): InputProps['message'] => ({
    text:
      (errors[field]?.message as string) ||
      apiMessage?.reasons[field]?.toString(),
    type: 'error',
  });

  return (
    <>
      <css.FormContent
        onSubmit={handleSubmit(handleInternalSubmit)}
        aria-label='signup-form'
        noValidate
      >
        {!!initialValues?.organization_invitation_id && (
          <input
            name='organization_invitation_id'
            value={initialValues.organization_invitation_id}
            type='hidden'
            required
          />
        )}

        {!!initialValues?.organization_invitation_confirmation_token && (
          <input
            name='organization_invitation_confirmation_token'
            value={initialValues.organization_invitation_confirmation_token}
            type='hidden'
          />
        )}

        <css.InputField
          id='email'
          label='Company email'
          type='email'
          readOnly={!!initialValues?.organization_invitation_email}
          {...register('email', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={emailMessage || generateError('email')}
          onBlur={handleInternalEmailBlur}
        />

        <css.InputField
          id='first_name'
          label='First name'
          {...register('first_name', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={generateError('first_name')}
        />

        <css.InputField
          id='last_name'
          label='Last name'
          {...register('last_name', {
            required: defaultErrorMessages.required.defaultMessage,
          })}
          message={generateError('last_name')}
        />

        <div>
          <css.InputPasswordField
            id='password'
            label='Password'
            data-testid='password'
            {...register('password', {
              required: defaultErrorMessages.required.defaultMessage,
              validate: {
                passwordMinLength,
                passwordOneNumber,
                passwordOneSymbol,
                passwordUpperCase,
                passwordLowerCase,
              },
            })}
            {...generatePasswordErrorProps()}
          />
          {generatePasswordErrorList()}
        </div>

        {!showPromoCodeInput ? (
          <CtaButton
            /*
             * type="link" (required to use the link styling)
             * will make it render an anchor tag but since
             * this is not an actual link but a button we
             * need htmlAs="button" to force it to render
             * a button tag
             */
            htmlAs='button'
            type='link'
            aria-hidden={showPromoCodeInput}
            text='Apply a promo code'
            linkSize='small'
            onClick={() => setShowPromoCodeInput(!showPromoCodeInput)}
          />
        ) : (
          <css.InputField
            id='promo_code'
            aria-label='Promo code'
            label={<OptionalLabel label='Promo code' />}
            aria-hidden={!showPromoCodeInput}
            {...register('promo_code')}
            message={generateError('promo_code')}
          />
        )}

        <css.InputField
          id='terms_and_conditions'
          type='checkbox'
          {...register('terms_and_conditions', {
            required:
              defaultErrorMessages.acceptTermsAndConditions.defaultMessage,
          })}
          label={
            <span>
              I agree to Telnyx’s{' '}
              <css.CheckboxLink
                href={termsAndConditionsUrl}
                size='small'
                target='_blank'
              >
                Terms & Conditions
              </css.CheckboxLink>{' '}
              and{' '}
              <css.CheckboxLink
                href={privacyPolicyUrl}
                size='small'
                target='_blank'
              >
                Privacy Policy
              </css.CheckboxLink>
              {'.'}
            </span>
          }
          labelSize='small'
          message={generateError('terms_and_conditions')}
        />

        <css.InputField
          id='subscription_opt_in'
          label='I want to receive marketing emails from Telnyx.'
          labelSize='small'
          type='checkbox'
          {...register('subscription_opt_in')}
        />

        {apiMessage?.message && !apiMessage?.success && (
          <Message type='error'>
            <IconMessage type='error' />
            {apiMessage?.message}
          </Message>
        )}

        <css.SignUpButton
          htmlAs='button'
          type='submit'
          loading={loading}
          disabled={loading}
        >
          SIGN UP
        </css.SignUpButton>
      </css.FormContent>
    </>
  );
};

export default SignUpForm;
