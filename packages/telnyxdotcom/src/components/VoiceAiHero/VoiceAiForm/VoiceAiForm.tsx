import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as css from './VoiceAiForm.styled';
import Tagline from 'ui/components/Tagline';
import Tooltip, { TooltipIcon } from 'ui/components/Tooltip';
import { defaultErrorMessages, phoneNumber, domain, email } from 'ui/utils/validators';
import Input from 'ui/components/Input';
import ArrowRight from 'ui/components/Icons/ArrowRight';

import type { VoiceAIFormValues } from '../../VoiceAIForm';

export interface VoiceAiFormProps {
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onSubmit: (values: VoiceAIFormValues) => void;
  setCompanyName: (companyName: string) => void;
}

const domainRegex = /^(https?:\/\/)?([a-z0-9-]{1,61})\.([a-z0-9]{2,7})(\.([a-z0-9]{2,7}))?([a-z0-9\-/]{1,100})?$/;
const phoneNumberRegex = /^[+]?[1-9][0-9() -]{1,19}$/;

const VoiceAiForm = ({ children, loading, disabled, onSubmit, setCompanyName }: VoiceAiFormProps) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setError,
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
  const phoneNumberValue = watch('phone_number');
  const domainName = watch('domain');
  const [currentStep, setCurrentStep] = useState(1);
  setCompanyName(companyName);

  const handleInternalSubmit = (data: VoiceAIFormValues) => {
    return onSubmit(data);
  };

  const nextQuestion = ({ toStep }: { toStep: number }) => {
    setCurrentStep(toStep);
  };

  return (
    <css.FormContent onSubmit={handleSubmit(handleInternalSubmit)} aria-label='voice-ai-form' noValidate>
      {currentStep == 1 && (
        <css.InputWrapper>
          <Tagline>Step 1/4</Tagline>
          <css.HeadingStyled level={3}>What is your Company name?</css.HeadingStyled>
          <css.InputButton
            icon={ArrowRight}
            onClick={() => {
              if (companyName) {
                nextQuestion({ toStep: 2 });
              } else {
                setError('business_name', {
                  type: 'manual',
                  message: 'Company name is required',
                });
              }
            }}
            label='Next'
          />

          <css.InputField
            id='business_name'
            placeholder='Bell Telephone Co.'
            disabled={disabled}
            {...register('business_name', {
              required: defaultErrorMessages.required.defaultMessage,
            })}
            message={{
              text: errors['business_name']?.message as string,
              type: 'error',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (companyName) {
                  nextQuestion({ toStep: 2 });
                } else {
                  setError('business_name', {
                    type: 'manual',
                    message: 'Company name is required',
                  });
                }
              }
            }}
          />
        </css.InputWrapper>
      )}
      {currentStep == 2 && (
        <css.InputWrapper>
          <Tagline>Step 2/4</Tagline>
          <css.HeadingStyled level={3}>
            What is your Company Domain?{' '}
            <css.ToolTip>
              <Tooltip content='Website domain used to build Voice Bot'>
                <TooltipIcon />
              </Tooltip>
            </css.ToolTip>
          </css.HeadingStyled>
          <css.InputButton
            icon={ArrowRight}
            onClick={() => {
              if (domainName && domainName.match(domainRegex)) {
                nextQuestion({ toStep: 3 });
              } else {
                setError('domain', {
                  type: 'manual',
                  message: 'Domain is required',
                });
              }
            }}
            label='Next'
          />

          <css.InputField
            id='domain'
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (domainName && domainName.match(domainRegex)) {
                  nextQuestion({ toStep: 3 });
                } else {
                  setError('domain', {
                    type: 'manual',
                    message: 'Domain is required',
                  });
                }
              }
            }}
          />
        </css.InputWrapper>
      )}
      {currentStep == 3 && (
        <css.InputWrapper>
          <Tagline>Step 3/4</Tagline>
          <css.HeadingStyled level={3}>
            What is your phone number?
            <css.ToolTip>
              <Tooltip content='number where we can text you when Bot is built'>
                <TooltipIcon />
              </Tooltip>
            </css.ToolTip>
          </css.HeadingStyled>
          <css.InputButton
            icon={ArrowRight}
            onClick={() => {
              if (phoneNumberValue && phoneNumberValue.match(phoneNumberRegex)) {
                nextQuestion({ toStep: 4 });
              } else {
                setError('phone_number', {
                  type: 'manual',
                  message: 'Phone number is required',
                });
              }
            }}
            label='Next'
          />

          <css.InputField
            id='phone_number'
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (phoneNumberValue && phoneNumberValue.match(phoneNumberRegex)) {
                  nextQuestion({ toStep: 4 });
                } else {
                  setError('phone_number', {
                    type: 'manual',
                    message: 'Phone number is required',
                  });
                }
              }
            }}
          />
        </css.InputWrapper>
      )}
      {currentStep == 4 && (
        <css.InputWrapper>
          <Tagline>Step 4/4</Tagline>
          <css.HeadingStyled level={3}>What is your email?</css.HeadingStyled>

          <css.InputField
            id='email'
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

          <css.TermsInputWrapper>
            <Input
              id='terms_and_conditions'
              type='checkbox'
              {...register('terms_and_conditions', {
                required: defaultErrorMessages.acceptTermsAndConditions.defaultMessage,
              })}
              label={
                <css.CheckboxWrapper>
                  I agree to Telnyx’s{' '}
                  <css.CheckboxLink
                    href='https://telnyx.com/terms-and-conditions-of-service'
                    size='small'
                    target='_blank'
                  >
                    Terms & Conditions
                  </css.CheckboxLink>{' '}
                  and{' '}
                  <css.CheckboxLink href='https://telnyx.com/privacy-policy' size='small' target='_blank'>
                    Privacy Policy
                  </css.CheckboxLink>
                  {'.'}
                </css.CheckboxWrapper>
              }
              labelSize='small'
              message={{
                text: errors['terms_and_conditions']?.message as string,
                type: 'error',
              }}
              style={{ marginTop: 2 }}
            />
          </css.TermsInputWrapper>

          <css.CaptchaWrapper>{children}</css.CaptchaWrapper>

          <css.SubmitButton
            htmlAs='button'
            type='submit'
            loading={loading}
            disabled={loading || disabled}
            kind='secondary'
            background='dark'
          >
            Build my Voice Bot
          </css.SubmitButton>
        </css.InputWrapper>
      )}
    </css.FormContent>
  );
};

export default VoiceAiForm;
