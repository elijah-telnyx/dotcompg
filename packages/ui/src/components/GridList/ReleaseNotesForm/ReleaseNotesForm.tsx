import { useState } from 'react';
import * as css from './ReleaseNotesForm.styled';
import { email as validate } from '../../../utils/validators';

type Message = { type: 'error' | 'success'; text: string };

export type SendGridSubscribeResponse = {
  job_id: string;
};

export interface ReleaseNotesFormProps {
  onSubmit: (email: string) => Promise<SendGridSubscribeResponse>;
}

const ReleaseNotesForm = ({ onSubmit }: ReleaseNotesFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | undefined>();
  const [message, setMessage] = useState<Message | undefined>();

  const submitForm = async (e: React.FormEvent) => {
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
      const { job_id } = await onSubmit(email);
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

  return (
    <>
      <css.Paragraph>Subscribe to automated emails</css.Paragraph>
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
          <css.Button type='submit' disabled={success} loading={submitting}>
            Subscribe
          </css.Button>
        )}
        {success && <css.SuccessIcon />}
      </css.Form>
    </>
  );
};

export default ReleaseNotesForm;
