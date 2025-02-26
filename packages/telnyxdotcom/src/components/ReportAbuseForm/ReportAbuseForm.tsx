import { useForm, type RegisterOptions } from 'react-hook-form';

import FieldMessage from 'ui/components/Input/FieldMessage/FieldMessage';
import Select from 'ui/components/Select';
import { IconMessage, Message } from 'ui/components/Input';
import { defaultErrorMessages } from 'ui/utils/validators';

import { getCountryByAlpha2 } from 'utils/countries.data';
import { optionalFields, requiredFields, type FieldProps, type FormValues, type SelectFieldProps } from './fields';
import * as css from './ReportAbuseForm.styled';

export type ReportAbuseAPIMessage = {
  message?: string;
  type: 'success' | 'error';
};
/**
 * Values used to send the form to the API
 */
export type ReportAbuseFormValues = Omit<
  FormValues,
  'abusedPhoneNumberCountry' | 'abusivePhoneNumberCountry' | 'abusedServices'
>;

interface ReportAbuseFormProps {
  onSubmit(value: ReportAbuseFormValues): void;
  isSubmitting: boolean;
  apiMessage?: ReportAbuseAPIMessage;
}

const ReportAbuseForm = ({ onSubmit, isSubmitting, apiMessage }: ReportAbuseFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    criteriaMode: 'all',
    defaultValues: {},
  });

  return (
    <>
      <css.Heading level={3}>Abuse report details</css.Heading>
      <css.Form
        onSubmit={handleSubmit((values) => {
          const {
            abusivePhoneNumberCountry,
            abusedPhoneNumberCountry,
            abusivePhoneNumber,
            abusedPhoneNumber,
            abusedServices,
            ...formValues
          } = values;
          const abusiveCountryDialCode = getCountryByAlpha2(abusivePhoneNumberCountry)?.dialCode;
          const fullAbusivePhoneNumber = `+${abusiveCountryDialCode} ${abusivePhoneNumber}`;

          const abusedCountryDialCode = getCountryByAlpha2(abusedPhoneNumberCountry)?.dialCode;
          const fullAbusedPhoneNumber = `+${abusedCountryDialCode} ${abusedPhoneNumber}`;

          const form = {
            ...formValues,
            abusedPhoneNumber: fullAbusedPhoneNumber,
            abusivePhoneNumber: fullAbusivePhoneNumber,
            serviceAbusedVoice: abusedServices.includes('serviceAbusedVoice'),
            serviceAbusedSms: abusedServices.includes('serviceAbusedSms'),
          };
          onSubmit(form);
        })}
        aria-label='report-abuse-form'
        noValidate
      >
        {requiredFields.map(({ validate, required, name, ...field }, index) => {
          const fieldError = errors[name as keyof FormValues]?.message;
          const option: Pick<RegisterOptions, 'required' | 'validate'> = {};
          if (required) {
            option.required = defaultErrorMessages.required.defaultMessage;
          }
          if (validate) {
            option.validate = validate;
          }

          if (field.type !== 'select' && field?.group) {
            const groupedField = field.group;
            return (
              <div key={index}>
                <css.Label as='p'>{field.label}</css.Label>
                {groupedField.map((item, index) => {
                  return (
                    <css.InputField
                      key={name}
                      id={name + 'option' + index}
                      {...item}
                      {...register(name as keyof FormValues, option)}
                    />
                  );
                })}
                {fieldError && <FieldMessage type='error'>{fieldError}</FieldMessage>}
              </div>
            );
          }
          if (!name) return null;

          if (field.type === 'select') {
            const selectField = field as SelectFieldProps;

            return (
              <div key={name}>
                {field.label && <css.Label htmlFor={name + 'Select'}>{field.label}</css.Label>}
                <Select
                  id={name + 'Select'}
                  {...selectField}
                  {...register(name, option)}
                  onValueChange={(value) => {
                    setValue(name, value);
                  }}
                />
                {fieldError && <FieldMessage type='error'>{fieldError}</FieldMessage>}
              </div>
            );
          }
          return (
            <css.InputField
              key={name}
              id={name}
              {...field}
              {...register(name, option)}
              message={{
                text: fieldError,
                type: 'error',
              }}
            />
          );
        })}

        <css.Label as='p'>
          The following information is not required and will only be used to keep you informed on the report.
        </css.Label>
        {optionalFields.map(({ name, validate, ...field }) => {
          if (!name) return null;
          const fieldError = errors[name as keyof FormValues]?.message;
          const options: Pick<RegisterOptions, 'validate'> = {};
          if (validate) {
            options.validate = validate;
          }

          return (
            <css.InputField
              key={name}
              id={name}
              {...(field as FieldProps)}
              {...register(name, options)}
              message={{
                text: fieldError,
                type: 'error',
              }}
            />
          );
        })}

        {apiMessage?.message && (
          <Message type={apiMessage.type}>
            <IconMessage type={apiMessage.type} />
            {apiMessage?.message}
          </Message>
        )}

        <css.Button type='submit' loading={isSubmitting} disabled={isSubmitting}>
          Submit
        </css.Button>
      </css.Form>
    </>
  );
};

export default ReportAbuseForm;
