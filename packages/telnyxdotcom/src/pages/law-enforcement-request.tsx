import { useState } from 'react';
import subpoenaService from 'services/subpoenaService';
import type { SubpoenaAPIMessage, SubpoenaFormValues } from 'ui/components/SubpoenaForm';
import FormSection from 'ui/components/FormSection';
import SubpoenaForm from 'ui/components/SubpoenaForm';
import { getLawEnforcementRequestPage } from 'lib/Static';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';

type LawEnforcementRequestPageProps = Awaited<ReturnType<typeof getLawEnforcementRequestPage>>;

const LawEnforcementRequest = ({ heading, headingTag, copy, onSubmit, ...props }: LawEnforcementRequestPageProps) => {
  const [submittingSubpoenaForm, setSubmittingSubpoenaForm] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<SubpoenaAPIMessage | undefined>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleRequest = (e: SubpoenaFormValues) => {
    setSubmittingSubpoenaForm(true);
    if (!e.relevant_files?.length) {
      setApiMessage({
        message: 'No file selected',
        type: 'error',
      });
      setSubmittingSubpoenaForm(false);
      return;
    }

    const formData = new FormData();
    Object.entries(e).forEach(([k, v]) => {
      if (k !== 'relevant_files') formData.append(k, v);
    });

    if (e.relevant_files) {
      // convert file to blob and pass to formData
      const file = new Blob([e.relevant_files[0]], { type: e.relevant_files[0].type });
      formData.append('relevant_files', file);
      subpoenaService.submitSubpoenaForm(formData).then((res: any) => {
        if (res.status === 200) {
          setApiMessage({
            message: 'Subpoena request submitted successfully',
            type: 'success',
          });
          setDisabled(true);
        } else {
          setApiMessage({
            message: 'Failed to submit subpoena request',
            type: 'error',
          });
        }
        setSubmittingSubpoenaForm(false);
      });
    }
  };

  return (
    <FormSection loading={submittingSubpoenaForm} {...props}>
      <SubpoenaForm
        heading={heading}
        headingTag={headingTag}
        copy={copy}
        apiMessage={apiMessage}
        onSubmit={handleRequest}
        loading={submittingSubpoenaForm}
        disabled={disabled}
      />
    </FormSection>
  );
};

export const getStaticProps = defaultGetStaticProps<LawEnforcementRequestPageProps>({
  page: 'staging-law-enforcement-request',
  getData: async () => {
    return getLawEnforcementRequestPage();
  },
});

export default LawEnforcementRequest;
