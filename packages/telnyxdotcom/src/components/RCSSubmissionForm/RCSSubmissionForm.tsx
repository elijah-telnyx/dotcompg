import { useState } from 'react';
import { useForm } from 'react-hook-form';
import HookFormField, { type Field } from 'ui/components/HookFormField';
import { IconMessage, Message } from 'ui/components/Input';
import type { HeadingTag } from 'ui/components/Typography/Heading';
import Paragraph from 'ui/components/Typography/Paragraph';
import { RCSSubmissionFormService } from './service';
import { styled } from 'ui/styles';
import Heading from 'ui/components/Typography/Heading';
import Button from 'ui/components/Button';

export type RCSSubmissionAPIMessage = {
  message?: string;
  type: 'success' | 'error';
};

export type RCSSubmissionFormValues = any;

export interface RCSSubmissionFormProps {
  heading?: string;
  headingTag?: HeadingTag;
  copy?: string;
  formFields: Record<string, Field<RCSSubmissionFormValues>[]>;
}

const RCSSubmissionForm = ({ heading, headingTag, copy, formFields }: RCSSubmissionFormProps) => {
  const defaultValues = Object.values<Field<RCSSubmissionFormValues>[]>(formFields)
    .flatMap((fields) => fields)
    .reduce((acc, field) => {
      acc[field.id] = field?.defaultValue;
      return acc;
    }, {} as Record<string, string | undefined>);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    defaultValues,
  });

  const [submittingForm, setSubmittingForm] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<RCSSubmissionAPIMessage | undefined>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleInternalSubmit = (data: RCSSubmissionFormValues) => {
    setSubmittingForm(true);
    RCSSubmissionFormService.submitForm(data)
      .then((res) => {
        if (res.status === 'success') {
          setApiMessage({
            message: res?.message,
            type: 'success',
          });
          setDisabled(true);
        } else {
          setApiMessage({
            message: 'Failed to submit request',
            type: 'error',
          });
        }
        setSubmittingForm(false);
      })
      .catch((e) => {
        setSubmittingForm(false);
        console.error(e);
        setApiMessage({
          message: 'Failed to submit request',
          type: 'error',
        });
      });
  };

  return (
    <>
      {heading && (
        <Heading level={3} htmlAs={headingTag} css={{ marginBlockEnd: '$xs' }}>
          {heading}
        </Heading>
      )}

      {copy && <Paragraph>{copy}</Paragraph>}

      <Form onSubmit={handleSubmit(handleInternalSubmit)} aria-label='rcs-submission-form' noValidate>
        {Object.entries(formFields).map(([key, fields]) => {
          return (
            <FormSection key={key}>
              <Paragraph lead>{key}</Paragraph>
              <FormSectionFieldsWrapper>
                {fields.map((field) => {
                  return (
                    <HookFormField
                      key={field.id}
                      {...field}
                      register={register}
                      errors={errors}
                      disabled={disabled}
                      control={control}
                    />
                  );
                })}
              </FormSectionFieldsWrapper>
            </FormSection>
          );
        })}

        {apiMessage?.message && (
          <Message type={apiMessage.type}>
            <IconMessage type={apiMessage.type} />
            {apiMessage?.message}
          </Message>
        )}

        <SubmitButton htmlAs='button' type='submit' loading={submittingForm} disabled={submittingForm || disabled}>
          Submit
        </SubmitButton>
      </Form>
    </>
  );
};

export default RCSSubmissionForm;

const Form = styled('form', {
  marginTop: '$large',
  marginBottom: '$medium',
  textAlign: 'start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$xl',
});

const FormSection = styled('div', {});
const FormSectionFieldsWrapper = styled('div', {
  display: 'grid',
  gap: '$xl',
  marginTop: '$small',
});

export const SubmitButton = styled(Button, {
  alignSelf: 'center',
  variants: {
    disabled: {
      true: {
        zIndex: 2,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
});
