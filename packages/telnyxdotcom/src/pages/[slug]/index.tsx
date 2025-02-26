import { getGenericPage, getGenericPages } from 'lib/Contentful';

import CalculatorSection from 'components/CalculatorSection';
import ErrorBoundary from 'components/ErrorBoundary';
import constants from 'constants/env';
import 'glider-js/glider.min.css';
import type { GenericPage } from 'lib/Contentful/types';
import About from 'ui/components/About';
import CTABanner from 'ui/components/CTABanner/CTABanner';
import CarouselSection from 'ui/components/CarouselSection';
import ColorfulCards from 'ui/components/ColorfulCards';
import CustomerLogos from 'ui/components/CustomerLogos';
import CustomerStories from 'ui/components/CustomerStories';
import Faq from 'ui/components/Faq';
import FeatureComparison from 'ui/components/FeatureComparison';
import MarketoFormSection from 'ui/components/FormSection/MarketoFormSection/MarketoFormSection';
import HowItWorks from 'ui/components/HowItWorks';
import MarkdownSection from 'ui/components/MarkdownSection/MarkdownSection';
import MediaCardList from 'ui/components/MediaCardList';
import OverviewHero from 'ui/components/OverviewHero';
import ProductHero from 'ui/components/ProductHero';
import Resources from 'ui/components/Resources';
import SolutionsHero from 'ui/components/SolutionsHero';
import TabsWithMarkdown from 'ui/components/Tabs/TabsWithMarkdown';
import TextCards from 'ui/components/TextCards/TextCards';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';

const heroComponents = {
  heroOverview: OverviewHero,
  heroSolutions: SolutionsHero,
  heroProduct: ProductHero,
};

const sectionsComponents = {
  sectionAbout: About,
  sectionCarousel: CarouselSection,
  sectionCtaBanner: CTABanner,
  sectionCustomerLogos: CustomerLogos,
  sectionCustomerStories: CustomerStories,
  sectionMediaCardList: MediaCardList,
  sectionColorfulCards: ColorfulCards,
  sectionFaq: (props: any) => (props?.questions ? <Faq {...props} /> : <FeatureComparison {...props} />),
  sectionHowItWorks: HowItWorks,
  sectionResources: Resources,
  sectionTextCards: TextCards,
  sectionMarkdown: MarkdownSection,
  sectionTabs: TabsWithMarkdown,
  sectionForm: MarketoFormSection,
  sectionCalculator: CalculatorSection,
};

const HeroComponent = ({
  hero,
  preview,
}: {
  hero?: { contentType: keyof typeof heroComponents; id: string } & GenericPage['hero']['fields'];
  preview: boolean;
}) => {
  if (!hero) return null;

  const Hero = heroComponents[hero.contentType];
  return (
    <ErrorBoundary preview={preview}>
      <Hero {...hero} />
    </ErrorBoundary>
  );
};

const Slug = <
  T extends {
    hero?: { contentType: keyof typeof heroComponents; id: string } & GenericPage['hero']['fields'];
    sections: { contentType: keyof typeof sectionsComponents; id: string }[];
    preview: boolean;
  }
>({
  hero,
  sections,
  preview,
}: T) => {
  return (
    <>
      <HeroComponent hero={hero} preview={preview} />
      {sections?.map(({ contentType, ...section }) => {
        const PageSection = sectionsComponents[contentType];

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

export default Slug;

export const getStaticProps = defaultGetStaticProps<GenericPage>({
  page: '/[slug]',
  getData: ({ preview, params }) => {
    return getGenericPage({ slug: String(params?.slug) }, { preview }).catch((error) => {
      errorLogger({ error });
      return { notFound: true };
    });
  },
});

export const getStaticPaths = async () => {
  const entries = await getGenericPages();
  const toExclude = [
    'contact-us',
    'contact-us-challenger',
    'partnerships',
    'careers',
    'iot-global-coverage',
    'our-network',
    'voice-ai',
    'llm-library',
    'global-coverage',
  ];

  if (entries) {
    return {
      fallback: constants.generatePagesFallback.default,
      paths: entries.items.reduce<Paths>((paths, page) => {
        const fields = page.fields;
        if (fields?.slug && !toExclude.includes(fields?.slug)) {
          paths.push({ params: { slug: fields.slug } });
        }
        return paths;
      }, []),
    };
  }
  return [];
};

type Paths = { params: { slug: string; locale?: string } }[];
