import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getContactUsChallengerPage } from 'lib/Contentful';
import MarketoFormSection from 'ui/components/FormSection/MarketoFormSection';
import Resources from 'ui/components/Resources';
import type { MarketoNativeForm } from 'ui/components/MarketoForm';
import ErrorBoundary from 'components/ErrorBoundary';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment';
type ContactUsPageProps = Awaited<ReturnType<typeof getContactUsChallengerPage>> & { preview: boolean };

const sectionsComponents = {
  sectionForm: MarketoFormSection,
  sectionResources: Resources,
};

const ContactUs = ({ sections, preview }: ContactUsPageProps) => {
  const onSubmit = (form: MarketoNativeForm) => {
    SegmentService.track(
      SEGMENT_TRACK_EVENT_NAMES.FORM_SUBMIT,
      { form_data: form.getValues(), form_type: 'Contact Sales' },
      {
        integrations: {
          All: true,
          'Marketo V2': false,
        },
      }
    );
  };

  return (
    <>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;

        if (sectionType === 'sectionForm') {
          const { form, ...sectionProps } = section;

          return (
            <ErrorBoundary key={section?.id} preview={preview}>
              <MarketoFormSection {...sectionProps} form={{ ...form, onSubmit }} />
            </ErrorBoundary>
          );
        }

        const PageSection = sectionsComponents[sectionType];
        if (!PageSection) return null;

        return (
          <ErrorBoundary key={section?.id} preview={preview}>
            <PageSection {...section} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

export const getStaticProps = defaultGetStaticProps<ContactUsPageProps>({
  page: 'contact-us-challenger',
  getData: ({ preview }) =>
    getContactUsChallengerPage({ preview }).catch(() => {
      return { notFound: true };
    }),
});

export default ContactUs;
