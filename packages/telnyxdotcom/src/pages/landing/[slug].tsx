import 'glider-js/glider.min.css';

import { getLandingPage, getLandingPages } from 'lib/Contentful';

import About from 'ui/components/About';
import Carousel from 'ui/components/CarouselSection';
import ColorfulCards from 'ui/components/ColorfulCards';
import CtaBanner from 'ui/components/CTABanner';
import CustomerLogos from 'ui/components/CustomerLogos';
import CustomerStories from 'ui/components/CustomerStories';
import Faq from 'ui/components/Faq';
import ErrorBoundary from 'components/ErrorBoundary';
import HowItWorks from 'ui/components/HowItWorks';
import MarkdownSection from 'ui/components/MarkdownSection';
import MarketoFormSection from 'ui/components/FormSection/MarketoFormSection';
import type { NextPage } from 'next';
import OverviewHero from 'ui/components/OverviewHero';
import ProductHero from 'ui/components/ProductHero/ProductHero';
import Resources from 'ui/components/Resources';
import SolutionsHero from 'ui/components/SolutionsHero';
import TextCards from 'ui/components/TextCards';
import TextCallout from 'ui/components/TextCallout';
import FormHero from 'components/ControlledFormHero';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import env from 'constants/env';

type LandingSlugPageProps = Awaited<ReturnType<typeof getLandingPage>> & { preview: boolean };

const heroesComponents = {
  heroOverview: OverviewHero,
  heroSolutions: SolutionsHero,
  heroProduct: ProductHero,
  heroForm: FormHero,
};

const sectionsComponents = {
  sectionAbout: About,
  sectionForm: MarketoFormSection,
  sectionCtaBanner: CtaBanner,
  sectionCarousel: Carousel,
  sectionColorfulCards: ColorfulCards,
  sectionCustomerLogos: CustomerLogos,
  sectionCustomerStories: CustomerStories,
  sectionMarkdown: MarkdownSection,
  sectionHowItWorks: HowItWorks,
  sectionResources: Resources,
  sectionTextCards: TextCards,
  SectionTextCallout: TextCallout,
  sectionFaq: Faq,
};

const LandingSlugPage: NextPage<LandingSlugPageProps> = ({ hero: { contentType, ...hero }, sections, preview }) => {
  const Hero = heroesComponents[contentType as keyof typeof heroesComponents];

  return (
    <>
      <ErrorBoundary preview={preview}>
        <Hero {...hero} />
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

export default LandingSlugPage;

type Paths = { params: { slug: string; locale?: string } }[];
export const getStaticPaths = async () => {
  const entries = await getLandingPages();
  if (entries) {
    return {
      fallback: env.generatePagesFallback.landing,
      paths: entries.items.reduce<Paths>((paths, page) => {
        const fields = page.fields;
        if (fields?.slug) {
          paths.push({ params: { slug: fields.slug } });
        }
        return paths;
      }, []),
    };
  }
  return [];
};

export const getStaticProps = defaultGetStaticProps<LandingSlugPageProps>({
  page: 'landing/[slug]',
  getData: ({ params, preview }) => getLandingPage({ slug: params?.slug as string }, { preview }),
  scripts: {
    pipedata: true,
  },
});
