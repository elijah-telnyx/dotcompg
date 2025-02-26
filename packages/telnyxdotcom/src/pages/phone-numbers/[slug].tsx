import 'glider-js/glider.min.css';

import { stateNumberData, statePhoneNumbers } from 'lib/Static/data';
import { countryNumberData, countryPhoneNumbers } from 'lib/Static/data';

import AvailableNumbersHero from 'components/AvailableNumbersHero';
import WhySection from 'components/PhoneNumbersSections/WhySection';
import MarkdownSection from 'components/PhoneNumbersSections/MarkdownSection';
import ErrorBoundary from 'components/ErrorBoundary';
import Faq from 'ui/components/Faq';
import HowItWorks from 'ui/components/HowItWorks';
import LinksDirectorySection from 'ui/components/LinksDirectorySection';
import TextCards from 'ui/components/TextCards';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import env from 'constants/env';
import { getStateNumberCopyData, getDirectoryArticles } from 'lib/Contentful';
import { getStateNumbers, getCountryNumbers } from 'services/telnyxApiService';
import airtableService from 'services/airtableService';
import AvailabilitySection from 'components/AvailabilitySection';
import TestimonialsSection from 'components/PhoneNumbersSections/TestimonialsSection';

const page = 'phone-numbers/[slug]',
  MIN_FEATURES = 1;

type StatePhoneNumberPageProps = Awaited<ReturnType<typeof statePhoneNumbers>> & {
  preview: boolean;
  quickFacts?: { name: string; copy: string; state: boolean };
};

const StateNumberDirectoryPage = ({ hero, sections, preview }: StatePhoneNumberPageProps) => {
  return (
    <ErrorBoundary preview={preview}>
      <AvailableNumbersHero {...hero} />
      <WhySection {...sections.whyTelnyx} />
      {sections.features.items.length > MIN_FEATURES && <TextCards {...sections.features} />}
      {sections.metro && <AvailabilitySection {...sections.metro} />}
      <HowItWorks {...sections.howItWorks} />
      {sections.airTableContent?.localRegulations && (
        <MarkdownSection {...sections.knowBeforeBuy} markdown={sections.airTableContent?.localRegulations?.copy} />
      )}
      {sections.airTableContent?.localEconomy && (
        <MarkdownSection {...sections.localEconomy} markdown={sections.airTableContent?.localEconomy?.copy} />
      )}
      <LinksDirectorySection {...sections.links} />
      <Faq {...sections.faqs} />
      <TestimonialsSection {...sections.testimonials} logos={sections.logos} spacingBottom='continuous' />
    </ErrorBoundary>
  );
};

export const getStaticPaths = () => {
  return {
    fallback: env.generatePagesFallback.phoneNumbers,
    paths: stateNumberData.map((i) => ({ params: { slug: i.slug } })),
  };
};

export const getStaticProps = defaultGetStaticProps<StatePhoneNumberPageProps>({
  page,
  getData: async (props) => {
    const state = stateNumberData.find((i) => i.slug === props.params?.slug),
      country = countryNumberData.find((i) => i.slug === props.params?.slug);

    let numberCount, pageData, slug;

    if (!state && !country) return { notFound: true };

    if (state) {
      slug = state.slug;
      const numberData = (await getStateNumbers(state.alpha2)) || '0';
      numberCount = Array.isArray(numberData)
        ? numberData.reduce((acc, curr) => acc + parseInt(curr.count), 0).toString()
        : '0';

      pageData = await statePhoneNumbers(state.slug, numberCount);
    }

    if (country) {
      slug = country.slug;
      const numberData = (await getCountryNumbers(country.alpha2)) || '0';
      numberCount = Array.isArray(numberData)
        ? numberData.reduce((acc, curr) => acc + parseInt(curr.count), 0).toString()
        : '0';

      pageData = await countryPhoneNumbers(country.slug, numberCount);
    }

    const relatedArticles = pageData ? await getDirectoryArticles(pageData.blogPosts) : null,
      contentfulJSONCopy = await getStateNumberCopyData(),
      quickFactName = country ? country.name : state ? state.name : '',
      airTableData = slug ? await airtableService.getGlobalNumbers(slug) : null;

    const airTableContent = airTableData
      ? {
          localEconomy: airTableData?.localEconomy
            ? {
                copy: airTableData?.localEconomy,
                heading: `Why do business in ${airTableData?.properName}?`,
              }
            : null,
          localRegulations: airTableData?.localRegulations
            ? {
                copy: airTableData?.localRegulations,
                heading: `Local ${airTableData?.properName} regulations`,
              }
            : null,
          seo: {
            ogTitle: airTableData.ogTitle,
            ogDescription: airTableData.ogDescription,
            ogImage: airTableData.ogImage?.length &&
              airTableData.ogImageUrl && { ...airTableData.ogImage[0], src: airTableData.ogImageUrl },
            twitterTitle: airTableData.twitterTitle,
            twitterDescription: airTableData.twitterDescription,
            twitterImage: airTableData.twitterImage?.length &&
              airTableData.twitterImageUrl && {
                ...airTableData.twitterImage[0],
                src: airTableData.twitterImageUrl,
                alt: airTableData.twitterImageDescription,
              },
          },
        }
      : null;

    return {
      ...pageData,
      seo: {
        ...pageData?.seo,
        ...airTableContent?.seo,
      },
      sections: {
        ...pageData?.sections,
        airTableContent,
        relatedArticles,
      },
      quickFacts: contentfulJSONCopy[quickFactName]
        ? { name: quickFactName, copy: contentfulJSONCopy[quickFactName] }
        : null,
    };
  },
});

export const sitemapData = [...stateNumberData, ...countryNumberData].map(({ slug }) => ({
  url: `/phone-numbers/${slug}`,
  lastmod: '2024-03-01',
}));

export default StateNumberDirectoryPage;
