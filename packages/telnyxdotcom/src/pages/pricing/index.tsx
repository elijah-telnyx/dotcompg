import OverviewHero from 'ui/components/OverviewHero';
import OddColorfulBoxes from 'ui/components/OddColorfulBoxes';
import NavigationCardsSection from 'ui/components/NavigationCardsSection';

import TextCards from 'ui/components/TextCards';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import { getPricingOverviewPage } from 'lib/Contentful';
import ErrorBoundary from 'components/ErrorBoundary';

type PricingOverviewPageProps = Awaited<ReturnType<typeof getPricingOverviewPage>> & { preview: boolean };

const sectionsComponents = {
  sectionColorfulCards: OddColorfulBoxes,
  sectionTextCards: TextCards,
  sectionNavigation: NavigationCardsSection,
};

const PricingOverview = ({ hero, sections, preview }: PricingOverviewPageProps) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <OverviewHero {...hero} />
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;

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

export const getStaticProps = defaultGetStaticProps<PricingOverviewPageProps>({
  page: 'pricing',
  getData: ({ preview }) => getPricingOverviewPage({ preview }),
});

export default PricingOverview;
