import ErrorBoundary from 'components/ErrorBoundary';
import 'glider-js/glider.min.css';
import fetchPricingPages from 'lib/Pricing/pages';
import CTABanner from 'ui/components/CTABanner';
import CarouselSection from 'ui/components/CarouselSection';
import OddColorfulCards from 'ui/components/OddColorfulCards';
import OverviewHero from 'ui/components/OverviewHero';
import TablesSection from 'ui/components/TablesSection';
import TextCards from 'ui/components/TextCards';
import CalculatorSection from 'components/CalculatorSection';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';

const pageName = 'storage';
const getData = fetchPricingPages[pageName];

type PricingStoragePageProps = Awaited<ReturnType<typeof getData>> & {
  preview: boolean;
};

export const sectionsComponents = {
  sectionColorfulCards: OddColorfulCards,
  sectionCtaBanner: CTABanner,
  sectionTextCards: TextCards,
  sectionCarousel: CarouselSection,
  sectionPricingTable: TablesSection,
  sectionCalculator: CalculatorSection,
};

const PricingSlugPage = ({ hero, sections, tablesData, preview, currencyList }: PricingStoragePageProps) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <OverviewHero {...hero} />
      </ErrorBoundary>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;
        if (sectionType === 'sectionPricingTable') {
          return (
            <ErrorBoundary key={section?.id} preview={preview}>
              <TablesSection {...section} data={tablesData} currencyList={currencyList} />
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

export const getStaticProps = defaultGetStaticProps<PricingStoragePageProps>({
  page: 'pricing/' + pageName,
  getData,
});

export default PricingSlugPage;
