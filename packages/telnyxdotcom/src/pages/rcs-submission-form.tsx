import FormSection from 'ui/components/FormSection';
import { getRCSSubmissionFormPage } from 'lib/Static';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import RCSSubmissionForm from 'components/RCSSubmissionForm';
import { getRCSSubmissionFormAsset } from 'lib/Contentful/methods/assets';

type RCSSubmissionFormPageProps = Awaited<ReturnType<typeof getRCSSubmissionFormPage>>;

export default function RCSSubmissionFormPage({
  heading,
  headingTag,
  copy,
  formFields,
  ...props
}: RCSSubmissionFormPageProps) {
  return (
    <FormSection loading={false} {...props}>
      <RCSSubmissionForm heading={heading} headingTag={headingTag} copy={copy} formFields={formFields} />
    </FormSection>
  );
}

export const getStaticProps = defaultGetStaticProps<RCSSubmissionFormPageProps>({
  page: 'rcs-submission-form',
  getData: async ({ preview }) => {
    return { ...getRCSSubmissionFormPage(), formFields: await getRCSSubmissionFormAsset({ preview }) };
  },
});
