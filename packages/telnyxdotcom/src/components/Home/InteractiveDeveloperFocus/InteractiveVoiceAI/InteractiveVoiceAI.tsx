import { useState } from 'react';
import type { VoiceAIFormValues, VoiceAIFormMessage } from 'ui/components/VoiceAIForm';
import VoiceAIForm, { type VoiceAIFormProps } from 'ui/components/VoiceAIForm';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment';
import { initiateVoiceAICall } from 'services/publicApiService';
import * as css from './InteractiveVoiceAI.styled';

export interface InteractiveVoiceAIProps {
  form: Omit<VoiceAIFormProps, 'onClickReturn' | 'onSubmit' | 'loading' | 'disabled' | 'apiMessage'>;
}

export const InteractiveVoiceAI = ({ form }: InteractiveVoiceAIProps) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<VoiceAIFormMessage | undefined>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleRequest = async (formValues: VoiceAIFormValues) => {
    setSubmitting(true);
    setApiMessage({
      message: 'Initiating call...',
      type: 'info',
    });

    SegmentService.track(
      SEGMENT_TRACK_EVENT_NAMES.FORM_SUBMIT,
      { form_data: formValues, form_type: 'Voice AI Homepage' },
      {
        integrations: {
          All: true,
          'Marketo V2': false,
        },
      }
    );

    await initiateVoiceAICall({
      To: formValues.phone_number,
      skipCaptcha: true,
    })
      .then(() => {
        setApiMessage({ type: 'success' });
        setDisabled(true);
      })
      .catch((error) => {
        setApiMessage({
          message: 'Failed to request Telnyx Voice AI Call. Please try again.',
          type: 'error',
        });
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleReturnClick = () => {
    setApiMessage(undefined);
    setDisabled(false);
  };

  return (
    <css.Wrapper>
      <css.FormCard disabled={submitting} form embed>
        <VoiceAIForm
          {...form}
          onClickReturn={handleReturnClick}
          onSubmit={handleRequest}
          loading={submitting}
          disabled={disabled}
          apiMessage={apiMessage}
          embed
        />
      </css.FormCard>
    </css.Wrapper>
  );
};

export default InteractiveVoiceAI;
