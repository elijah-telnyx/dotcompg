import type { NextPage } from 'next';
import SolutionsHero from 'ui/components/SolutionsHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getIntegrationsPage } from 'lib/Contentful';
import Resources from 'ui/components/Resources';
import TextCards from 'ui/components/TextCards';
import MarketoFormSection from 'ui/components/FormSection/MarketoFormSection';

import ErrorBoundary from 'components/ErrorBoundary';

type IntegrationsPageProps = Awaited<ReturnType<typeof getIntegrationsPage>> & {
  preview: boolean;
};

const sectionsComponents = {
  sectionResources: Resources,
  sectionTextCards: TextCards,
  sectionForm: MarketoFormSection,
};

const IntegrationsPage: NextPage<IntegrationsPageProps> = ({ hero, sections, preview }) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <SolutionsHero {...hero} />
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

export const getStaticProps = defaultGetStaticProps<IntegrationsPageProps>({
  page: 'integrations',
  getData: ({ preview }) => {
    if (preview) {
      return getIntegrationsPage({ preview });
    }

    return {
      notFound: true,
    };
  },
});

export default IntegrationsPage;
