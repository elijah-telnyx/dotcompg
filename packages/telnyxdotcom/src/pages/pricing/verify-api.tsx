import type { NextPage } from 'next';

import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import OverviewHero from 'ui/components/OverviewHero';
import OddColorfulCards from 'ui/components/OddColorfulCards';
import Carousel from 'ui/components/CarouselSection';
import CtaBanner from 'ui/components/CTABanner';
import Faq from 'ui/components/Faq';
import TextCards from 'ui/components/TextCards';
import TablesSection from 'ui/components/TablesSection';
import ErrorBoundary from 'components/ErrorBoundary';
import fetchPricingPages from 'lib/Pricing/pages';
import 'glider-js/glider.min.css';

const pageName = 'verify-api';
const getData = fetchPricingPages[pageName];

type PricingVerifyApiPageProps = Awaited<ReturnType<typeof getData>> & {
  preview: boolean;
};

export const sectionsComponents = {
  sectionColorfulCards: OddColorfulCards,
  sectionCarousel: Carousel,
  sectionCtaBanner: CtaBanner,
  sectionFaq: Faq,
  sectionTextCards: TextCards,
  sectionPricingTable: TablesSection,
};

const VerifyApiPricingPage: NextPage<PricingVerifyApiPageProps> = ({
  hero: { contentType, ...hero },
  sections,
  tablesData,
  preview,
  currencyList,
}) => {
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

export default VerifyApiPricingPage;

export const getStaticProps = defaultGetStaticProps<PricingVerifyApiPageProps>({
  page: 'pricing/' + pageName,
  getData,
});
