import ErrorBoundary from 'components/ErrorBoundary';
import { getCountryIoTSections } from 'lib/Contentful';
import { countrySimCards, simCardCountryData } from 'lib/Static/data';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';

import ProductHero from 'ui/components/ProductHero';
import CustomerLogos from 'ui/components/CustomerLogos';
import TextCards from 'ui/components/TextCards';
import ColorfulCards from 'ui/components/ColorfulCards';
import HowItWorks from 'ui/components/HowItWorks';
import CTABanner from 'ui/components/CTABanner/CTABanner';
import CarouselSection from 'ui/components/CarouselSection';
import Faq from 'ui/components/Faq';

import 'glider-js/glider.min.css';

const page = 'sim-cards/[slug]';

type SimCardCountryPageProps = Awaited<ReturnType<typeof countrySimCards>> & {
  preview: boolean;
};

const SimCardCountryPage = ({ hero, sections, preview }: SimCardCountryPageProps) => {
  return (
    <>
      <ErrorBoundary preview={preview}>
        <ProductHero {...hero} />
        <CustomerLogos {...sections.logos} />
        <TextCards {...sections.features} />
        <ColorfulCards {...sections.benefits} />
        <HowItWorks {...sections.howItWorks} />
        <CTABanner {...sections.pricing} />
        <CarouselSection {...sections.carousel} />
        <Faq {...sections.faqs} />
      </ErrorBoundary>
    </>
  );
};

export const getStaticPaths = () => {
  return {
    fallback: 'blocking',
    paths: simCardCountryData.map((i) => ({ params: { slug: i.slug } })),
  };
};

export const getStaticProps = defaultGetStaticProps<SimCardCountryPageProps>({
  page,
  getData: async (props) => {
    const country = simCardCountryData.find((i) => i.slug === props.params?.slug);
    if (!country) return { notFound: true };

    const pageData = countrySimCards(country.slug);
    const contentfulData = await getCountryIoTSections();

    return {
      ...pageData,
      sections: { ...pageData?.sections, ...contentfulData },
    };
  },
});

export default SimCardCountryPage;
