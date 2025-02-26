import { useState } from 'react';
import Grid, { type GridItemProps } from 'ui/components/Grid';
import Section, { type SectionProps } from 'ui/components/Section';
import Button from 'ui/components/Button';
import * as css from './SubprocessorSubForm.styled';
import { email as validate } from 'ui/utils/validators';
import { submitSubprocessorForm } from 'services/publicApiService';

export interface SubprocessorFormSectionProps extends SectionProps {
  sectionGrid?: GridItemProps;
  fullWidth?: boolean;
}

type Message = { type: 'error' | 'success'; text: string };

const SubprocessorSubForm = ({
  fullWidth = false,
  sectionGrid = { xs: 4, small: 8 },
  ...props
}: SubprocessorFormSectionProps) => {
  const [email, setEmail] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | undefined>();
  const [message, setMessage] = useState<Message | undefined>();

  const submitForm = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmitting(true);

    if (!email || validate(email)) {
      setMessage({
        type: 'error',
        text: validate(email) || 'Please enter a valid email address.',
      });
      setSubmitting(false);
      return;
    }

    try {
      const { job_id } = await submitSubprocessorForm(email);
      if (job_id) {
        setMessage(undefined);
        setSuccess(true);
      }
    } catch (e) {
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  const grid = fullWidth ? { xs: 4, small: 12 } : sectionGrid;
  return (
    <Section spacingTop={'none'} spacingBottom={'continuous'} {...props}>
      <Grid.Container>
        <Grid.Item {...grid}>
          <css.Paragraph>Subscribe to automated email alerts whenever this page is updated</css.Paragraph>
          <css.Form onSubmit={submitForm}>
            <css.Input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              message={message}
              disabled={success}
              onChange={(i) => setEmail(i.target.value)}
              onBlur={() => {
                if (!email || validate(email)) {
                  setMessage({
                    type: 'error',
                    text: validate(email) || 'Please enter a valid email address.',
                  });
                  return;
                }
                setMessage(undefined);
              }}
            />
            {(success === undefined || success === false) && (
              <Button type='submit' disabled={success} loading={submitting}>
                Subscribe
              </Button>
            )}
            {success && <css.SuccessIcon />}
          </css.Form>
        </Grid.Item>
      </Grid.Container>
    </Section>
  );
};

export default SubprocessorSubForm;
