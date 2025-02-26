import type { MetaTagsProps } from 'components/MetaTags';
import type { AwaitedReturn } from 'ui/utils/types';
import type { ReportAbuseAPIMessage, ReportAbuseFormValues } from 'components/ReportAbuseForm/ReportAbuseForm';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import ErrorBoundary from 'components/ErrorBoundary';
import FormSection from 'ui/components/FormSection';
import ReportAbuseForm from 'components/ReportAbuseForm';
import { sendReportAbuseForm } from 'services/publicApiService';
import useAsync, { STATUS } from 'utils/hooks/useAsync';
import OverviewHero from 'ui/components/OverviewHero/OverviewHero';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment/SegmentService';

interface ReportAbusePageProps {
  preview: boolean;
}

const copy = `Telnyx does not tolerate abuse of our [Acceptable Use Policy](https://telnyx.com/privacy-policy "Privacy Policy").
We apologize for any unwanted messages or phone calls sent to your phone.
Telnyx is an SMS and voice provider, but we don't send SMS messages or phone calls directly to end-users.

__Industry members needing assistance are urged to email [abuse@telnyx.com](mailto:abuse@telnyx.com) with relevant details.__`;

function onReportAbuseSubmit(formData: ReportAbuseFormValues) {
  SegmentService.track(
    SEGMENT_TRACK_EVENT_NAMES.FORM_SUBMIT,
    { form_data: formData, form_type: 'Report Abuse' },
    {
      integrations: {
        All: true,
        'Marketo V2': false,
      },
    }
  );
}

const ReportAbusePage = ({ preview }: ReportAbusePageProps) => {
  const { data, run, status, error } = useAsync<AwaitedReturn<typeof sendReportAbuseForm>>();
  let apiMessage: ReportAbuseAPIMessage | undefined;

  if (status === STATUS.resolved && data?.success) {
    return (
      <ErrorBoundary preview={preview}>
        <OverviewHero
          heading='Thank you for submitting your abuse complaint.'
          copy={`We will investigate the matter and take the appropriate actions.`}
          footerCopy={`[Report abuse for another number](/report-abuse).`}
          backgroundColor='tan'
          hasOverflow={false}
          centered={true}
          spacingTop='contrasting'
          spacingBottom='contrasting'
        />
      </ErrorBoundary>
    );
  } else if (status === STATUS.rejected) {
    apiMessage = { message: (error as ReportAbuseAPIMessage).message || 'Unexpected Error', type: 'error' };
  }

  return (
    <ErrorBoundary preview={preview}>
      <FormSection
        heading='Report Abuse'
        headingTag='h1'
        copy={copy}
        backgroundColor='black'
        hasOverflow={false}
        spacingBottom='contrasting'
        spacingTop='contrasting'
      >
        <ReportAbuseForm
          onSubmit={(formData) =>
            run(
              sendReportAbuseForm({ form: formData }).then((response) => {
                onReportAbuseSubmit(formData);
                return response;
              })
            )
          }
          isSubmitting={status === STATUS.pending}
          apiMessage={apiMessage}
        />
      </FormSection>
    </ErrorBoundary>
  );
};

export const getStaticProps = defaultGetStaticProps<ReportAbusePageProps>({
  page: 'report-abuse',
  getData: ({ preview }) => ({
    preview,
    seo: {
      title: 'Report Abuse Made On The Telnyx Platform',
      description: `Telnyx does not tolerate people using our services in ways that violate our Acceptable Use Policy. If you've noticed anything fishy please report it here.`,
    } as MetaTagsProps,
  }),
});

export default ReportAbusePage;
