import type { NextPage } from 'next';
import OverviewHero from 'ui/components/OverviewHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getPartnershipPage } from 'lib/Contentful';
import TextCards from 'ui/components/TextCards';
import ErrorBoundary from 'components/ErrorBoundary';
import CustomerLogos from 'ui/components/CustomerLogos';
import ColorfulCards from 'ui/components/ColorfulCards';
import MarketoFormSection from 'ui/components/FormSection/MarketoFormSection';

type PartnershipsPageProps = Awaited<ReturnType<typeof getPartnershipPage>> & {
  preview: boolean;
};

const sectionsComponents = {
  sectionTextCards: TextCards,
  sectionCustomerLogos: CustomerLogos,
  sectionColorfulCards: ColorfulCards,
  sectionForm: MarketoFormSection,
};

const PartnershipsPage: NextPage<PartnershipsPageProps> = ({ hero, sections, preview }) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <OverviewHero {...hero} />
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;

        const PageSection = sectionsComponents[sectionType];
        if (!PageSection) return null;

        if (sectionType === 'sectionForm') {
          return (
            <ErrorBoundary key={section?.id} preview={preview}>
              <MarketoFormSection {...section} />
            </ErrorBoundary>
          );
        }

        return (
          <ErrorBoundary key={section?.id} preview={preview}>
            <PageSection {...section} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

export const getStaticProps = defaultGetStaticProps<PartnershipsPageProps>({
  page: 'partnerships',
  getData: ({ preview }) => getPartnershipPage({ preview }),
});

export default PartnershipsPage;
