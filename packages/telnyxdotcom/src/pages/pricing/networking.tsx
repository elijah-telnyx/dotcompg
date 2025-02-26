import OverviewHero from 'ui/components/OverviewHero';
import OddColorfulCards from 'ui/components/OddColorfulCards';
import CTABanner from 'ui/components/CTABanner';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import TextCards from 'ui/components/TextCards';
import CarouselSection from 'ui/components/CarouselSection';
import TablesSection from 'ui/components/TablesSection';
import ErrorBoundary from 'components/ErrorBoundary';
import fetchPricingPages from 'lib/Pricing/pages';
import 'glider-js/glider.min.css';

const pageName = 'networking';
const getData = fetchPricingPages[pageName];

type PricingNetworkingProps = Awaited<ReturnType<typeof getData>> & {
  preview: boolean;
};

export const sectionsComponents = {
  sectionColorfulCards: OddColorfulCards,
  sectionCtaBanner: CTABanner,
  sectionTextCards: TextCards,
  sectionCarousel: CarouselSection,
  sectionPricingTable: TablesSection,
};

const PricingSlugPage = ({
  hero,
  sections,
  tablesData,
  preview,
  countryList,
  countryAlpha2,
  currencyList,
}: PricingNetworkingProps) => {
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
              <TablesSection
                {...section}
                data={tablesData}
                countryList={countryList}
                countryAlpha2={countryAlpha2}
                currencyList={currencyList}
              />
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

export const getStaticProps = defaultGetStaticProps<PricingNetworkingProps>({
  page: 'pricing/' + pageName,
  getData,
});

export default PricingSlugPage;
