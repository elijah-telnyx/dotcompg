import { useState, useEffect, useReducer } from 'react';
import OverviewHero from 'ui/components/OverviewHero';
import OddColorfulCards from 'ui/components/OddColorfulCards';
import CTABanner from 'ui/components/CTABanner';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import TextCards from 'ui/components/TextCards';
import CarouselSection from 'ui/components/CarouselSection';
import Tagline from 'ui/components/Tagline';

import TablesSection from 'ui/components/TablesSection';
import ErrorBoundary from 'components/ErrorBoundary';
import 'glider-js/glider.min.css';

import { DEFAULT_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import fetchPricingPages, { type PricingPagesProps } from 'lib/Pricing/pages';
import { getPricingTablesData } from 'services/publicApiService';
import { getCountryByAlpha2 } from 'utils/countries.data';
import type { SupportedCountry } from 'lib/Pricing/@types';

const pageName = 'elastic-sip';
const getData = fetchPricingPages[pageName];

type PricingElasticSipPageProps = Awaited<ReturnType<typeof getData>> & {
  preview: boolean;
};

export const sectionsComponents = {
  sectionColorfulCards: OddColorfulCards,
  sectionCtaBanner: CTABanner,
  sectionTextCards: TextCards,
  sectionCarousel: CarouselSection,
  sectionPricingTable: TablesSection,
};

const appendLocale = (locale?: string) => (heading: string) => {
  if (!locale) return heading;
  return `${heading} for ${locale}`;
};

const changeData = (state: PricingPagesProps, newState: PricingPagesProps) => ({
  ...state,
  ...newState,
});

const PricingSlugPage = ({
  hero,
  sections,
  tablesData,
  preview,
  countryList,
  countryAlpha2,
  currencyList,
  ...props
}: PricingElasticSipPageProps) => {
  const initialPageData = {
      ...props,
      hero,
      sections,
      tablesData,
      countryList,
      countryAlpha2,
      currencyList,
      currentLocale: getCountryByAlpha2(countryAlpha2 || DEFAULT_COUNTRY_ALPHA2),
    },
    [pageData, updatePageData] = useReducer(changeData, initialPageData),
    [pageDataError, updatePageDataError] = useState(false),
    [currentCountryAlpha2, updateCurrentCountryAlpha2] = useState<string | undefined>(),
    addLocaleToHeading = appendLocale(pageData.currentLocale?.name);

  useEffect(() => {
    if (!currentCountryAlpha2) return;
    try {
      updatePageDataError(false);
      getPricingTablesData({
        countryCode: currentCountryAlpha2 as SupportedCountry,
        slug: pageName,
      })
        .then((newData) => updatePageData(newData))
        .catch(() => updatePageDataError(true));
    } catch (error) {
      updatePageDataError(true);
    }
  }, [currentCountryAlpha2]);

  return (
    <>
      <ErrorBoundary preview={preview}>
        <OverviewHero
          {...pageData.hero}
          heading={currentCountryAlpha2 ? addLocaleToHeading(pageData.hero.heading) : hero.heading}
        />
      </ErrorBoundary>
      {pageData.sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;
        if (sectionType === 'sectionPricingTable') {
          return (
            <ErrorBoundary key={section?.id} preview={preview}>
              {pageDataError && (
                <Tagline css={{ color: 'red', textAlign: 'center', textTransform: 'none' }}>
                  Unexpected error ocurred. Please try again later.
                </Tagline>
              )}
              <TablesSection
                {...section}
                data={pageData.tablesData}
                countryList={pageData.countryList}
                countryAlpha2={pageData.countryAlpha2}
                currencyList={pageData.currencyList}
                onValueChange={updateCurrentCountryAlpha2}
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

export const getStaticProps = defaultGetStaticProps<PricingElasticSipPageProps>({
  page: 'pricing/' + pageName,
  getData,
});

export default PricingSlugPage;
