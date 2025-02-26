import type { NextPage } from 'next';

import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import OverviewHero from 'ui/components/OverviewHero';
import OddColorfulCards from 'ui/components/OddColorfulCards';
import Carousel from 'ui/components/CarouselSection';
import CtaBanner from 'ui/components/CTABanner';
import TextCards from 'ui/components/TextCards';
import TablesSection from 'ui/components/TablesSection';
import fetchPricingPages from 'lib/Pricing/pages';
import 'glider-js/glider.min.css';

const pageName = 'number-lookup';
const getData = fetchPricingPages[pageName];

type PricingNumberLookupPageProps = Awaited<ReturnType<typeof getData>> & {
  preview: boolean;
};

export const sectionsComponents = {
  sectionColorfulCards: OddColorfulCards,
  sectionCarousel: Carousel,
  sectionCtaBanner: CtaBanner,
  sectionTextCards: TextCards,
  sectionPricingTable: TablesSection,
};

const NumberLookupPricingPage: NextPage<PricingNumberLookupPageProps> = ({
  hero: { contentType, ...hero },
  sections,
  tablesData,
  currencyList,
}) => {
  return (
    <>
      <OverviewHero {...hero} />
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;

        if (sectionType === 'sectionPricingTable') {
          return <TablesSection {...section} data={tablesData} key={section?.id} currencyList={currencyList} />;
        }

        const PageSection = sectionsComponents[sectionType];
        if (!PageSection) return null;

        return <PageSection {...section} key={section?.id} />;
      })}
    </>
  );
};

export default NumberLookupPricingPage;

export const getStaticProps = defaultGetStaticProps<PricingNumberLookupPageProps>({
  page: 'pricing/' + pageName,
  getData,
});
